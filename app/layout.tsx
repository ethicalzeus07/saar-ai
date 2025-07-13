import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import BgGradient from '@/components/ui/common/bg-gradient';
import { Toaster } from '@/components/ui/sonner'; 
import Navigation from '@/components/ui/common/navigation';
import { MotionDiv } from '@/components/ui/common/motion-wrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#84cc16" />
      </head>
      <body className="relative overflow-x-hidden">
        {/* Immersive gradient background for all pages, including header */}
        <MotionDiv 
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <BgGradient />
        </MotionDiv>
        <ClerkProvider>
          <Navigation />
          {children}
          <Toaster /> 
        </ClerkProvider>
      </body>
    </html>
  );
}