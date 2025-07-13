import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { checkTotalLimit } from '@/lib/summaries';

export const runtime = 'edge';

export async function GET() {
  try {
    console.log('Total limit API: Starting request...');
    const { userId } = await auth();
    console.log('Total limit API: User ID:', userId);
    
    if (!userId) {
      console.log('Total limit API: No user ID found');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Total limit API: Checking total limit for user:', userId);
    const limitInfo = await checkTotalLimit(userId, 5);
    console.log('Total limit API: Limit info:', limitInfo);
    
    // Add caching headers to reduce database calls
    const response = NextResponse.json(limitInfo);
    response.headers.set('Cache-Control', 'private, max-age=60'); // Cache for 1 minute
    response.headers.set('Vary', 'Authorization'); // Vary by auth header
    
    return response;
  } catch (error) {
    console.error('Total limit API: Error fetching total limit:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 