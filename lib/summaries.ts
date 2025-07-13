import { getDbConnection } from './db';

interface SummaryRow {
  id: string;
  user_id: string;
  title: string;
  original_file_url: string;
  summary_text: string;
  status?: string;
  created_at: string | Date;
  updated_at?: string | Date;
  file_name: string;
  word_count?: number;
}

export async function getSummaries(userId: string) {
  const sql = await getDbConnection();
  // Optimize query to only select necessary fields instead of SELECT *
  const summaries = await sql`
    SELECT 
      id, 
      title, 
      summary_text, 
      created_at, 
      file_name,
      status
    FROM pdf_summaries 
    WHERE user_id = ${userId} 
    ORDER BY created_at DESC
  ` as SummaryRow[];
  
  return summaries.map(s => ({
    ...s,
    createdAt: s.created_at instanceof Date ? s.created_at.toISOString() : s.created_at,
  }));
}

export async function getSummaryById(id: string) {
  try {
    const sql = await getDbConnection();
    const [summary] = await sql`SELECT 
    id, 
    user_id, 
    title, 
    original_file_url, 
    summary_text,
    status,
    created_at, 
    updated_at, 
    file_name, 
    LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 as word_count from pdf_summaries where id = ${id}` as SummaryRow[];

    return summary;
  } catch (err) {
    console.error('Error fetching summary by id', err);
    return null;
  }
}

export async function checkDailyLimit(userId: string, limit: number = 5): Promise<{ canCreate: boolean; count: number; limit: number }> {
  try {
    console.log('checkDailyLimit: Starting check for user:', userId);
    const sql = await getDbConnection();
    console.log('checkDailyLimit: Database connection established');
    
    // Count summaries created today for this user (using UTC to avoid timezone issues)
    const result = await sql`
      SELECT COUNT(*) as count 
      FROM pdf_summaries 
      WHERE user_id = ${userId} 
      AND DATE(created_at AT TIME ZONE 'UTC') = CURRENT_DATE AT TIME ZONE 'UTC'
    ` as { count: number }[];
    
    console.log('checkDailyLimit: Database result:', result);
    
    const count = parseInt(result[0]?.count?.toString() || '0');
    const canCreate = count < limit;
    
    console.log('checkDailyLimit: Final result - count:', count, 'limit:', limit, 'canCreate:', canCreate);
    
    return {
      canCreate,
      count,
      limit
    };
  } catch (error) {
    console.error('checkDailyLimit: Error checking daily limit:', error);
    // In case of error, allow creation to avoid blocking users
    return {
      canCreate: true,
      count: 0,
      limit
    };
  }
}

export async function checkTotalLimit(userId: string, limit: number = 5): Promise<{ canCreate: boolean; count: number; limit: number }> {
  try {
    console.log('checkTotalLimit: Starting check for user:', userId);
    const sql = await getDbConnection();
    console.log('checkTotalLimit: Database connection established');
    
    // Count total summaries for this user
    const result = await sql`
      SELECT COUNT(*) as count 
      FROM pdf_summaries 
      WHERE user_id = ${userId}
    ` as { count: number }[];
    
    console.log('checkTotalLimit: Database result:', result);
    
    const count = parseInt(result[0]?.count?.toString() || '0');
    const canCreate = count < limit;
    
    console.log('checkTotalLimit: Final result - count:', count, 'limit:', limit, 'canCreate:', canCreate);
    
    return {
      canCreate,
      count,
      limit
    };
  } catch (error) {
    console.error('checkTotalLimit: Error checking total limit:', error);
    // In case of error, allow creation to avoid blocking users
    return {
      canCreate: true,
      count: 0,
      limit
    };
  }
}