import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BgGradient from "./bg-gradient";
import { 
  MotionSection, 
  MotionDiv, 
  MotionH2, 
  MotionP, 
  MotionSpan,
  fadeInUp,
  scaleIn
} from "./motion-wrapper";

export default function CTASection() {
  return (
    <BgGradient>
      <MotionSection 
        className="py-16 sm:py-20 lg:py-24"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        <MotionDiv className="container mx-auto px-4 text-center">
          <MotionH2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4 sm:mb-6"
            variants={fadeInUp}
          >
            Ready to Get Started?
          </MotionH2>
          <MotionP 
            className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Join users who are already saving time with Saar-ai summaries.
          </MotionP>
          <Link href="#pricing" prefetch={true} className="flex items-center justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-yellow-400 hover:from-primary hover:to-yellow-400 text-white font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <MotionSpan className="flex items-center gap-2">
                Get Started Now
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </MotionSpan>
            </Button>
          </Link>
        </MotionDiv>
      </MotionSection>
    </BgGradient>
  );
}