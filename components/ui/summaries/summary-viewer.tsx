'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowBigRight, ArrowBigLeft } from 'lucide-react';
import { 
  MotionDiv, 
  MotionSpan,
  fadeInUp,
  scaleIn,
  staggerContainer
} from '@/components/ui/common/motion-wrapper';

const parseSection = (section: string) => {
  const [title, ...contentLines] = section.split('\n');
  return { 
    title: title.replace('#', '').trim(), 
    content: contentLines.join('\n').trim() 
  };
};

// Utility to render **bold** text as <b>bold</b>
function renderBoldText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <b key={i}>{part.slice(2, -2)}</b>;
    }
    return part;
  });
}

export function SummaryViewer({ summary }: { summary: string }) {
  const sections = summary
    .split(/\n#+\s/)
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  const [current, setCurrent] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const total = sections.length;
  const { title, content } = sections[current] || { title: 'No Summary', content: 'No content available' };

  const goNext = useCallback(() => {
    if (current < total - 1 && !isNavigating) {
      setIsNavigating(true);
      setCurrent((c) => c + 1);
      setTimeout(() => setIsNavigating(false), 150);
    }
  }, [current, total, isNavigating]);

  const goPrev = useCallback(() => {
    if (current > 0 && !isNavigating) {
      setIsNavigating(true);
      setCurrent((c) => c - 1);
      setTimeout(() => setIsNavigating(false), 150);
    }
  }, [current, isNavigating]);

  // Keyboard navigation with debouncing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  if (total === 0) {
    return (
      <MotionDiv 
        className="flex flex-col items-center mx-auto px-4 sm:px-6 lg:px-8"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        <Card className="w-full max-w-md sm:max-w-lg md:max-w-2xl min-h-[300px] flex flex-col justify-center items-center shadow-lg rounded-xl sm:rounded-2xl lg:rounded-3xl border border-gray-100">
          <CardContent className="text-center text-gray-500 text-sm sm:text-base lg:text-lg">
            No summary content available
          </CardContent>
        </Card>
      </MotionDiv>
    );
  }

  return (
    <MotionDiv 
      className="flex flex-col items-center mx-auto w-full px-1 sm:px-2 lg:px-4"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Main card with everything inside */}
      <Card className="w-full min-w-[900px] h-[90vh] flex flex-col shadow-2xl hover:shadow-3xl transition-shadow duration-300 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-gray-100 hover:border-lime-400 bg-white/60 bg-gradient-to-br from-white/80 via-lime-50/40 to-white/90 relative backdrop-blur-xl">
        {/* Decorative blurred gradient blob */}
        <MotionDiv className="absolute -top-4 sm:-top-6 lg:-top-8 xl:-top-16 -left-4 sm:-left-6 lg:-left-8 xl:-left-16 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 xl:w-56 xl:h-56 bg-lime-200/40 rounded-full blur-3xl opacity-40 pointer-events-none z-0 animate-pulse" />
        <MotionDiv className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-8 xl:-bottom-16 -right-4 sm:-right-6 lg:-right-8 xl:-right-16 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 xl:w-56 xl:h-56 bg-yellow-100/40 rounded-full blur-3xl opacity-40 pointer-events-none z-0 animate-pulse" />
        
        {/* Progress bar inside card */}
        <MotionDiv className="px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4 lg:pt-6 pb-2 z-10 flex-shrink-0">
          <MotionDiv className="w-full bg-gray-200/60 rounded-full h-2 sm:h-3 shadow-inner">
            <MotionDiv 
              className="bg-gradient-to-r from-lime-400 via-lime-500 to-lime-300 h-2 sm:h-3 rounded-full transition-all duration-300 ease-out shadow-md animate-pulse"
              style={{ width: `${((current + 1) / total) * 100}%` }}
            />
          </MotionDiv>
        </MotionDiv>

        <CardHeader className="pb-2 px-3 sm:px-4 lg:px-6 pt-2 flex-shrink-0 z-10">
          <CardTitle className="text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-lime-800 leading-tight tracking-tight drop-shadow-sm">
            {title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="px-3 sm:px-4 lg:px-6 pt-2 flex-1 z-10">
          <MotionDiv className="space-y-2 sm:space-y-3 lg:space-y-4 h-full pr-1 sm:pr-2">
            {content.split('•').filter(point => point.trim()).map((point, i) => (
              <MotionDiv 
                key={i}
                className="bg-white/90 border border-lime-200/60 rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 xl:p-5 text-xs sm:text-sm lg:text-base xl:text-lg text-gray-700 leading-relaxed shadow-lg hover:shadow-xl hover:bg-lime-50/80 hover:border-lime-400 transition-all duration-200 backdrop-blur-md flex items-start gap-2 sm:gap-3 break-words"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: i * 0.05 }}
              >
                <MotionSpan className="text-lime-600 font-semibold mt-0.5 flex-shrink-0 text-xs sm:text-sm lg:text-base">•</MotionSpan>
                <MotionSpan className="flex-1">{renderBoldText(point.trim())}</MotionSpan>
              </MotionDiv>
            ))}
          </MotionDiv>
        </CardContent>

        {/* Navigation controls inside card - fixed to bottom */}
        <MotionDiv className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6 pt-2 sm:pt-3 lg:pt-4 flex items-center justify-between border-t border-gray-200/50 bg-white/80 backdrop-blur-md rounded-b-xl sm:rounded-b-2xl lg:rounded-b-3xl shadow-inner z-20 flex-shrink-0">
          <Button 
            variant="outline" 
            onClick={goPrev} 
            disabled={current === 0 || isNavigating}
            className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-2.5 disabled:opacity-50 hover:bg-lime-50 border-lime-300/50 text-lime-700 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-lime-400 text-xs sm:text-sm lg:text-base min-h-[44px] sm:min-h-[48px]"
            aria-label="Previous section"
          >
            <ArrowBigLeft className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
          </Button>

          <MotionDiv className="bg-white text-lime-500 border border-lime-500 px-2 sm:px-3 lg:px-4 xl:px-6 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm lg:text-base font-medium min-w-12 sm:min-w-16 lg:min-w-20 xl:min-w-24 text-center">
            {current + 1} <MotionSpan className="opacity-70 font-normal text-lime-500">of</MotionSpan> {total}
          </MotionDiv>

          <Button 
            variant="outline" 
            onClick={goNext} 
            disabled={current === total - 1 || isNavigating}
            className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-2.5 disabled:opacity-50 hover:bg-lime-50 border-lime-300/50 text-lime-700 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-lime-400 text-xs sm:text-sm lg:text-base min-h-[44px] sm:min-h-[48px]"
            aria-label="Next section"
          >
            <ArrowBigRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
          </Button>
        </MotionDiv>
      </Card>

      {/* Keyboard hint */}
      <MotionDiv 
        className="mt-4 text-center text-xs text-gray-500"
        variants={fadeInUp}
      >
        <MotionSpan>Use arrow keys or click to navigate</MotionSpan>
      </MotionDiv>
    </MotionDiv>
  );
}