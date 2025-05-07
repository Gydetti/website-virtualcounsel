"use client";
import React from "react";
type AnyProps = Record<string, unknown>;

// Generic Passthrough component that simply renders a DOM element or React component without animation
function passthrough(tag: keyof JSX.IntrinsicElements | React.ComponentType<any>) {
  return React.forwardRef<any, AnyProps>(function Passthrough(
    { children, ...rest }: AnyProps,
    ref,
  ) {
    const Element: any = tag;
    return (
      <Element ref={ref} {...rest}>
        {children}
      </Element>
    );
  });
}

// Create a proxy so any requested element on motion (e.g., motion.div, motion.span) returns a passthrough
export const motion: any = new Proxy(
  {},
  {
    get: (_target, prop: string) => passthrough(prop as any),
  },
);

// Stub AnimatePresence that simply renders its children
export const AnimatePresence: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <>{children}</>;

// Provide dummy variants/transition helpers to avoid runtime crashes if spread
export const m = motion;
export const useMotionValue = () => 0;
export const useTransform = () => 0;
export const useSpring = () => 0;
export const useScroll = () => ({ scrollY: { onChange: () => {} } });

export default {
  motion,
  AnimatePresence,
}; 