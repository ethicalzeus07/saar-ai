// Environment variable validation
export function validateEnvironment() {
  const requiredEnvVars = {
    DATABASE_URL: process.env.DATABASE_URL,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
  };

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }

  return requiredEnvVars;
}

// Validate environment on module load
if (typeof window === 'undefined') {
  try {
    validateEnvironment();
  } catch (error) {
    console.error('Environment validation failed:', error instanceof Error ? error.message : 'Unknown error');
    // Don't throw in development
    if (process.env.NODE_ENV === 'production') {
      throw error;
    }
  }
} 