'use client';
import { Badge } from '@/components/ui/badge';
import { Flame } from 'lucide-react';
import { 
  MotionDiv, 
  MotionH1, 
  MotionP, 
  MotionSpan,
  fadeInUp,
  scaleIn,
  staggerContainer
} from '@/components/ui/common/motion-wrapper';

export default function UploadHeader() {
  return (
    <MotionDiv 
      className="mb-12 flex flex-col items-center gap-6 text-center"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <MotionDiv 
        className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-lime-400 via-yellow-400 to-primary animate-gradient-x group"
        variants={scaleIn}
      >
        <Badge
          variant="secondary"
          className="relative px-6 py-3 text-base font-medium bg-white rounded-full hover:bg-yellow-50 transition-colors duration-300 flex items-center gap-2"
        >
          <Flame className="h-6 w-6 text-yellow-400 animate-pulse" strokeWidth={2.5} />
          <MotionSpan className="text-primary font-semibold">AI-Powered Content Creation</MotionSpan>
        </Badge>
      </MotionDiv>
      <MotionH1 
        className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight"
        variants={fadeInUp}
      >
        Start Uploading{' '}
        <MotionSpan className="relative">
          <MotionSpan className="bg-gradient-to-r from-lime-100 to-yellow-100 px-3 py-1 rounded-lg">
            Your Files
          </MotionSpan>
        </MotionSpan>
      </MotionH1>
      <MotionP 
        className="text-gray-600 text-lg sm:text-xl max-w-2xl leading-relaxed"
        variants={fadeInUp}
      >
        Upload your documents and let our AI do the magic! ✨
      </MotionP>
    </MotionDiv>
  );
} 