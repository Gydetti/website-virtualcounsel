'use client';
import { siteConfig } from '@/lib/siteConfig';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export default function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { enablePageTransitions, pageTransitionVariant } = siteConfig.features;
  const shouldReduceMotion = useReducedMotion();

  const pageVariants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.3 } },
      exit: { opacity: 0, transition: { duration: 0.2 } },
    },
    slide: {
      initial: { x: 300, opacity: 0 },
      animate: { x: 0, opacity: 1, transition: { duration: 0.3 } },
      exit: { x: -300, opacity: 0, transition: { duration: 0.2 } },
    },
    cover: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
      exit: { scale: 0.8, opacity: 0, transition: { duration: 0.2 } },
    },
  };

  // If page transitions are disabled or user prefers reduced motion, render children directly
  if (!enablePageTransitions || shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        className="flex-1"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants[pageTransitionVariant]}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
