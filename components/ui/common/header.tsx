import NavLink from "./nav-link";
import { Shredder } from 'lucide-react';
import { Button } from "../button";
import Link from "next/link";
import BgGradient from "./bg-gradient";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export default function Header() {
    return (
        <BgGradient>
            <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto" >
                {/* Logo Section */}
                <div className="flex lg:flex-1">
                    <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
                        <Shredder className="h-6 w-6 lg:w-8 lg:h-8 text-primary hover:-translate-y-2 transition-transform duration-300 ease-bounce" />
                        <span className="font-extrabold lg:text-xl text-primary">
                            Saar-ai
                        </span>
                    </NavLink>
                </div>

                {/* Center Navigation */}
                <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
                    <NavLink href="/#pricing">Pricing</NavLink>
                    <SignedIn>
                        <NavLink href="/dashboard">Your Saars</NavLink>
                    </SignedIn>
                </div>

                {/* Auth Section */}
                <div className="flex lg:flex-1 justify-end items-center gap-3">
                    <SignedOut>
                        <div className="flex items-center gap-3">
                            <SignInButton>
                                <Button className="bg-gradient-to-r from-yellow-400 to-primary text-white rounded-full font-medium text-sm h-9 px-4 hover:opacity-90 transition-all">
                                    Sign In
                                </Button>
                            </SignInButton>
                            <SignUpButton>
                                <Button className="bg-gradient-to-r from-yellow-400 to-primary text-white rounded-full font-medium text-sm h-9 px-4 hover:opacity-90 transition-all">
                                    Sign Up
                                </Button>
                            </SignUpButton>
                        </div>
                    </SignedOut>
                    
                    <SignedIn>
                        <div className="flex gap-3 items-center">
                            <Link href="/upload" prefetch={true}>
                                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
                                    Upload File
                                </Button>
                            </Link>
                            <UserButton 
                                appearance={{
                                    elements: {
                                      avatarBox: "w-8 h-8 lg:w-9 lg:h-9",
                                    }
                                }}
                            />
                        </div>
                    </SignedIn>
                </div>
            </nav>
        </BgGradient>
    );
}