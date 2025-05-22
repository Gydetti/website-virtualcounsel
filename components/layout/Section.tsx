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
}

export function Section({
  children,
  className = '',
  fullBleed = true,
  bgClass = '',
  patternStyle,
  patternOpacity,
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
  // Horizontal padding: 1rem base, 1.5rem sm, 2rem md, 5rem xl & above
  const containerClasses = 'container mx-auto px-4 sm:px-6 md:px-8 xl:px-20';
  if (fullBleed) {
    return (
      <section
        className={`overflow-hidden ${sectionPaddingClass} ${bgClass} ${className}`}
        {...rest}
      >
        {/* Render pattern background if requested */}
        {patternStyle !== 'none' && (
          <BackgroundPattern
            pattern={patternStyle as BackgroundPatternProps['pattern']}
            className="absolute inset-0 z-0"
            style={{ opacity: patternOpacity ?? undefined }}
          />
        )}
        <div className={containerClasses}>{children}</div>
      </section>
    );
  }
  return (
    <section
      className={`${sectionPaddingClass} ${containerClasses} overflow-hidden ${bgClass} ${className}`}
      {...rest}
    >
      {/* Render pattern background if requested */}
      {patternStyle !== 'none' && (
        <BackgroundPattern
          pattern={patternStyle as BackgroundPatternProps['pattern']}
          className="absolute inset-0 z-0"
          style={{ opacity: patternOpacity ?? undefined }}
        />
      )}
      {children}
    </section>
  );
}
