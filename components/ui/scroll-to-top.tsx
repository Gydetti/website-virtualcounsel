'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [toggleVisibility]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            variant="clean"
            className={cn(
              'inline-flex items-center justify-center gap-2',
              'size-12 rounded-full bg-transparent hover:bg-transparent',
              'shadow-lg border border-primary',
              'transition-transform hover:-translate-y-0.5 active:translate-y-0.5'
            )}
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ArrowUp className="size-6 text-primary" strokeWidth={1} />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
