import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2">
            Ready to Save Hours of Reading Time?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Transform lengthy documents into clear, actionable insights with our AI-powered summarizer.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <Button
            variant="link"
            className="rounded-full px-8 py-4 text-lg font-bold bg-gradient-to-r from-primary to-yellow-400 text-white shadow-lg hover:opacity-90 transition"
            asChild
          >
            <Link href="#pricing" className="flex items-center">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
