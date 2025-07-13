import { NextResponse } from 'next/server';
import { testDbConnection } from '@/lib/db';

export async function GET() {
  try {
    const result = await testDbConnection();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 