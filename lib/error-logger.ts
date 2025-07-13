// Simple error logging for production monitoring
interface ErrorLog {
  timestamp: string;
  error: string;
  stack?: string;
  context?: Record<string, unknown>;
}

export function logError(error: Error, context?: Record<string, unknown>) {
  const errorLog: ErrorLog = {
    timestamp: new Date().toISOString(),
    error: error.message,
    stack: error.stack,
    context,
  };

  // In production, you might want to send this to a service like Sentry
  // For now, we'll just log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error logged:', errorLog);
  } else {
    // In production, you could send to an external service
    console.error(`[${errorLog.timestamp}] ${errorLog.error}`);
  }

  return errorLog;
}

export function logApiError(error: Error, endpoint: string, userId?: string) {
  return logError(error, {
    endpoint,
    userId,
    type: 'api_error',
  });
} 