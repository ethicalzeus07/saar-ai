'use client';

import { useEffect, useState, useCallback } from 'react';
import { Loader2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ProcessingStatusProps {
  summaryId: string;
  initialStatus: string;
}

export function ProcessingStatus({ summaryId, initialStatus }: ProcessingStatusProps) {
  const [status, setStatus] = useState(initialStatus);
  const [isChecking, setIsChecking] = useState(false);
  const router = useRouter();

  const checkStatus = useCallback(async () => {
    setIsChecking(true);
    try {
      const response = await fetch(`/api/summary-status/${summaryId}`);
      const data = await response.json();
      
      if (data.status === 'completed') {
        setStatus('completed');
        // Add a small delay to ensure database update is complete
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (data.status === 'failed') {
        setStatus('failed');
      }
    } catch (error) {
      console.error('Error checking status:', error);
    } finally {
      setIsChecking(false);
    }
  }, [summaryId]);

  useEffect(() => {
    if (status === 'processing') {
      // Check status every 3 seconds
      const interval = setInterval(checkStatus, 3000);
      return () => clearInterval(interval);
    }
  }, [status, summaryId, checkStatus]);

  if (status === 'completed') {
    return null; // Don't show anything when completed
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center space-y-6 p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-lime-200/50 max-w-md mx-auto">
        {status === 'processing' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-lime-600 mx-auto"></div>
            <div>
              <h2 className="text-xl font-semibold text-lime-800 mb-2">
                Processing Your Document
              </h2>
              <p className="text-lime-700 text-sm">
                Our AI is analyzing your PDF and creating a comprehensive summary. 
                This usually takes 10-30 seconds.
              </p>
            </div>
            <Button
              onClick={checkStatus}
              disabled={isChecking}
              variant="outline"
              className="border-lime-300 text-lime-700 hover:bg-lime-50"
            >
              {isChecking ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                'Check Status'
              )}
            </Button>
          </>
        )}

        {status === 'failed' && (
          <>
            <XCircle className="h-16 w-16 text-red-500 mx-auto" />
            <div>
              <h2 className="text-xl font-semibold text-red-800 mb-2">
                Processing Failed
              </h2>
              <p className="text-red-700 text-sm">
                We encountered an error while processing your document. 
                Please try uploading again.
              </p>
            </div>
            <Button
              onClick={() => router.push('/upload')}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Try Again
            </Button>
          </>
        )}
      </div>
    </div>
  );
} 