'use client';

import { useState, useCallback, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import BgGradient from "./bg-gradient";
import { 
  MotionSection, 
  MotionDiv, 
  MotionH2, 
  MotionSpan,
  fadeInUp,
  scaleIn,
  staggerContainer
} from './motion-wrapper';

const slides = [
  {
    title: "🚀 Welcome to Saar-ai!",
    bullets: [
      "🤖 Instantly summarize any PDF with AI.",
      "✨ Create reel-style innovative summaries and save long reading time with AI.",
      "🔒 Your files are always private.",
    ],
  },
  {
    title: "📤 How to Upload",
    bullets: [
      "🖱️ Click 'Upload a PDF' in the top right.",
      "📄 Select your PDF file.",
      "⚡ Get your summary in seconds.",
    ],
  },
  {
    title: "📝 Instant Summaries",
    bullets: [
      "🧠 AI extracts key points and topics.",
      "📋 Easy-to-read summary reels.",
      "📥 Download or copy your summary.",
    ],
  },
  {
    title: "📚 Your Dashboard",
    bullets: [
      "🗂️ All your summaries in one place.",
      "🔍 Search and review anytime.",
      "🗑️ Delete or manage your files.",
    ],
  },
];

export default function DemoSection() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const goNext = useCallback(() => {
    if (current < total - 1) setCurrent((c) => c + 1);
  }, [current, total]);
  const goPrev = useCallback(() => {
    if (current > 0) setCurrent((c) => c - 1);
  }, [current]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  // Helper to render a card (main or background)
  function renderCard(idx: number, isMain: boolean) {
    if (idx < 0 || idx >= total) return null;
    const slide = slides[idx];
    return (
      <Card
        key={idx}
        className={`relative w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl h-[400px] sm:h-[450px] md:h-[520px] lg:h-[580px] xl:h-[640px] flex flex-col rounded-xl sm:rounded-2xl lg:rounded-3xl border border-gray-100 bg-white/60 bg-gradient-to-br from-white/80 via-lime-50/40 to-white/90 backdrop-blur-xl overflow-hidden mx-auto transition-all duration-300
          ${isMain ? 'z-10 shadow-2xl hover:shadow-3xl' : 'z-0 opacity-60 scale-95 blur-sm pointer-events-none -translate-y-4 sm:-translate-y-6'}
        `}
        style={isMain ? {} : { position: 'absolute', left: 0, right: 0, margin: 'auto' }}
      >
        {/* Progress bar */}
        <MotionDiv className="px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4 lg:pt-6 pb-2 z-10">
          <MotionDiv className="w-full bg-gray-200/60 rounded-full h-2 shadow-inner">
            <MotionDiv
              className="bg-gradient-to-r from-lime-400 via-lime-500 to-lime-300 h-2 rounded-full transition-all duration-300 ease-out shadow-md animate-pulse"
              style={{ width: `${((idx + 1) / total) * 100}%` }}
            />
          </MotionDiv>
        </MotionDiv>
        <CardHeader className="pb-2 px-3 sm:px-4 lg:px-6 pt-2 flex-shrink-0 z-10">
          <CardTitle className="text-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-extrabold text-lime-800 leading-tight tracking-tight drop-shadow-sm">
            {slide.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-4 lg:px-6 pt-2 flex-1 flex flex-col justify-center items-center z-10">
          <MotionDiv className="space-y-2 sm:space-y-3 w-full max-w-sm sm:max-w-md">
            {slide.bullets.map((point, i) => (
              <MotionDiv
                key={i}
                className="bg-white/90 border border-lime-200/60 rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 xl:p-5 text-xs sm:text-sm lg:text-base xl:text-lg text-gray-700 leading-relaxed shadow-lg hover:shadow-xl hover:bg-lime-50/80 hover:border-lime-400 transition-all duration-200 backdrop-blur-md flex items-start gap-2 sm:gap-3"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: i * 0.1 }}
              >
                <MotionSpan>{point}</MotionSpan>
              </MotionDiv>
            ))}
          </MotionDiv>
        </CardContent>
        {/* Navigation and progress inside main card only */}
        {isMain && (
          <MotionDiv className="absolute bottom-0 left-0 right-0 px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6 pt-2 sm:pt-3 lg:pt-4 flex items-center justify-between border-t border-gray-200/50 bg-white/80 backdrop-blur-md rounded-b-xl sm:rounded-b-2xl lg:rounded-b-3xl shadow-inner z-20">
            <Button
              variant="outline"
              onClick={goPrev}
              disabled={current === 0}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-2.5 disabled:opacity-50 hover:bg-lime-50 border-lime-300/50 text-lime-700 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-lime-400 text-xs sm:text-sm lg:text-base min-h-[44px] sm:min-h-[48px]"
              aria-label="Previous section"
            >
              <ArrowBigLeft className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
            </Button>
            <MotionDiv className="bg-white text-lime-500 border border-lime-500 px-2 sm:px-3 lg:px-4 xl:px-6 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm lg:text-base font-medium min-w-12 sm:min-w-16 lg:min-w-20 xl:min-w-24 text-center">
              {idx + 1} <MotionSpan className="opacity-70 font-normal text-lime-500">of</MotionSpan> {total}
            </MotionDiv>
            <Button
              variant="outline"
              onClick={goNext}
              disabled={current === total - 1}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-2.5 disabled:opacity-50 hover:bg-lime-50 border-lime-300/50 text-lime-700 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-lime-400 text-xs sm:text-sm lg:text-base min-h-[44px] sm:min-h-[48px]"
              aria-label="Next section"
            >
              <ArrowBigRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
            </Button>
          </MotionDiv>
        )}
      </Card>
    );
  }

  // Determine which card to show as background
  const bgIdx = current === 0 ? 1 : current - 1;

  return (
    <BgGradient>
      <MotionSection 
        className="relative overflow-hidden bg-white"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <MotionDiv className="py-6 sm:py-8 lg:py-12 xl:py-16 2xl:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
          <MotionH2
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-center mb-3 sm:mb-4 lg:mb-6 xl:mb-8 animate-fade-in-up bg-clip-text text-transparent bg-gradient-to-r from-lime-600 via-lime-500 to-lime-400 leading-tight"
            style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            variants={fadeInUp}
          >
            How Saar-ai Works
          </MotionH2>
          <MotionDiv 
            className="relative flex flex-row w-full justify-center items-center mt-4 sm:mt-6 lg:mt-8 xl:mt-12 min-h-[400px] sm:min-h-[450px] md:min-h-[520px] lg:min-h-[580px] xl:min-h-[640px]"
            variants={scaleIn}
          >
            {renderCard(bgIdx, false)}
            {renderCard(current, true)}
          </MotionDiv>
        </MotionDiv>
      </MotionSection>
    </BgGradient>
  );
}