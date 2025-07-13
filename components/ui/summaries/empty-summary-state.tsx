import { FileText } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';

export default function EmptySummaryState() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-12 sm:py-16 md:py-24 gap-4 sm:gap-6">
      <FileText className="mb-2 text-primary w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32" />
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-muted-foreground font-semibold text-center px-4">No summaries yet</h2>
      <p className="text-muted-foreground text-center max-w-md px-4 text-sm sm:text-base">
        Upload your first PDF to get started with Saar-ai summaries.
      </p>
      <Link href="/upload" prefetch={true}>
        <Button className="bg-gradient-to-r from-primary to-yellow-400 hover:from-primary hover:to-yellow-400 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base shadow-md hover:scale-105 transition-all duration-300">
          <span className="hidden xs:inline">Create Your First Summary</span>
          <span className="xs:hidden">Create Summary</span>
        </Button>
      </Link>
    </div>
  );
}
