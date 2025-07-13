'use server';

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromMistral } from "@/lib/mistral";
import { updateSummaryWithResult } from "@/lib/db";
import { formatFileNameAsTitle, sanitizeSummary } from "@/utils/format-utils";

export async function processPdfInBackground(summaryId: string, fileUrl: string, fileName: string) {
  try {
    console.log('Background processing started for summary:', summaryId);
    
    // Step 1: Extract PDF text (this can take 5-15 seconds)
    const pdfText = await fetchAndExtractPdfText(fileUrl);
    console.log('PDF text extracted, length:', pdfText.length);
    
    // Step 2: Generate AI summary (this can take 5-10 seconds)
    const summary = await generateSummaryFromMistral(pdfText);
    console.log('AI summary generated, length:', summary.length);
    
    // Step 3: Sanitize and format
    const sanitizedSummary = sanitizeSummary(summary, 5);
    const formattedTitle = formatFileNameAsTitle(fileName);
    
    // Step 4: Update database with final result
    await updateSummaryWithResult({
      summaryId,
      summary: sanitizedSummary,
      title: formattedTitle,
    });
    
    console.log('Background processing completed for summary:', summaryId);
    
    // Note: revalidatePath removed to avoid render-time errors
    // The client-side status checking will handle page refresh
    
    return { success: true };
  } catch (error) {
    console.error('Background processing failed for summary:', summaryId, error);
    
    // Update status to failed
    try {
      const { getDbConnection } = await import('@/lib/db');
      const sql = await getDbConnection();
      await sql`
        UPDATE pdf_summaries 
        SET 
          summary_text = 'Processing failed. Please try again.',
          status = 'failed',
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${summaryId}
      `;
    } catch (dbError) {
      console.error('Failed to update error status:', dbError);
    }
    
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
} 