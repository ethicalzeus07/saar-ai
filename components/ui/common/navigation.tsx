'use client';

import NavLink from "@/components/ui/common/nav-link";
import { Shredder, Menu, X } from 'lucide-react';
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { 
  MotionNav, 
  MotionDiv, 
  MotionSpan, 
  MotionButton,
  fadeInDown,
  fadeInUp,
  scaleIn
} from '@/components/ui/common/motion-wrapper';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <MotionNav 
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-lime-200/50 shadow-sm"
      variants={fadeInDown}
      initial="initial"
      animate="animate"
    >
      <MotionDiv className="container mx-auto px-4 sm:px-6 lg:px-8">
        <MotionDiv className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Logo Section */}
          <MotionDiv className="flex items-center" variants={scaleIn}>
            <NavLink href="/" className="flex items-center gap-2 shrink-0">
              <Shredder className="h-6 w-6 sm:h-7 sm:w-7 lg:w-8 lg:h-8 text-primary hover:-translate-y-1 transition-transform duration-300 ease-bounce" />
              <MotionSpan className="font-extrabold text-lg sm:text-xl lg:text-2xl text-primary">
                Saar-ai
              </MotionSpan>
            </NavLink>
          </MotionDiv>

          {/* Desktop Navigation */}
          <MotionDiv className="hidden lg:flex flex-1 justify-center items-center" variants={fadeInUp}>
            <SignedIn>
              <NavLink href="/upload/dashboard" className="font-bold text-lg lg:text-xl text-primary drop-shadow py-2 px-4 rounded-lg hover:bg-lime-50 transition-colors">
                Your Saar&apos;s
              </NavLink>
            </SignedIn>
          </MotionDiv>

          {/* Desktop Right Section */}
          <MotionDiv className="hidden lg:flex items-center gap-4" variants={fadeInUp}>
            <SignedIn>
              <Link href="/upload" prefetch={true}>
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-primary to-yellow-400 hover:from-primary hover:to-yellow-400 hover:scale-105 transition-all duration-300 text-white font-semibold rounded-full text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3 flex items-center gap-2 shadow-lg focus-visible:ring-2 focus-visible:ring-primary/70 min-h-[44px] min-w-[44px]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" className="w-4 h-4 lg:w-5 lg:h-5" aria-hidden="true">
                    <path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clipRule="evenodd" fill="#fff" fillRule="evenodd"/>
                  </svg>
                  <MotionSpan className="hidden sm:inline">Upload a PDF</MotionSpan>
                  <MotionSpan className="sm:hidden">Upload</MotionSpan>
                </Button>
              </Link>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <NavLink href="/sign-in" className="text-base lg:text-lg font-medium">Sign In</NavLink>
            </SignedOut>
          </MotionDiv>

          {/* Mobile Menu Button */}
          <MotionDiv className="lg:hidden" variants={scaleIn}>
            <MotionButton
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 rounded-lg hover:bg-lime-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-primary" />
              ) : (
                <Menu className="h-6 w-6 text-primary" />
              )}
            </MotionButton>
          </MotionDiv>
        </MotionDiv>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <MotionDiv 
            className="lg:hidden border-t border-lime-200/50 bg-white/95 backdrop-blur-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MotionDiv className="px-4 py-6 space-y-4">
              <SignedIn>
                <MotionDiv className="flex flex-col space-y-4">
                  <NavLink 
                    href="/upload/dashboard" 
                    className="font-bold text-lg text-primary py-4 px-4 rounded-lg hover:bg-lime-50 transition-colors min-h-[48px] flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Your Saar&apos;s
                  </NavLink>
                  <Link href="/upload" prefetch={true} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant="default"
                      className="w-full bg-gradient-to-r from-primary to-yellow-400 hover:from-primary hover:to-yellow-400 text-white font-semibold rounded-lg py-4 flex items-center justify-center gap-3 shadow-lg min-h-[48px]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" className="w-5 h-5" aria-hidden="true">
                        <path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clipRule="evenodd" fill="#fff" fillRule="evenodd"/>
                      </svg>
                      Upload a PDF
                    </Button>
                  </Link>
                  <MotionDiv className="flex justify-center pt-4">
                    <UserButton />
                  </MotionDiv>
                </MotionDiv>
              </SignedIn>
              <SignedOut>
                <NavLink 
                  href="/sign-in" 
                  className="block text-lg font-medium py-4 px-4 rounded-lg hover:bg-lime-50 transition-colors min-h-[48px] flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </NavLink>
              </SignedOut>
            </MotionDiv>
          </MotionDiv>
        )}
      </MotionDiv>
    </MotionNav>
  );
} 