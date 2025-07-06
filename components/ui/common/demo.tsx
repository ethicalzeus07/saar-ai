import { Rabbit, FileText, ChevronLeft, ChevronRight } from "lucide-react";

export default function DemoSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12 flex flex-col items-center justify-center">
        {/* Top Icon */}
        <div className="mb-6">
          <Rabbit className="h-10 w-10 text-primary drop-shadow-lg animate-pulse" />
        </div>
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-2">
          Watch how <span className="text-primary font-extrabold">Saar-ai</span> transforms{" "}
          <span className="bg-gradient-to-r from-lime-400 via-yellow-400 to-primary bg-clip-text text-transparent font-extrabold">
            this Next.js course PDF
          </span>{" "}
          into an easy-to-read summary!
        </h2>
        {/* Card */}
        <div className="relative w-full max-w-2xl mt-8 rounded-3xl bg-white/90 shadow-xl border border-primary/20">
          {/* Top progress bar */}
          <div className="flex gap-2 px-6 pt-6 pb-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full flex-1 ${i === 0 ? "bg-primary" : "bg-primary/20"}`}
              />
            ))}
          </div>
          {/* Card Content */}
          <div className="px-8 py-8">
            <h3 className="text-xl font-bold text-center mb-6 text-primary">Quick Overview</h3>
            <div className="rounded-xl bg-gradient-to-r from-lime-50 via-orange-50 to-primary/10 px-4 py-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-gray-700">
                Comprehensive Next.js 15 course covering everything from fundamentals to advanced deployment strategies.
              </span>
            </div>
          </div>
          {/* Navigation */}
          <div className="flex items-center justify-between px-8 pb-6">
            <button className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/30 transition">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex gap-1">
              {[...Array(8)].map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full ${i === 0 ? "bg-primary" : "bg-primary/20"}`}
                />
              ))}
            </div>
            <button className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary/80 transition">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}