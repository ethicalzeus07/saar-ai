import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getDbConnection } from '@/lib/db';

export async function POST() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // For testing purposes, delete all summaries created today by this user (using UTC)
    const sql = await getDbConnection();
    await sql`
      DELETE FROM pdf_summaries 
      WHERE user_id = ${userId} 
      AND DATE(created_at AT TIME ZONE 'UTC') = CURRENT_DATE AT TIME ZONE 'UTC'
    `;
    
    return NextResponse.json({ 
      success: true, 
      message: 'Daily limit reset successfully' 
    });
  } catch (error) {
    console.error('Error resetting daily limit:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 