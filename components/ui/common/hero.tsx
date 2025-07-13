"use client";

import Link from "next/link";
import { Button } from "../button";
import { Flame, ArrowRight } from "lucide-react";
import { Badge } from "../badge";
import BgGradient from "./bg-gradient";
import InfoCard from "./info-card";
import { 
  MotionSection, 
  MotionDiv, 
  MotionH1, 
  MotionH2, 
  MotionP, 
  MotionSpan,
  fadeInUp,
  fadeInDown,
  scaleIn,
  staggerContainer
} from "./motion-wrapper";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function HeroSection() {
  return (
    <BgGradient>
      <MotionSection 
        className="relative mx-auto flex flex-col z-0 items-center justify-center py-8 sm:py-12 lg:py-16 xl:py-20 animate-in px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <MotionDiv className="text-center" variants={fadeInDown}>
          <MotionDiv className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-lime-400 via-yellow-400 to-primary animate-gradient-x group mb-4 sm:mb-6 lg:mb-8">
            <Badge
              variant="secondary"
              className="relative px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-medium bg-white rounded-full group hover:bg-yellow-50 transition-colors duration-200 flex items-center gap-2 sm:gap-3"
            >
              <Flame className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10 text-yellow-400 animate-pulse" strokeWidth={3} />
              <MotionP className="text-primary text-xs sm:text-sm lg:text-base xl:text-lg">Powered by AI</MotionP>
            </Badge>
          </MotionDiv>
        </MotionDiv>
        
        <MotionH1 
          className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-center leading-tight px-2 sm:px-4 lg:px-8 mb-3 sm:mb-4 lg:mb-6 xl:mb-8"
          variants={fadeInUp}
        >
          Transform Files into{" "}
          <MotionSpan className="relative inline-block">
            <MotionSpan className="relative z-10 px-1 sm:px-2 lg:px-3">Summaries</MotionSpan>
            <MotionSpan
              className="absolute inset-0 z-0 rounded-lg bg-gradient-to-r from-yellow-300 via-lime-300 to-yellow-200 opacity-30 blur-sm"
              aria-hidden="true"
            />
          </MotionSpan>{" "}
          <MotionSpan className="text-primary font-extrabold bg-gradient-to-r from-lime-400 to-primary bg-clip-text text-transparent animate-pulse">
            {"{saar}"}
          </MotionSpan>
        </MotionH1>
        
        <MotionH2 
          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-center px-2 sm:px-4 lg:px-8 lg:max-w-4xl mb-4 sm:mb-6 lg:mb-8 xl:mb-10 text-gray-700 leading-relaxed"
          variants={fadeInUp}
        >
          Save your time and get summary reels of your files.
        </MotionH2>
        
        <MotionDiv 
          className="mb-4 sm:mb-6 lg:mb-8 xl:mb-10 w-full max-w-md sm:max-w-lg mx-auto"
          variants={scaleIn}
        >
          <InfoCard />
        </MotionDiv>
        
        <MotionDiv className="flex items-center justify-center" variants={fadeInUp}>
          <SignedIn>
            <Link href="/upload" prefetch={true}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-yellow-400 hover:from-primary hover:to-yellow-400 text-white font-semibold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg lg:text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 sm:gap-3 min-h-[48px] sm:min-h-[56px]"
              >
                <MotionSpan className="flex items-center gap-2 sm:gap-3">
                  Try Saar-ai
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </MotionSpan>
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-up" prefetch={true}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-yellow-400 hover:from-primary hover:to-yellow-400 text-white font-semibold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg lg:text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 sm:gap-3 min-h-[48px] sm:min-h-[56px]"
              >
                <MotionSpan className="flex items-center gap-2 sm:gap-3">
                  Try Saar-ai
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </MotionSpan>
              </Button>
            </Link>
          </SignedOut>
        </MotionDiv>
      </MotionSection>
    </BgGradient>
  );
}