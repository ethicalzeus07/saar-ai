'use client';

import { useEffect, useState } from 'react';
import { 
  MotionDiv, 
  MotionSpan,
  fadeInUp,
  scaleIn
} from '@/components/ui/common/motion-wrapper';

interface LimitData {
  canCreate: boolean;
  count: number;
  limit: number;
}

export function DailyLimitIndicator() {
  const [dailyLimitData, setDailyLimitData] = useState<LimitData | null>(null);
  const [totalLimitData, setTotalLimitData] = useState<LimitData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLimits();
  }, []);

  const fetchLimits = async () => {
    try {
      console.log('Fetching limits...');
      
      // Fetch both daily and total limits
      const [dailyResponse, totalResponse] = await Promise.all([
        fetch('/api/daily-limit'),
        fetch('/api/total-limit')
      ]);
      
      if (!dailyResponse.ok || !totalResponse.ok) {
        throw new Error(`Failed to fetch limits: ${dailyResponse.status}, ${totalResponse.status}`);
      }
      
      const [dailyData, totalData] = await Promise.all([
        dailyResponse.json(),
        totalResponse.json()
      ]);
      
      console.log('Daily limit data:', dailyData);
      console.log('Total limit data:', totalData);
      
      setDailyLimitData(dailyData);
      setTotalLimitData(totalData);
    } catch (err) {
      console.error('Error fetching limits:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch limits');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <MotionDiv 
        className="flex items-center justify-center p-3 bg-gray-50 rounded-lg"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        <MotionSpan className="text-sm text-gray-500">Loading limit info...</MotionSpan>
      </MotionDiv>
    );
  }

  if (error) {
    return null; // Don't show error state to avoid cluttering the UI
  }

  if (!dailyLimitData || !totalLimitData) {
    return null;
  }

  const { count: dailyCount, limit: dailyLimit } = dailyLimitData;
  const { count: totalCount, limit: totalLimit } = totalLimitData;
  
  const dailyPercentage = (dailyCount / dailyLimit) * 100;
  const totalPercentage = (totalCount / totalLimit) * 100;
  
  const isDailyNearLimit = dailyPercentage >= 80;
  const isDailyAtLimit = dailyCount >= dailyLimit;
  const isTotalNearLimit = totalPercentage >= 80;
  const isTotalAtLimit = totalCount >= totalLimit;

  return (
    <MotionDiv 
      className="relative bg-gradient-to-br from-lime-50 via-yellow-50 to-white/90 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-lime-100/60 overflow-hidden"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      {/* Soft glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-lime-200/30 via-yellow-100/20 to-white/10 rounded-2xl blur-lg opacity-40 pointer-events-none z-0" />
      
      {/* Daily Limit */}
      <MotionDiv className="flex items-center justify-between mb-2 relative z-10">
        <MotionSpan className="text-base font-semibold text-gray-800">Daily Summary Limit</MotionSpan>
        <MotionSpan className={`text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-white/60 transition-colors duration-200
          ${isDailyAtLimit 
            ? 'bg-red-100 text-red-700' 
            : isDailyNearLimit 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-green-100 text-green-800'}
        `}>
          {dailyCount}/{dailyLimit}
        </MotionSpan>
      </MotionDiv>
      <MotionDiv className="flex gap-1 mb-3 relative z-10">
        {Array.from({ length: dailyLimit }, (_, i) => (
          <MotionDiv
            key={i}
            className={`h-2 rounded-full flex-1 transition-all duration-300
              ${i < dailyCount 
                ? isDailyAtLimit 
                  ? 'bg-red-400' 
                  : isDailyNearLimit 
                    ? 'bg-yellow-400' 
                    : 'bg-lime-400'
                : 'bg-gray-200'}
            `}
          />
        ))}
      </MotionDiv>
      
      {/* Total Limit */}
      <MotionDiv className="flex items-center justify-between mb-2 relative z-10">
        <MotionSpan className="text-base font-semibold text-gray-800">Total Summary Limit</MotionSpan>
        <MotionSpan className={`text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-white/60 transition-colors duration-200
          ${isTotalAtLimit 
            ? 'bg-red-100 text-red-700' 
            : isTotalNearLimit 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-green-100 text-green-800'}
        `}>
          {totalCount}/{totalLimit}
        </MotionSpan>
      </MotionDiv>
      <MotionDiv className="flex gap-1 mb-3 relative z-10">
        {Array.from({ length: totalLimit }, (_, i) => (
          <MotionDiv
            key={i}
            className={`h-2 rounded-full flex-1 transition-all duration-300
              ${i < totalCount 
                ? isTotalAtLimit 
                  ? 'bg-red-400' 
                  : isTotalNearLimit 
                    ? 'bg-yellow-400' 
                    : 'bg-lime-400'
                : 'bg-gray-200'}
            `}
          />
        ))}
      </MotionDiv>
      
      {/* Warning Messages */}
      {(isDailyAtLimit || isTotalAtLimit) && (
        <MotionDiv className="space-y-1 relative z-10">
          {isDailyAtLimit && (
            <MotionDiv className="flex items-center gap-2 text-xs text-red-600 font-semibold">
              <MotionSpan>⚠️</MotionSpan>
              <MotionSpan>Daily limit reached</MotionSpan>
            </MotionDiv>
          )}
          {isTotalAtLimit && (
            <MotionDiv className="flex items-center gap-2 text-xs text-red-600 font-semibold">
              <MotionSpan>⚠️</MotionSpan>
              <MotionSpan>Total limit reached - delete some summaries</MotionSpan>
            </MotionDiv>
          )}
        </MotionDiv>
      )}
      
      <MotionDiv className="text-xs text-gray-500 relative z-10 mt-2">
        <MotionSpan>Daily resets at midnight UTC • Total limit is permanent</MotionSpan>
      </MotionDiv>
    </MotionDiv>
  );
} 