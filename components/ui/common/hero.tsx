import Link from "next/link";
import { Button } from "../button";
import { Flame, ArrowRight } from "lucide-react";
import { Badge } from "../badge";

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 animate-in lg:px-12 max-w-7xl">
      <div>
        <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-lime-400 via-yellow-400 to-primary animate-gradient-x group">
          <Badge
            variant="secondary"
            className="relative px-6 py-2 text-base font-medium bg-white rounded-full group hover:bg-yellow-50 transition-colors duration-200 flex items-center"
          >
            <Flame className="h-10 w-10 text-yellow-400 animate-pulse" strokeWidth={3} />
            <p className="text-primary text-lg">Powered by AI</p>
          </Badge>
        </div>
      </div>
      <h1 className="font-bold py-6 text-center">
        Transform Files into{" "}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">Summaries</span>
          <span
            className="absolute inset-0 z-0 rounded-lg bg-gradient-to-r from-yellow-300 via-lime-300 to-yellow-200 opacity-30 blur-sm"
            aria-hidden="true"
          />
        </span>{" "}
        <span className="text-primary font-extrabold bg-gradient-to-r from-lime-400 to-primary bg-clip-text text-transparent animate-pulse">
          {"{saar}"}
        </span>
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl">
        Save your time and get summary reels of your files.
      </h2>
      <div>
        <Button
          variant="link"
          className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-linear-to-r from-yellow-300 to-primary hover:from-primary hover:to-yellow-300 transition-all duration-300 font-bold hover:no-underline shadow-lg"
        >
          <Link href="/upload" className="flex gap-2 items-center">
            <span>Try Saar-ai</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </div>
    </section>
  );
}