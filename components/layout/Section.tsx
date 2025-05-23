import type { HTMLAttributes, ReactNode } from 'react';

import type { BackgroundPatternProps } from '@/components/ui/background-pattern';
import { BackgroundPattern } from '@/components/ui/background-pattern';
import { siteConfig } from '@/lib/siteConfig';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** The content of the section */
  children: ReactNode;
  /** If true, renders a full-bleed section with inner container */
  fullBleed?: boolean;
  /** Custom background or utility classes to apply to the section */
  bgClass?: string;
  /** Optional per-section background pattern override */
  patternStyle?: string;
  /** Optional per-section background opacity override */
  patternOpacity?: number;
  /** Optional per-section pattern fade override (none, edges, top, bottom) */
  patternFade?: 'none' | 'edges' | 'top' | 'bottom';
  /** Optional per-section pattern color override (any valid CSS color string) */
  patternColor?: string;
}

export function Section({
  children,
  className = '',
  fullBleed = true,
  bgClass = '',
  patternStyle,
  patternOpacity,
  patternFade,
  patternColor,
  ...rest
}: SectionProps) {
  // Dynamic section padding based on content density (compact, balanced, airy)
  const contentDensity = siteConfig.theme.visualStyle?.contentDensity || 'balanced';
  // Explicit map so Tailwind JIT sees the literal class names
  const paddingMap: Record<'compact' | 'balanced' | 'airy', string> = {
    compact: 'section-padding-compact',
    balanced: 'section-padding-balanced',
    airy: 'section-padding-airy',
  };
  const sectionPaddingClass =
    paddingMap[contentDensity as keyof typeof paddingMap] || paddingMap.balanced;
  // Only apply section pattern when patternStyle prop is provided; default to none
  const usedPatternStyle = patternStyle ?? 'none';
  // Fallback to global patternOpacity only when a per-section style override exists
  const usedPatternOpacity = patternStyle
    ? (patternOpacity ?? siteConfig.theme.visualStyle?.patternOpacity)
    : undefined;
  const usedPatternFade = patternFade ?? 'none';
  const usedPatternColor = patternColor;
  // Center content, cap width to theme value and apply dynamic gutters
  const containerClasses =
    'mx-auto max-w-[var(--container-max-width)] px-4 sm:px-6 md:px-8 xl:px-20';
  // Wrapper classes including vertical padding and background
  const wrapperClasses = `overflow-hidden ${sectionPaddingClass} ${bgClass} ${className}`.trim();
  if (fullBleed) {
    return (
      <section className={wrapperClasses} {...rest}>
        {/* Render pattern background if requested */}
        {usedPatternStyle !== 'none' && (
          <BackgroundPattern
            pattern={usedPatternStyle as BackgroundPatternProps['pattern']}
            fade={usedPatternFade as BackgroundPatternProps['fade']}
            color={usedPatternColor}
            className="absolute inset-0 z-0"
            style={{ opacity: usedPatternOpacity }}
          />
        )}
        <div className={containerClasses}>{children}</div>
      </section>
    );
  }
  return (
    <section className={wrapperClasses} {...rest}>
      {/* Render pattern background if requested */}
      {usedPatternStyle !== 'none' && (
        <BackgroundPattern
          pattern={usedPatternStyle as BackgroundPatternProps['pattern']}
          fade={usedPatternFade as BackgroundPatternProps['fade']}
          color={usedPatternColor}
          className="absolute inset-0 z-0"
          style={{ opacity: usedPatternOpacity }}
        />
      )}
      <div className={containerClasses}>{children}</div>
    </section>
  );
}
