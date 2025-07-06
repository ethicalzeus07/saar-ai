import HeroSection from "@/components/ui/common/hero";
import BgGradient from "@/components/ui/common/bg-gradient";
import DemoSection from "@/components/ui/common/demo";
import HowItWorksSection from "@/components/ui/common/how-it-works";
import PricingSection from "@/components/ui/common/pricing";
import CTASection from "@/components/ui/common/cta";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col mb-20">
        <HeroSection />
      </div>
      <DemoSection />
      <HowItWorksSection />
      <PricingSection />
      <CTASection />
    </div>
  );
}
