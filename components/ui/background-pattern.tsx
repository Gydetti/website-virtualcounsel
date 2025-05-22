'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { siteConfig } from '@/lib/siteConfig';
import { cn } from '@/lib/utils';

const patternVariants = cva('absolute inset-0 z-0 pointer-events-none', {
  variants: {
    pattern: {
      none: 'hidden',
      dots: 'bg-dots-pattern',
      grid: 'bg-grid-pattern',
      waves: 'bg-waves-pattern',
      noise: 'bg-noise-pattern',
      triangle: 'bg-triangle-pattern',
      crosshatch: 'bg-crosshatch-pattern',
      hex: 'bg-hex-pattern',
    },
    opacity: {
      subtle: 'opacity-[0.025]',
      light: 'opacity-5',
      medium: 'opacity-[0.075]',
      pronounced: 'opacity-10',
    },
    fade: {
      none: '',
      edges: 'mask-gradient-edges',
      top: 'mask-gradient-top',
      bottom: 'mask-gradient-bottom',
    },
  },
  defaultVariants: {
    pattern: 'grid',
    opacity: 'light',
    fade: 'none',
  },
});

export interface BackgroundPatternProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof patternVariants> {
  color?: string;
}

export const BackgroundPattern = forwardRef<HTMLDivElement, BackgroundPatternProps>(
  ({ className, pattern, opacity, fade, color, style, ...props }, ref) => {
    // Get pattern style from site config if available
    const configPattern = siteConfig.theme.visualStyle?.patternStyle || 'none';
    const configOpacity = siteConfig.theme.visualStyle?.patternOpacity || 0.05;

    // Map config pattern string to a valid pattern variant
    // This ensures we normalize any pattern names to match our variant options
    const normalizePattern = (
      patternName: string
    ): VariantProps<typeof patternVariants>['pattern'] => {
      // Map potential legacy pattern names to their new equivalents
      if (patternName === 'triangles') return 'triangle';
      if (patternName === 'hexagons') return 'hex';

      // If it's already a valid pattern name, return it
      if (
        patternName === 'none' ||
        patternName === 'dots' ||
        patternName === 'grid' ||
        patternName === 'waves' ||
        patternName === 'noise' ||
        patternName === 'triangle' ||
        patternName === 'crosshatch' ||
        patternName === 'hex'
      ) {
        return patternName;
      }

      // Default fallback
      return 'grid';
    };

    // Map config to props if not explicitly provided
    const mappedPattern =
      pattern || (configPattern !== 'none' ? normalizePattern(configPattern as string) : 'grid');

    // Custom opacity value from config if not using predefined values
    const customOpacity = opacity ? undefined : configOpacity;

    // Apply color if specified
    const colorStyle = color ? { '--pattern-color': color, ...style } : style;
    // Apply custom numeric opacity from config if no opacity variant prop is passed
    const styleWithOpacity =
      customOpacity !== undefined ? { opacity: customOpacity, ...colorStyle } : colorStyle;

    return (
      <div
        ref={ref}
        className={cn(
          patternVariants({
            pattern: mappedPattern,
            opacity,
            fade,
          }),
          className
        )}
        style={styleWithOpacity}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

BackgroundPattern.displayName = 'BackgroundPattern';
