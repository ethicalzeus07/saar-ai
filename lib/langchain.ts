import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

export async function fetchAndExtractPdfText(fileUrl: string) {
  try {
    const response = await fetch(fileUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
    }
    
    const blob = await response.blob();
    
    // Check file size (limit to 20MB for Vercel free tier performance)
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (blob.size > maxSize) {
      throw new Error('File too large. Please upload a file smaller than 20MB.');
    }

    const arrayBuffer = await blob.arrayBuffer();
    const loader = new PDFLoader(new Blob([arrayBuffer]), {
      // Optimize PDF loading
      splitPages: false, // Load as single document for better performance
    });

    const docs = await loader.load();
    
    // Combine all pages with proper spacing
    const combinedText = docs
      .map((doc) => doc.pageContent.trim())
      .filter(text => text.length > 0) // Remove empty pages
      .join('\n\n');
    
    // Limit text length for API efficiency
    const maxTextLength = 100000; // 100k characters
    if (combinedText.length > maxTextLength) {
      console.warn(`PDF text truncated from ${combinedText.length} to ${maxTextLength} characters`);
      return combinedText.substring(0, maxTextLength);
    }
    
    return combinedText;
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw new Error(`Failed to process PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}