import BgGradient from "./bg-gradient";

export default function Footer() {
  return (
    <BgGradient>
      <footer className="w-full py-6 border-t bg-background text-foreground text-center text-sm mt-12">
        <span>
          &copy; {new Date().getFullYear()} Saar-ai. All rights reserved.
        </span>
      </footer>
    </BgGradient>
  );
} 