import type { CSSProperties } from 'react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import LazySection from '@/components/ui/lazy-section';
import type { servicesOverviewSectionDataSchema } from '@/lib/schemas/sections.schema';
import { siteConfig } from '@/lib/siteConfig';
import { cn } from '@/lib/utils';

export type ServicesOverviewSectionProps = z.infer<typeof servicesOverviewSectionDataSchema>;

export default function ServicesOverviewSection({
  badgeText,
  heading,
  description,
}: ServicesOverviewSectionProps) {
  // Get header configuration to add extra padding if transparent mode is enabled
  const headerConfig = siteConfig.theme.headerConfig;
  const isTransparentHeader = headerConfig?.transparentMode ?? false;
  const heroTopPadding = headerConfig?.heroTopPadding ?? 'pt-20 md:pt-24 lg:pt-28';

  return (
    <Section
      id="services-overview"
      bgClass={siteConfig.sectionStyles?.heroGradient ?? ''}
      className={cn('relative z-10', isTransparentHeader && heroTopPadding)}
    >
      <LazySection
        animation="none"
        className="stagger-container text-center max-w-3xl mx-auto"
        style={{ '--stagger-delay': '0.1s' } as CSSProperties}
      >
        {badgeText && (
          <Badge className="mb-4" style={{ '--index': 0 } as CSSProperties}>
            {badgeText}
          </Badge>
        )}
        {heading && (
          <h1 className="mb-4" style={{ '--index': 1 } as CSSProperties}>
            {heading}
          </h1>
        )}
        {description && (
          <p className="text-neutral-text mb-8" style={{ '--index': 2 } as CSSProperties}>
            {description}
          </p>
        )}
      </LazySection>
    </Section>
  );
}
