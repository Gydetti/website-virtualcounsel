'use client';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import LazySection from '@/components/ui/lazy-section';
import type { servicesOverviewSectionDataSchema } from '@/lib/schemas/sections.schema';
import { siteConfig } from '@/lib/site.config.local';
import { cn } from '@/lib/utils';

export type ServicesOverviewSectionProps = z.infer<typeof servicesOverviewSectionDataSchema> & {
  bgClass?: string;
};

export default function ServicesOverviewSection({
  badgeText,
  heading,
  description,
  bgClass,
}: ServicesOverviewSectionProps) {
  // Get header configuration to add extra padding if transparent mode is enabled
  const headerConfig = siteConfig.theme.headerConfig;
  const isTransparentHeader = headerConfig?.transparentMode ?? false;
  const heroTopPadding = headerConfig?.heroTopPadding ?? 'pt-20 md:pt-24 lg:pt-28';

  return (
    <Section
      id="services-overview"
      bgClass={bgClass || siteConfig.sectionStyles?.heroGradient || ''}
      className={cn('relative z-10', isTransparentHeader && heroTopPadding)}
    >
      <LazySection animation="slide-up" delay={0} childrenStagger={false}>
        <div className="text-center max-w-4xl mx-auto">
          {badgeText && <Badge className="mb-4">{badgeText}</Badge>}
          {heading && <h1 className="mb-6">{heading}</h1>}
          {description && <p className="text-neutral-text max-w-3xl mx-auto">{description}</p>}
        </div>
      </LazySection>
    </Section>
  );
}
