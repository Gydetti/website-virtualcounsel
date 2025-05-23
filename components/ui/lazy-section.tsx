'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import { siteConfig } from '@/lib/siteConfig';

interface LazySectionProps {
  children: ReactNode;
  /** Intersection threshold (fraction in view) to start animation */
  threshold?: number;
  className?: string;
  /** Inline style for CSS variables or other styles */
  style?: CSSProperties;
  /** Animation style: fade only, slide with fade, zoom, or none */
  animation?:
    | 'fade'
    | 'fade-up'
    | 'slide-up'
    | 'slide-down'
    | 'slide-left'
    | 'slide-right'
    | 'zoom'
    | 'none';
  delay?: number;
  /** Animation duration in seconds */
  duration?: number;
  fullHeight?: boolean;
  /** Animation easing function to use from CSS variables */
  easingFunction?: 'smooth' | 'bounce' | 'in-out' | string;
  /** Animation intensity controls distance and scale */
  intensity?: 'subtle' | 'moderate' | 'pronounced';
  /** Enable will-change for performance optimization */
  willChange?: boolean;
  /** Apply staggered delays to direct children */
  childrenStagger?: boolean;
  /** Delay between each staggered child in seconds */
  childrenStaggerDelay?: number;
}

export default function LazySection({
  children,
  // Start as soon as any part of element is in view
  threshold = 0,
  className = '',
  /** Inline style for CSS variables or other styles */
  style,
  animation = 'slide-up',
  delay = 0,
  // Global default duration shortened for snappier feel (reduced from 0.6)
  duration = 0.4,
  fullHeight,
  // Use global theme animation defaults
  easingFunction = siteConfig.theme.animation?.style ?? 'smooth',
  intensity = siteConfig.theme.animation?.intensity ?? 'moderate',
  // Enable will-change for smooth GPU-accelerated animations
  willChange = true,
  // Enable staggered children based on global feature flag
  childrenStagger = siteConfig.features.enableStaggeredAnimations,
  childrenStaggerDelay = 0.1,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  // Respect users' reduced-motion preference
  const shouldReduceMotion = useReducedMotion();

  // Compute overflow class for slide animations
  const overflowClass =
    animation === 'slide-left' || animation === 'slide-right' ? 'overflow-x-hidden' : '';

  // Determine whether to fill height: slide-up/down by default, override if prop provided
  const defaultFullHeight = animation === 'slide-up' || animation === 'slide-down';
  const useFullHeight = fullHeight !== undefined ? fullHeight : defaultFullHeight;

  // Map intensity to pixels/scale values for animations
  const getIntensityValue = () => {
    // For slide/fade animations, control the distance moved
    if (animation === 'slide-up' || animation === 'slide-down' || animation === 'fade-up') {
      return intensity === 'subtle' ? 10 : intensity === 'moderate' ? 20 : 40;
    }

    // For slide left/right, control horizontal distance
    if (animation === 'slide-left' || animation === 'slide-right') {
      return intensity === 'subtle' ? 20 : intensity === 'moderate' ? 50 : 100;
    }

    // For zoom animations, control scale difference
    if (animation === 'zoom') {
      return intensity === 'subtle' ? 0.98 : intensity === 'moderate' ? 0.95 : 0.9;
    }

    return 0;
  };

  // Map easing function name to cubic-bezier arrays for Framer Motion
  const easingMap: Record<string, [number, number, number, number]> = {
    smooth: [0.645, 0.045, 0.355, 1],
    bounce: [0.175, 0.885, 0.32, 1.275],
    'in-out': [0.42, 0, 0.58, 1],
    out: [0.25, 0.46, 0.45, 0.94],
    energetic: [0.23, 1, 0.32, 1],
  };
  const getEasingVariable = (): [number, number, number, number] => {
    return easingMap[easingFunction] ?? easingMap.out;
  };

  // Get animation duration based on siteConfig if available
  const getAnimationDuration = () => {
    // If explicitly provided, use that
    if (duration) return duration;

    // Otherwise try to get from site config
    const configSpeed = siteConfig.theme.animation?.speed || 'balanced';

    // Map speed setting to duration in seconds
    if (configSpeed === 'fast') return 0.15;
    if (configSpeed === 'slow') return 0.5;
    // Default balanced speed
    return 0.3;
  };

  // Combined classes for both non-animated and animated containers
  const combinedClass = [
    overflowClass,
    className,
    useFullHeight ? 'h-full' : '',
    willChange ? 'will-change-transform' : '',
  ]
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  // Calculate intensity value for animations
  const intensityValue = getIntensityValue();
  const calculatedDuration = getAnimationDuration();

  // Define animation variants
  const variants = {
    hidden: {
      opacity: 0,
      // For slide-up and fade-up, move up from below with different offsets
      y:
        animation === 'slide-up'
          ? intensityValue
          : animation === 'fade-up'
            ? intensityValue / 2
            : animation === 'slide-down'
              ? -intensityValue
              : 0,
      x:
        animation === 'slide-left'
          ? intensityValue
          : animation === 'slide-right'
            ? -intensityValue
            : 0,
      scale: animation === 'zoom' ? intensityValue : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: calculatedDuration,
        delay: delay,
        ease: getEasingVariable(),
      },
    },
  };

  // For staggered children animations
  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + i * childrenStaggerDelay,
        duration: calculatedDuration * 0.8, // slightly faster than parent
        ease: getEasingVariable(),
      },
    }),
  };

  // If reduced-motion is requested or animations globally disabled, render children without motion
  if (shouldReduceMotion || !siteConfig.features.enableStaggeredAnimations) {
    return (
      <div ref={ref} className={combinedClass} style={style}>
        {children}
      </div>
    );
  }

  // CSS-only: animation="none" toggles 'visible' class for intersection-triggered CSS animations
  if (animation === 'none') {
    return (
      <div ref={ref} className={`${combinedClass}${isVisible ? ' visible' : ''}`} style={style}>
        {children}
      </div>
    );
  }

  // If staggered children are enabled and visible
  if (childrenStagger) {
    return (
      <motion.div
        ref={ref}
        className={combinedClass}
        style={style}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        {React.Children.map(children, (child, i) => (
          <motion.div
            custom={i}
            variants={childVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Standard animation
  return (
    <motion.div
      ref={ref}
      className={combinedClass}
      style={style}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
