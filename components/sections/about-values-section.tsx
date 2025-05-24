import { Star } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import LazySection from '@/components/ui/lazy-section';
import type { aboutValuesSectionDataSchema } from '@/lib/schemas/sections.schema';

export type AboutValuesSectionProps = z.infer<typeof aboutValuesSectionDataSchema>;

export default function AboutValuesSection({
  badgeText,
  heading,
  values,
}: AboutValuesSectionProps) {
  return (
    <Section id="about-values" className="py-12">
      {/* Header */}
      <div className="text-center mb-12">
        {badgeText && (
          <LazySection animation="fade-up" delay={0.1}>
            <Badge className="mb-4">{badgeText}</Badge>
          </LazySection>
        )}
        {heading && (
          <LazySection animation="fade-up" delay={0.2}>
            <h2 className="text-heading mb-4">{heading}</h2>
          </LazySection>
        )}
      </div>

      {/* Values Grid */}
      <LazySection
        animation="none"
        className="stagger-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        style={{ '--stagger-delay': '0.1s' } as CSSProperties}
      >
        {values.map((value, idx) => (
          <div
            key={value}
            className="bg-neutral-surface/50 border border-border/50 rounded-lg p-6 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-center items-center"
            style={{ '--index': idx } as CSSProperties}
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Star className="size-5 text-primary" />
            </div>
            <p className="text-neutral-text font-medium text-lg leading-relaxed">{value}</p>
          </div>
        ))}
      </LazySection>
    </Section>
  );
}
