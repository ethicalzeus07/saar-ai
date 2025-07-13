import Link from "next/link";
import { cn } from "@/lib/utils";

export default function NavLink({ 
  href, 
  children, 
  className, 
  onClick 
}: { 
  href: string, 
  children: React.ReactNode, 
  className?: string,
  onClick?: () => void 
}) {
    return (
        <Link 
            href={href} 
            prefetch={true}
            className={cn("transition-colors text-lg duration-200 text-primary hover:text-emerald-600", className)}
            onClick={onClick}
        >
            {children}
        </Link>
    );
} 