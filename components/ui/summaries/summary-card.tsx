"use client";

import React from "react";
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { 
  MotionDiv, 
  MotionSpan
} from '@/components/ui/common/motion-wrapper';

interface SummaryCardProps {
  title: string;
  createdAt: string;
  preview: string;
  description?: string;
  fileUrl?: string;
  className?: string;
  renderContent?: (content: React.ReactNode) => React.ReactNode;
}

export function SummaryCard({ title, createdAt, preview, description, className, renderContent }: SummaryCardProps) {
  const cardContent = (
    <Card className={`relative overflow-hidden bg-white/90 backdrop-blur-sm border border-lime-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-lime-400/70 group ${className || ''}`}>
      <CardHeader className="pb-2 px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4 lg:pt-6 flex-shrink-0">
        <MotionDiv className="flex items-start justify-between gap-2 sm:gap-3">
          <CardTitle className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {title}
          </CardTitle>
          <MotionDiv className="flex-shrink-0">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-lime-500" />
          </MotionDiv>
        </MotionDiv>
        <MotionDiv className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
          <MotionSpan>{new Date(createdAt).toLocaleDateString()}</MotionSpan>
          <MotionSpan>•</MotionSpan>
          <MotionSpan>{new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</MotionSpan>
        </MotionDiv>
      </CardHeader>
      <CardContent className="flex-1 px-3 sm:px-4 lg:px-6 pb-2 flex flex-col gap-1 sm:gap-2">
        <MotionDiv className="text-xs sm:text-sm lg:text-base text-gray-700 line-clamp-3 mb-1 leading-relaxed">
          {description ? description : preview}
        </MotionDiv>
      </CardContent>
      <MotionDiv className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 mt-auto flex justify-end">
        <MotionSpan className="inline-flex items-center gap-1 bg-lime-200/80 text-lime-800 text-[9px] sm:text-[10px] lg:text-xs xl:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-semibold shadow transition-all border border-lime-300">
          <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-lime-500 flex-shrink-0" />
          <MotionSpan className="hidden xs:inline">Completed</MotionSpan>
          <MotionSpan className="xs:hidden">Done</MotionSpan>
        </MotionSpan>
      </MotionDiv>
      {/* Decorative gradient blob */}
      <MotionDiv className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-8 -right-4 sm:-right-6 lg:-right-8 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32 bg-lime-100 rounded-full blur-2xl opacity-60 pointer-events-none" />
    </Card>
  );

  return renderContent ? renderContent(cardContent) : cardContent;
}


