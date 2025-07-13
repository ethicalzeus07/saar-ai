'use client';

import React, { forwardRef, useRef, useState } from 'react';
import { Loader2, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  MotionDiv, 
  MotionSpan,
  scaleIn
} from '@/components/ui/common/motion-wrapper';
import { Button } from '@/components/ui/button';

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(({ onSubmit, isLoading}, ref) => {
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonPress = () => {
    if (!isLoading) {
      setIsButtonPressed(true);
    }
  };

  const handleButtonRelease = () => {
    setIsButtonPressed(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const triggerFileInput = () => {
    if (!isLoading) fileInputRef.current?.click();
  };

  return (
    <MotionDiv
      variants={scaleIn}
      initial="initial"
      animate="animate"
    >
      <form ref={ref} className="flex flex-col gap-4 sm:gap-6" onSubmit={onSubmit}>
        <MotionDiv className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full">
          {/* Custom File Input Button */}
          <button
            type="button"
            onClick={triggerFileInput}
            disabled={isLoading}
            className={cn(
              'flex items-center gap-2 bg-lime-100 hover:bg-lime-200 text-lime-800 font-medium rounded-lg px-5 py-3 shadow transition-all duration-200 border border-lime-200 focus:outline-none focus:ring-2 focus:ring-lime-400',
              isLoading && 'opacity-50 cursor-not-allowed'
            )}
          >
            <Upload className="w-5 h-5" />
            <span>{selectedFile ? 'Change File' : 'Choose File'}</span>
          </button>
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            id="file"
            type="file"
            name="file"
            accept=".pdf,.doc,.docx,.txt"
            required
            className="hidden"
            disabled={isLoading}
            onChange={handleFileChange}
          />
          {/* Filename Preview */}
          <span className="text-sm text-gray-700 min-h-[24px] px-2 py-1 bg-lime-50 rounded-md border border-lime-100 w-full sm:w-auto text-center">
            {selectedFile ? selectedFile.name : 'No file chosen'}
          </span>
          {/* Upload Button */}
          <Button
            disabled={isLoading || !selectedFile}
            type="submit"
            onMouseDown={handleButtonPress}
            onMouseUp={handleButtonRelease}
            onMouseLeave={handleButtonRelease}
            onTouchStart={handleButtonPress}
            onTouchEnd={handleButtonRelease}
            className={cn(
              'flex items-center gap-2 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-lg px-6 py-3 shadow transition-all duration-200 min-h-[48px] text-base',
              isButtonPressed && !isLoading && 'scale-95',
              (isLoading || !selectedFile) && 'cursor-not-allowed opacity-75'
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                <MotionSpan className="hidden xs:inline">Processing...</MotionSpan>
                <MotionSpan className="xs:hidden">Processing</MotionSpan>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                <MotionSpan className="hidden xs:inline">Upload File</MotionSpan>
                <MotionSpan className="xs:hidden">Upload</MotionSpan>
              </>
            )}
          </Button>
        </MotionDiv>
      </form>
    </MotionDiv>
  );
});

UploadFormInput.displayName = 'UploadFormInput';

export default UploadFormInput;
