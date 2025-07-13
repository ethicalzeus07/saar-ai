'use client';

import UploadHeader from '@/components/ui/upload/upload-header';
import UploadForm from '@/components/ui/upload/upload-form';

export default function Page() {
  return (
    <section className="relative flex justify-center items-center min-h-[70vh] py-12 lg:py-24 overflow-hidden">
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center z-10">
        <UploadHeader />
        <UploadForm />
      </div>
    </section>
  );
}