import HeroSection from "@/components/ui/common/hero";
import BgGradient from "@/components/ui/common/bg-gradient";
import DemoSection from "@/components/ui/common/demo";
import HowItWorksSection from "@/components/ui/common/how-it-works";
import ReviewsSection from "@/components/ui/common/reviews";
import CTASection from "@/components/ui/common/cta";
import { MotionDiv } from "@/components/ui/common/motion-wrapper";

export default function Home() {
  return (
    <BgGradient className="relative w-full">
      <MotionDiv 
        className="flex flex-col mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
      </MotionDiv>
      <DemoSection />
      <HowItWorksSection />
      <ReviewsSection />
      <CTASection />
    </BgGradient>
  );
}
