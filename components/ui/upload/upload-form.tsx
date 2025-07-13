'use client';

// Import necessary dependencies
import { generatePdfSummary } from '@/actions/upload-actions';
import { useUploadThing } from '@/utils/uploadthing';
import UploadFormInput from './upload-form-input';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Brain, Lock } from 'lucide-react';
import { DailyLimitIndicator } from './daily-limit-indicator';
import { 
  MotionDiv, 
  MotionH3, 
  MotionP, 
  MotionSpan,
  fadeInUp,
  scaleIn,
  staggerContainer
} from '@/components/ui/common/motion-wrapper';

// File validation schema using Zod
const schema = z.object({
  file: z
    .instanceof(File, { message: 'Invalid file' })
    // Validate file size (max 16MB for Vercel free tier)
    .refine((file) => file.size <= 1024 * 1024 * 16, 'File size must be less than 16MB')
    // Validate file types (PDF, DOC, DOCX, TXT)
    .refine(
      (file) =>
        [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain',
        ].includes(file.type),
      'File must be a PDF, DOC, DOCX, or TXT'
    ),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dailyLimitReached, setDailyLimitReached] = useState(false);
  const [processingStage, setProcessingStage] = useState<'idle' | 'uploading' | 'processing' | 'saving'>('idle');
  const router = useRouter();
  
  // Initialize upload functionality with UploadThing
  const { startUpload, isUploading } = useUploadThing('fileUploader', {
    // Callback when upload completes successfully
    onClientUploadComplete: () => {
      console.log('Upload completed successfully!');
      toast.success('🚀 File uploaded successfully! Now let\'s work some AI magic... ✨');
      setProcessingStage('processing');
    },
    // Callback when upload encounters an error
    onUploadError: (err) => {
      console.log('Error occurred while uploading: ' + err.message);
      toast.error('❌ Upload failed! Please try again or check your file.');
      setProcessingStage('idle');
    },
    // Callback when upload begins
    onUploadBegin: (fileName) => {
      console.log('Upload has begun for', fileName);
      toast('📤 Starting upload... Please wait while we transfer your file securely 🔒');
      setProcessingStage('uploading');
    },
  });

  // Memoized daily limit check to prevent unnecessary re-renders
  const checkDailyLimit = useCallback(async () => {
    try {
      console.log('Upload form: Checking daily limit...');
      const response = await fetch('/api/daily-limit');
      console.log('Upload form: Daily limit response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Upload form: Daily limit data:', data);
        setDailyLimitReached(!data.canCreate);
      } else {
        console.error('Upload form: Daily limit response not ok:', response.status);
      }
    } catch (error) {
      console.error('Upload form: Error checking daily limit:', error);
    }
  }, []);

  // Check limits on mount and listen for updates
  useEffect(() => {
    // Check limits on initial load
    checkDailyLimit();
    
    const handleSummaryCreated = () => {
      checkDailyLimit();
    };

    window.addEventListener('summary-created', handleSummaryCreated);
    return () => {
      window.removeEventListener('summary-created', handleSummaryCreated);
    };
  }, [checkDailyLimit]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setProcessingStage('uploading');
      
      const formData = new FormData(e.currentTarget);
      const file = formData.get('file') as File;
      
      console.log('File to upload:', file.name, file.size, file.type);
      
      // Validate file using schema
      const validatedFields = schema.safeParse({ file });
      if (!validatedFields.success) {
        toast.error(validatedFields.error?.flatten().fieldErrors.file?.[0] ?? 'Invalid file');
        setIsLoading(false);
        setProcessingStage('idle');
        return;
      }
      
      // Start the upload process
      const resp = await startUpload([file]);
      console.log('Upload response:', resp);
      
      if (!resp) {
        toast.error('⚠️ Upload failed! Please try a different file or check your connection.');
        setIsLoading(false);
        setProcessingStage('idle');
        return;
      }
      
      const filteredResp = resp.filter((item) => item.serverData !== null);
      console.log('Filtered response:', filteredResp);
      
      if (filteredResp.length === 0) {
        toast.error('❌ No files were processed successfully. Please try again.');
        setIsLoading(false);
        setProcessingStage('idle');
        return;
      }
      
      setProcessingStage('processing');
      toast('🧠 AI is analyzing your document... This might take a few moments ⏳');
      
      const summary = await generatePdfSummary(
        filteredResp.map((item) => ({ serverData: item.serverData! }))
      );
      console.log('Summary response:', summary);
      
      // Check if any file was successfully processed
      if (filteredResp.length > 0) {
              if(summary && summary.success && summary.data){
        console.log('Summary processing started:', summary.data);
        
        toast.success('🎉 File uploaded successfully! Processing your document in the background... 🚀');
        formRef.current?.reset();
        // Dispatch event to refresh daily limit indicators
        window.dispatchEvent(new CustomEvent('summary-created'));
        router.push(`/upload/summaries/${summary.data.id}`);
      } else {
        console.log('Summary generation failed:', summary);
        toast.error(summary?.message || '🤖 AI had trouble processing your document. Please try again.');
        setProcessingStage('idle');
      }
      }

    } catch (err) {
      console.error('Error in handleSubmit:', err);
      toast.error('💥 Something went wrong! Please try again or contact support.');
      setProcessingStage('idle');
    } finally {
      setIsLoading(false);
    }
  };

  // Get processing stage message
  const getProcessingMessage = () => {
    switch (processingStage) {
      case 'uploading':
        return '📤 Uploading your file...';
      case 'processing':
        return '🧠 AI is analyzing your document...';
      case 'saving':
        return '💾 Saving your summary...';
      default:
        return '';
    }
  };

  return (
    <MotionDiv 
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Daily Limit Card with extra margin */}
      <div className="w-full flex flex-col items-center mb-10">
        <DailyLimitIndicator />
      </div>
      {/* Upload Form Card */}
      <MotionDiv className="w-full max-w-2xl mx-auto">
        <MotionDiv 
          className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-lime-200/50 p-4 sm:p-6 lg:p-8 xl:p-10 flex flex-col items-center"
          variants={scaleIn}
        >
          <MotionDiv className="absolute -inset-1 bg-gradient-to-r from-lime-400/20 via-yellow-400/20 to-primary/20 rounded-2xl blur opacity-30"></MotionDiv>
          <MotionDiv className="relative space-y-4 sm:space-y-6 lg:space-y-8 w-full flex flex-col items-center">
            {/* Daily Limit Message */}
            {dailyLimitReached && (
              <MotionDiv 
                className="text-center p-4 bg-red-50 border border-red-200 rounded-lg"
                variants={fadeInUp}
              >
                <MotionP className="text-red-700 text-sm font-medium">
                  🚫 Daily limit reached! You can create up to 5 summaries per day. Please try again tomorrow.
                </MotionP>
              </MotionDiv>
            )}
            {/* Processing Stage Indicator */}
            {processingStage !== 'idle' && (
              <MotionDiv 
                className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg"
                variants={fadeInUp}
              >
                <MotionDiv className="flex items-center justify-center gap-2">
                  <MotionDiv className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></MotionDiv>
                  <MotionSpan className="text-blue-700 text-sm font-medium">
                    {getProcessingMessage()}
                  </MotionSpan>
                </MotionDiv>
              </MotionDiv>
            )}
            {/* File Input Component */}
            <UploadFormInput isLoading={isLoading || dailyLimitReached} ref={formRef} onSubmit={handleSubmit} />
            {/* Upload Progress Indicator */}
            {isUploading && (
              <MotionDiv 
                className="text-primary text-center font-semibold text-sm sm:text-base"
                variants={fadeInUp}
              >
                Uploading...
              </MotionDiv>
            )}
          </MotionDiv>
        </MotionDiv>
      </MotionDiv>
      {/* Feature Highlights Section */}
      <MotionDiv 
        className="mt-6 sm:mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl mx-auto"
        variants={staggerContainer}
      >
        {[
          {
            title: 'Fast Processing',
            desc: 'Results in seconds',
            icon: (
              <MotionSpan className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-yellow-200 via-lime-200 to-yellow-100 shadow-md mb-3 mx-auto">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-yellow-500" strokeWidth={2.2} />
              </MotionSpan>
            ),
          },
          {
            title: 'Smart AI',
            desc: 'Advanced summarization',
            icon: (
              <MotionSpan className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-lime-200 via-yellow-100 to-primary/20 shadow-md mb-3 mx-auto">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-lime-600" strokeWidth={2.2} />
              </MotionSpan>
            ),
          },
          {
            title: 'Secure & Private',
            desc: 'Your data is protected',
            icon: (
              <MotionSpan className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-primary/10 via-lime-100 to-yellow-100 shadow-md mb-3 mx-auto">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary" strokeWidth={2.2} />
              </MotionSpan>
            ),
          },
        ].map((feature, index) => (
          <MotionDiv
            key={index}
            className="group text-center p-4 sm:p-6 bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200/60 shadow-md hover:shadow-xl hover:scale-105 hover:border-primary/40 transition-all duration-300 flex flex-col items-center"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
          >
            {feature.icon}
            <MotionH3 className="font-extrabold text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-900 mb-1 group-hover:text-primary transition-colors duration-200">{feature.title}</MotionH3>
            <MotionP className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">{feature.desc}</MotionP>
          </MotionDiv>
        ))}
      </MotionDiv>
    </MotionDiv>
  );
} 