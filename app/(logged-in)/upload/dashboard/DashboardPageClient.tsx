"use client";
import BgGradient from '@/components/ui/common/bg-gradient';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { SummaryCard } from '@/components/ui/summaries/summary-card';
import EmptySummaryState from '@/components/ui/summaries/empty-summary-state';
import { DeleteButton } from '@/components/ui/summaries/delete-button';
import { DailyLimitIndicator } from '@/components/ui/upload/daily-limit-indicator';

type Summary = {
  id: string;
  title: string;
  summary_text: string;
  createdAt: string;
};

export default function DashboardPageClient({ initialSummaries }: { initialSummaries: Summary[] }) {
  const [summaries, setSummaries] = useState<Summary[]>(initialSummaries);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Prefetch the upload page for faster navigation
  useEffect(() => {
    const prefetchUpload = async () => {
      try {
        // Prefetch the upload page
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = '/upload';
        document.head.appendChild(link);
      } catch (error) {
        console.log('Prefetch failed:', error);
      }
    };
    prefetchUpload();
  }, []);

  const handleDelete = (id: string) => {
    setDeletingId(id);
    setTimeout(() => {
      setSummaries((prev) => prev.filter((s) => s.id !== id));
      setDeletingId(null);
    }, 400); // match the animation duration
  };

  return (
    <main className="min-h-screen">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6 mt-16 sm:mt-20 md:mt-24 lg:mt-28 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-lime-800 font-bold drop-shadow py-2 sm:py-3 leading-tight">
              Your Saar&apos;s
            </h1>
            <p className="drop-shadow text-lime-800 py-1 text-xs sm:text-sm lg:text-base xl:text-lg mt-2">
              We have safely kept your summaries for you.
            </p>
          </div>
          <Link href="/upload" prefetch={true}>
            <Button
              variant={'default'}
              className="bg-gradient-to-r from-primary to-yellow-400 hover:from-primary hover:to-yellow-400 hover:scale-105 transition-all duration-300 group hover:no-underline text-white font-semibold rounded-lg text-xs sm:text-sm lg:text-base px-3 sm:px-4 lg:px-6 py-2 sm:py-3 flex items-center gap-2 min-h-[44px] sm:min-h-[48px]"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="hidden xs:inline">New Summary</span>
              <span className="xs:hidden">New</span>
            </Button>
          </Link>
        </div>

        {/* Daily Limit Indicator */}
        <div className="max-w-md">
          <DailyLimitIndicator />
        </div>

   

        {/* Summaries Grid or Empty State */}
        {summaries.length === 0 ? (
          <EmptySummaryState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-4 z-10">
            {summaries.map((summary) => (
              <div key={summary.id} className="block relative group">
                <SummaryCard
                  title={summary.title}
                  createdAt={summary.createdAt}
                  preview={summary.summary_text}
                  description={summary.summary_text}
                  className={deletingId === summary.id ? 'fade-out' : ''}
                  renderContent={cardContent => cardContent}
                />
                {/* Separate clickable overlay for navigation */}
                <Link 
                  href={`/upload/summaries/${summary.id}`} 
                  prefetch={true}
                  className="absolute inset-0 z-10"
                  onClick={(e) => {
                    // Don't navigate if clicking on delete button area
                    const target = e.target as HTMLElement;
                    if (target.closest('[data-delete-button]')) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                />
                {/* Delete button positioned above the link */}
                <div 
                  className="absolute top-2 sm:top-3 right-2 sm:right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  data-delete-button
                >
                  <DeleteButton summaryId={summary.id} onDelete={handleDelete} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 