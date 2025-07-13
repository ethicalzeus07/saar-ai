'use client'
import { motion } from 'motion/react';

// Enhanced motion components with better typing
export const MotionDiv = motion.div;
export const MotionSection = motion.section;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionH3 = motion.h3;
export const MotionH4 = motion.h4;
export const MotionP = motion.p;
export const MotionSpan = motion.span;
export const MotionNav = motion.nav;
export const MotionButton = motion.button;
export const MotionCard = motion.div;
export const MotionLink = motion.a;
export const MotionImg = motion.img;
export const MotionUl = motion.ul;
export const MotionLi = motion.li;
export const MotionForm = motion.form;
export const MotionInput = motion.input;
export const MotionTextarea = motion.textarea;
export const MotionLabel = motion.label;

// Modern easing functions for smoother animations
const easeOutExpo = [0.19, 1, 0.22, 1];
const easeOutBack = [0.175, 0.885, 0.32, 1.275];
const easeOutQuart = [0.25, 0.46, 0.45, 0.94];
const easeInOutCubic = [0.65, 0, 0.35, 1];

// Enhanced fade animations with better timing
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOutExpo }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOutExpo }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: easeOutExpo }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: easeOutExpo }
};

// Enhanced scale animations
export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: easeOutBack }
};

export const scaleInHover = {
  initial: { scale: 1 },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2, ease: easeOutQuart }
};

// Modern slide animations
export const slideInUp = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.7, ease: easeOutExpo }
};

export const slideInDown = {
  initial: { y: -100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.7, ease: easeOutExpo }
};

// Rotate animations
export const rotateIn = {
  initial: { opacity: 0, rotate: -180, scale: 0.3 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  transition: { duration: 0.8, ease: easeOutBack }
};

export const rotateInHover = {
  initial: { rotate: 0 },
  whileHover: { rotate: 360 },
  transition: { duration: 0.6, ease: easeInOutCubic }
};

// Bounce animations
export const bounceIn = {
  initial: { opacity: 0, scale: 0.3 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      duration: 0.6
    }
  }
};

export const bounceInUp = {
  initial: { opacity: 0, y: 60, scale: 0.3 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
      duration: 0.7
    }
  }
};

// Flip animations
export const flipInX = {
  initial: { opacity: 0, rotateX: -90 },
  animate: { opacity: 1, rotateX: 0 },
  transition: { duration: 0.8, ease: easeOutBack }
};

export const flipInY = {
  initial: { opacity: 0, rotateY: -90 },
  animate: { opacity: 1, rotateY: 0 },
  transition: { duration: 0.8, ease: easeOutBack }
};

// Elastic animations
export const elasticIn = {
  initial: { opacity: 0, scale: 0.3 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      damping: 8,
      stiffness: 100,
      duration: 0.8
    }
  }
};

// Stagger animations for lists and grids
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerFast = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

export const staggerSlow = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2
    }
  }
};

// Hover animations
export const hoverLift = {
  initial: { y: 0, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
  whileHover: { 
    y: -8, 
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3, ease: easeOutQuart }
  },
  whileTap: { 
    y: -4, 
    transition: { duration: 0.1 }
  }
};

export const hoverGlow = {
  initial: { 
    boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)" 
  },
  whileHover: { 
    boxShadow: "0 0 0 8px rgba(59, 130, 246, 0.1)",
    transition: { duration: 0.3, ease: easeOutQuart }
  }
};

// Page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: easeOutExpo }
};

// Loading animations
export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: easeInOutCubic
    }
  }
};

export const shimmer = {
  animate: {
    x: ["-100%", "100%"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Attention-grabbing animations
export const attention = {
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.6,
      ease: easeOutBack
    }
  }
};

export const wiggle = {
  animate: {
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.5,
      ease: easeOutQuart
    }
  }
};

// Utility function for combining animations
export const combineVariants = (...variants: Record<string, unknown>[]) => {
  return variants.reduce((combined, variant) => ({
    ...combined,
    ...variant
  }), {});
};
