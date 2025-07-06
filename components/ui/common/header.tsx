import NavLink from "./nav-link";
import { Shredder } from 'lucide-react';
import { Button } from "../button";

export default function Header() {
    const isLoggedIn = false;
    return (
        <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto" >
            <div className="flex lg:flex-1">
                <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
                    <Shredder className="h-6 w-6 lg:w-8 lg:h-8 text-primary hover:-translate-y-2 transition-transform duration-300 ease-bounce" />
                    <span className="font-extrabold lg:text-xl text-primary">
                        Saar-ai
                    </span>
                </NavLink>
            </div>
            <div className="flex lg:justify center gap-4 lg:gap-12 lg:items-center">
                <NavLink href="/#pricing">Pricing</NavLink>
                {isLoggedIn && <NavLink href="/dashboard">Your Saars</NavLink>}
            </div>
            <div className="flex lg:flex-1 justify-end">
                {isLoggedIn ? (
                    <div className="flex gap-2 items-center">
                        <NavLink href="/upload">Upload File</NavLink>
                        <div>OG</div>
                        <Button>User</Button>
                    </div>
                ) : (
                    <div>
                        <NavLink href="/sign-in">Sign In</NavLink>
                    </div>
                )}
            </div>
        </nav>
    );
} 