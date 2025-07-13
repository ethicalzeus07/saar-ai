import { FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DownloadSummaryButton } from "./download-summary-button";
import React from "react";
import { 
  MotionSection, 
  MotionDiv, 
  MotionSpan,
  fadeInUp
} from '@/components/ui/common/motion-wrapper';

export const SourceInfo = React.memo(function SourceInfo({
  fileName,
  originalFileUrl,
  title,
  summaryText,
  createdAt,
}: {
  fileName: string;
  originalFileUrl: string;
  title: string;
  summaryText: string;
  createdAt: string;
}) {
  return (
    <MotionSection
      className="w-full rounded-lg px-4 py-3 flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
      aria-label="Source information"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      <MotionDiv className="flex items-center gap-2 min-w-0">
        <MotionSpan title="File source">
          <FileText className="h-4 w-4 text-lime-600" aria-hidden="true" />
        </MotionSpan>
        <MotionSpan className="font-semibold truncate" title={fileName}>
          Source: {fileName}
        </MotionSpan>
      </MotionDiv>
      <MotionDiv className="hidden lg:block h-6 border-l border-muted mx-2" aria-hidden="true" />
      <MotionDiv className="flex gap-2 items-center">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-lime-600 hover:text-lime-700 hover:bg-lime-50"
          asChild
        >
          <a
            href={originalFileUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="View original file"
          >
            <ExternalLink className="h-4 w-4 mr-1" aria-hidden="true" />
            View Original
          </a>
        </Button>
        <DownloadSummaryButton
          title={title}
          summaryText={summaryText}
          fileName={fileName}
          createdAt={createdAt}
        />
      </MotionDiv>
    </MotionSection>
  );
});