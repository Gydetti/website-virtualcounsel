import { useState, useEffect, useRef } from 'react';

type Direction = 'up' | 'down';

interface Options {
  downThreshold?: number;
  upThreshold?: number;
  topThreshold?: number;
}

// Hook to track if the page is scrolled to top and the scroll direction
export default function useScrollDirection({
  downThreshold = 5,
  upThreshold = 20,
  topThreshold = 0,
}: Options = {}) {
  const [atTop, setAtTop] = useState(true);
  const [direction, setDirection] = useState<Direction>('up');
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.pageYOffset;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setAtTop(y <= topThreshold);
          if (y > lastY.current + downThreshold) {
            setDirection('down');
          } else if (lastY.current > y + upThreshold) {
            setDirection('up');
          }
          lastY.current = y;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [downThreshold, upThreshold, topThreshold]);

  return { atTop, direction };
}
