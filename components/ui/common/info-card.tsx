import { Info } from "lucide-react";
import { 
  MotionDiv, 
  MotionH3, 
  MotionP, 
  MotionSpan,
  scaleIn
} from "./motion-wrapper";

export default function InfoCard() {
  return (
    <MotionDiv 
      className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 max-w-md mx-auto animate-in fade-in duration-500"
      variants={scaleIn}
      initial="initial"
      animate="animate"
    >
      <MotionDiv className="flex items-start gap-3">
        <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <MotionDiv>
          <MotionH3 className="font-semibold text-gray-900 text-sm mb-1">Why the name Saar-ai?</MotionH3>
          <MotionP className="text-gray-700 text-xs leading-relaxed">
            <MotionSpan className="font-medium text-primary">&ldquo;Saar&rdquo;</MotionSpan> is a Hindi word (सार) meaning{" "}
            <MotionSpan className="italic">essence</MotionSpan> and <MotionSpan className="italic">summary</MotionSpan>. 
            That&apos;s where Saar AI gets its name from - we extract the essence of your PDF&apos;s for you!
          </MotionP>
        </MotionDiv>
      </MotionDiv>
    </MotionDiv>
  );
} 