import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getSummaryById } from '@/lib/summaries';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const summary = await getSummaryById(id);

    if (!summary) {
      return NextResponse.json(
        { error: 'Summary not found' },
        { status: 404 }
      );
    }

    // Check if the user owns this summary
    if (summary.user_id !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      status: summary.status,
      title: summary.title,
      summaryText: summary.summary_text,
    });
  } catch (error) {
    console.error('Error fetching summary status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 