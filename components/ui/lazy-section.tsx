"use client";
import type { CSSProperties, ReactNode } from "react";

import { siteConfig } from "@/lib/siteConfig";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface LazySectionProps {
  children: ReactNode;
  /** Intersection threshold (fraction in view) to start animation */
  threshold?: number;
  className?: string;
  /** Inline style for CSS variables or other styles */
  style?: CSSProperties;
  /** Animation style: fade only, slide with fade, zoom, or none */
  animation?:
    | "fade"
    | "fade-up"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right"
    | "zoom"
    | "none";
  delay?: number;
  /** Animation duration in seconds */
  duration?: number;
  fullHeight?: boolean;
}

export default function LazySection({
  children,
  // Start as soon as any part of element is in view
  threshold = 0,
  className = "",
  /** Inline style for CSS variables or other styles */
  style,
  animation = "slide-up",
  delay = 0,
  // Global default duration shortened for snappier feel (reduced from 0.6)
  duration = 0.4,
  fullHeight,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  // Respect users' reduced-motion preference
  const shouldReduceMotion = useReducedMotion();

  // Compute overflow class for slide animations
  const overflowClass =
    animation === "slide-left" || animation === "slide-right"
      ? "overflow-x-hidden"
      : "";

  // Determine whether to fill height: slide-up/down by default, override if prop provided
  const defaultFullHeight =
    animation === "slide-up" || animation === "slide-down";
  const useFullHeight =
    fullHeight !== undefined ? fullHeight : defaultFullHeight;

  // Combined classes for both non-animated and animated containers
  const combinedClass = [
    overflowClass,
    className,
    useFullHeight ? "h-full" : "",
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  // Define animation variants
  const variants = {
    hidden: {
      opacity: 0,
      // For slide-up and fade-up, move up from below with different offsets
      y:
        animation === "slide-up"
          ? 50
          : animation === "fade-up"
            ? 20
            : animation === "slide-down"
              ? -50
              : 0,
      x:
        animation === "slide-left" ? 50 : animation === "slide-right" ? -50 : 0,
      scale: animation === "zoom" ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: "easeOut",
      },
    },
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
  if (animation === "none") {
    return (
      <div
        ref={ref}
        className={`${combinedClass}${isVisible ? " visible" : ""}`}
        style={style}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={combinedClass}
      style={style}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
