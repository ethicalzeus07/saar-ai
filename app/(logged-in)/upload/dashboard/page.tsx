import { getSummaries } from '@/lib/summaries';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import DashboardPageClient from './DashboardPageClient';

type Summary = {
  id: string;
  title: string;
  summary_text: string;
  createdAt: string;
};

// Loading component for better UX
function DashboardLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-lime-600"></div>
    </div>
  );
}

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user?.id) return redirect('/sign-in');
  
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardPageContent userId={user.id} />
    </Suspense>
  );
}

async function DashboardPageContent({ userId }: { userId: string }) {
  const summaries = await getSummaries(userId) as Summary[];
  return <DashboardPageClient initialSummaries={summaries} />;
}
