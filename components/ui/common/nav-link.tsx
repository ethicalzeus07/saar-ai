import Link from "next/link";
import { cn } from "@/lib/utils";
export default function NavLink({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) {
    return <Link href={href} className={cn("transition-colors text-lg duration-200 text-primary hover:text-lime-400", className)}>{children}</Link>;
} 