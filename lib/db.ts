'use server';
import { neon } from '@neondatabase/serverless';

let sqlInstance: ReturnType<typeof neon> | null = null;

export async function getDbConnection() {
  if (!process.env.DATABASE_URL) {
    throw new Error('Neon Database URL is not defined');
  }

  // Reuse existing connection if available
  if (sqlInstance) {
    return sqlInstance;
  }

  try {
    sqlInstance = neon(process.env.DATABASE_URL);
    // Test the connection
    await sqlInstance`SELECT 1`;
    if (process.env.NODE_ENV === 'development') {
      console.log('Database connection established and cached');
    }
    return sqlInstance;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw new Error(`Failed to connect to database: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

interface DbTestResult {
  count: number;
}

export async function testDbConnection() {
  try {
    const sql = await getDbConnection();
    const result = await sql`SELECT COUNT(*) as count FROM pdf_summaries`;
    const count = (result as DbTestResult[])[0]?.count;
    console.log('Database test successful, pdf_summaries count:', count);
    return { success: true, count };
  } catch (error) {
    console.error('Database test failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Add function to create initial summary record for background processing
export async function createInitialSummary({
  userId,
  fileUrl,
  fileName,
}: {
  userId: string;
  fileUrl: string;
  fileName: string;
}) {
  const sql = await getDbConnection();
  const result = await sql`
    INSERT INTO pdf_summaries (
      user_id,
      original_file_url,
      summary_text,
      title,
      file_name,
      status
    ) VALUES (
      ${userId},
      ${fileUrl},
      'Processing...',
      ${fileName.replace(/\.[^/.]+$/, '')},
      ${fileName},
      'processing'
    ) RETURNING id;
  ` as { id: string }[];
  return result[0]?.id;
}

// Add function to update summary with final result
export async function updateSummaryWithResult({
  summaryId,
  summary,
  title,
}: {
  summaryId: string;
  summary: string;
  title: string;
}) {
  const sql = await getDbConnection();
  await sql`
    UPDATE pdf_summaries 
    SET 
      summary_text = ${summary},
      title = ${title},
      status = 'completed',
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${summaryId}
  `;
}