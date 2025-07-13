'use server';

import { createInitialSummary } from "@/lib/db";
import { checkDailyLimit, checkTotalLimit } from "@/lib/summaries";
import { processPdfInBackground } from "./background-processing";



export async function generatePdfSummary(
  uploadResponse: {
    serverData: {
      userId: string;
      file: {
        url: string;
        name: string;
      };
    };
  }[]
) {
  if (!uploadResponse) {
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    };
  }

  try {
    // Check daily limit first
    const dailyLimitCheck = await checkDailyLimit(userId, 5);
    if (!dailyLimitCheck.canCreate) {
      return {
        success: false,
        message: `Daily limit reached! You've created ${dailyLimitCheck.count} summaries today. You can create up to ${dailyLimitCheck.limit} summaries per day. Please try again tomorrow.`,
        data: null,
      };
    }

    // Check total limit
    const totalLimitCheck = await checkTotalLimit(userId, 5);
    if (!totalLimitCheck.canCreate) {
      return {
        success: false,
        message: `Total limit reached! You have ${totalLimitCheck.count} summaries total. You can only have up to ${totalLimitCheck.limit} summaries. Please delete some existing summaries to create new ones.`,
        data: null,
      };
    }

    // Create initial summary record with "processing" status
    const summaryId = await createInitialSummary({
      userId,
      fileUrl: pdfUrl,
      fileName,
    });

    // Start background processing (this will run asynchronously)
    processPdfInBackground(summaryId, pdfUrl, fileName).catch(error => {
      console.error('Background processing failed:', error);
    });

    return {
      success: true,
      message: 'File uploaded successfully! Processing your document in the background...',
      data: {
        id: summaryId,
        title: fileName.replace(/\.[^/.]+$/, ''),
        status: 'processing'
      }
    };
  } catch (error) {
    console.error('Error in generatePdfSummary:', error);
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    };
  }
}



  
