// Simple in-memory rate limiting for Vercel free tier
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(identifier: string, limit: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now();
  const key = identifier;
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

export function getRateLimitInfo(identifier: string): { remaining: number; resetTime: number } {
  const record = rateLimitMap.get(identifier);
  if (!record) {
    return { remaining: 10, resetTime: Date.now() + 60000 };
  }
  return { remaining: Math.max(0, 10 - record.count), resetTime: record.resetTime };
} 