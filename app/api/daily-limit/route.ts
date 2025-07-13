import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { checkDailyLimit } from '@/lib/summaries';

export async function GET() {
  try {
    console.log('Daily limit API: Starting request...');
    const { userId } = await auth();
    console.log('Daily limit API: User ID:', userId);
    
    if (!userId) {
      console.log('Daily limit API: No user ID found');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Daily limit API: Checking daily limit for user:', userId);
    const limitInfo = await checkDailyLimit(userId, 5);
    console.log('Daily limit API: Limit info:', limitInfo);
    
    // Add caching headers to reduce database calls
    const response = NextResponse.json(limitInfo);
    response.headers.set('Cache-Control', 'private, max-age=60'); // Cache for 1 minute
    response.headers.set('Vary', 'Authorization'); // Vary by auth header
    
    return response;
  } catch (error) {
    console.error('Daily limit API: Error fetching daily limit:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 