'use client';

import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { 
  MotionDiv, 
  MotionH1, 
  MotionSpan,
  fadeInUp,
  fadeInLeft,
  fadeInRight
} from '@/components/ui/common/motion-wrapper';

interface SummaryHeaderProps {
  title: string;
  createdAt: string;
}

// Date display component
function DateDisplay({ date }: { date: Date }) {
  return (
    <MotionDiv 
      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-sm border border-gray-200/50"
      variants={fadeInLeft}
    >
      <MotionSpan>📅</MotionSpan>
      <MotionSpan>{date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })}</MotionSpan>
    </MotionDiv>
  );
}

// Time display component
function TimeDisplay({ date }: { date: Date }) {
  return (
    <MotionDiv 
      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-sm border border-gray-200/50"
      variants={fadeInLeft}
    >
      <MotionSpan>🕐</MotionSpan>
      <MotionSpan>{date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })}</MotionSpan>
    </MotionDiv>
  );
}

// Back button component
function BackButton() {
  const router = useRouter();
  
  return (
    <MotionDiv variants={fadeInRight}>
      <Button
        variant="ghost"
        size="sm"
        aria-label="Go back to previous page"
        onClick={() => router.back()}
        className="h-9 sm:h-10 px-3 sm:px-5 text-lime-700 hover:text-white bg-gradient-to-r from-lime-200 to-lime-400 hover:from-lime-400 hover:to-emerald-400 shadow-md hover:shadow-lg focus:ring-2 focus:ring-lime-400/70 text-sm sm:text-base rounded-xl transition-all duration-200 flex items-center gap-2 group border border-lime-200/60 hover:border-lime-400/80 active:scale-95"
      >
        <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200 group-hover:-translate-x-1 group-active:scale-110 drop-shadow" />
        <MotionSpan className="hidden xs:inline font-semibold tracking-wide">Back</MotionSpan>
        <MotionSpan className="xs:hidden text-lg">←</MotionSpan>
      </Button>
    </MotionDiv>
  );
}

export function SummaryHeader({ title, createdAt }: SummaryHeaderProps) {
  // Memoize date parsing to avoid recreating Date object on every render
  const parsedDate = useMemo(() => new Date(createdAt), [createdAt]);

  return (
    <MotionDiv 
      className="w-full mb-4 sm:mb-6 lg:mb-8"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      {/* Top row: date, time, back button */}
      <MotionDiv className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 w-full">
        <MotionDiv className="flex items-center gap-2 sm:gap-4 order-2 sm:order-1">
          <DateDisplay date={parsedDate} />
          <TimeDisplay date={parsedDate} />
        </MotionDiv>
        <MotionDiv className="flex-shrink-0 order-1 sm:order-2 w-full sm:w-auto">
          <BackButton />
        </MotionDiv>
      </MotionDiv>
      {/* Title below the top row */}
      <MotionH1 className="mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
        <MotionSpan className="bg-gradient-to-r from-lime-600 to-emerald-600 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(63,98,18,0.4)]">
          {title}
        </MotionSpan>
      </MotionH1>
    </MotionDiv>
  );
}