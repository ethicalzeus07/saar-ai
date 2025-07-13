import BgGradient from "@/components/ui/common/bg-gradient";
import { getSummaryById } from "@/lib/summaries";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SummaryHeader } from "@/components/ui/summaries/summary-header";
import { SummaryViewer } from "@/components/ui/summaries/summary-viewer";
import { ProcessingStatus } from "@/components/ui/summaries/processing-status";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DownloadSummaryButton } from "@/components/ui/summaries/download-summary-button";

// Loading component for better UX
function SummaryLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-lime-600"></div>
    </div>
  );
}

export default async function SummaryPage(props: {
    params: Promise<{ id: string }>;
  }) {
    const params = await props.params;
    const id = params.id;
  
    return (
      <Suspense fallback={<SummaryLoading />}>
        <SummaryPageContent id={id} />
      </Suspense>
    );
}

async function SummaryPageContent({ id }: { id: string }) {
  const summary = await getSummaryById(id);

  if (!summary) {
    notFound();
  }
  
  const { title, file_name, word_count, created_at, summary_text, original_file_url, status } = summary;
  const createdAtStr = typeof created_at === 'string' ? created_at : created_at.toISOString();
  
  // Show processing status if the summary is still being processed
  if (status === 'processing' || status === 'failed') {
    return (
      <div className="relative isolate min-h-screen">
        <BgGradient className="from-lime-400 via-lime-300 to-lime-200 opacity-80" />
        <ProcessingStatus summaryId={id} initialStatus={status} />
      </div>
    );
  }
  
  return (
    <div className="relative isolate min-h-screen">
      {/* Decorative background blobs */}
      <div className="absolute -top-16 sm:-top-32 -left-16 sm:-left-32 w-48 sm:w-96 h-48 sm:h-96 bg-lime-200/30 rounded-full blur-3xl opacity-30 pointer-events-none z-0 animate-pulse" />
      <div className="absolute -bottom-16 sm:-bottom-32 -right-16 sm:-right-32 w-48 sm:w-96 h-48 sm:h-96 bg-yellow-100/30 rounded-full blur-3xl opacity-30 pointer-events-none z-0 animate-pulse" />
      <BgGradient className="from-lime-400 via-lime-300 to-lime-200 opacity-80" />
      <div className="container mx-auto flex flex-col gap-2 sm:gap-4 relative z-10">
        <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-12 lg:py-24">
          <div className="flex flex-col">
            <SummaryHeader
              title={title}
              createdAt={createdAtStr}
            />

            {/* Action row just above the card */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center sm:items-stretch mt-2 sm:mt-4 mb-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 sm:h-8 px-2 sm:px-3 text-lime-600 hover:text-lime-700 hover:bg-lime-50 text-xs sm:text-sm rounded-lg sm:rounded-xl transition-all duration-200"
                asChild
              >
                <a
                  href={original_file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View original file"
                >
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" aria-hidden="true" />
                  <span className="hidden xs:inline">View Original</span>
                  <span className="xs:hidden">Original</span>
                </a>
              </Button>
              <DownloadSummaryButton
                title={title}
                summaryText={summary_text}
                fileName={file_name}
                createdAt={createdAtStr}
              />
            </div>
          </div>
          <div className="relative mt-2 sm:mt-3 md:mt-6 lg:mt-12">
            <div className="min-h-[80vh] min-w-[1000px] relative p-3 sm:p-4 md:p-6 lg:p-8 bg-white/50 backdrop-blur-lg rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-yellow-100/30 transition-all duration-300 hover:shadow-3xl hover:bg-white/60 max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/40 via-yellow-50/20 to-transparent opacity-40 rounded-xl sm:rounded-2xl md:rounded-3xl z-0" />
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-lime-700 bg-gradient-to-r from-lime-100/80 via-lime-50/80 to-white/80 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md border border-lime-200/60 z-10">
                <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-lime-500 flex-shrink-0" />
                <span className="hidden xs:inline">{word_count?.toLocaleString()} words</span>
                <span className="xs:hidden">{word_count?.toLocaleString()}</span>
              </div>
              <div className="relative mt-6 sm:mt-8 md:mt-6 flex justify-center">
                <SummaryViewer summary={summary.summary_text} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}