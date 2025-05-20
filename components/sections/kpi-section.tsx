'use client';

import type { CSSProperties } from 'react';
import CountUp from 'react-countup';
import type { z } from 'zod';

import LazySection from '@/components/ui/lazy-section';
import type { kpiSectionDataSchema } from '@/lib/schemas/sections.schema';

export type KpiSectionProps = z.infer<typeof kpiSectionDataSchema> & {
  /** Skip wrapper & use default styling when embedding inside AboutSection on homepage */
  embedInAbout?: boolean;
  /** Render with homepage-specific styles */
  isHomepage?: boolean;
  /** Render with About page–specific styles */
  isAboutPage?: boolean;
};

export default function KpiSection({
  stats,
  embedInAbout,
  isHomepage,
  isAboutPage,
}: KpiSectionProps) {
  // Determine section margin based on page context
  const sectionMargin = isAboutPage ? 'mt-0' : isHomepage ? 'mt-0' : 'mt-0';
  // Always use default KPI grid layout for even spreading
  const containerClasses = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8';
  // Card styling: default vs About embed only when not embedInAbout
  const cardClasses = [
    'rounded-xl',
    // Use default KPI styling except when genuinely on About page route and not embedded
    embedInAbout || !isAboutPage
      ? 'bg-neutral-surface border border border-t-4 border-t-primary'
      : 'bg-neutral-background border border-divider',
    'p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center h-full',
  ].join(' ');

  // Grid content for KPI items with CSS-only stagger animation, constrained to 450px on mobile
  const content = (
    <LazySection
      animation="none"
      className={`stagger-container ${containerClasses} w-full max-w-[450px] mx-auto md:max-w-none ${
        isHomepage ? '[--stagger-delay:0.1s] md:[--stagger-delay:0.2s]' : '[--stagger-delay:0.2s]'
      }`}
    >
      {stats.map((stat, index) => (
        <div key={stat.id} className={cardClasses} style={{ '--index': index } as CSSProperties}>
          <div className="text-primary font-bold text-3xl md:text-4xl mb-2">
            <CountUp
              end={stat.value}
              suffix={stat.suffix || ''}
              duration={2.5}
              enableScrollSpy
              scrollSpyDelay={500}
              scrollSpyOnce
              preserveValue
            />
          </div>
          <p className="text-neutral-text text-sm md:text-base m-0">{stat.label}</p>
        </div>
      ))}
    </LazySection>
  );
  // Always wrap KPI content in a padded section for spacing
  if (embedInAbout) {
    return content;
  }
  return (
    <div className={`${sectionMargin} px-4 sm:px-6 md:px-8 xl:px-20 py-8 sm:py-12 md:py-16`}>
      {content}
    </div>
  );
}
