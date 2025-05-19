'use client';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import LazySection from '@/components/ui/lazy-section';
import type { valuePropSectionDataSchema } from '@/lib/schemas/sections.schema';
import { CheckCircle } from 'lucide-react';
import type { CSSProperties, ComponentType, SVGProps } from 'react';
import type { z } from 'zod';

// Updated props type alias using Zod schema
export type ValuePropSectionProps = z.infer<typeof valuePropSectionDataSchema>;

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  'check-circle': CheckCircle,
  // Add more icons as needed
};

export default function ValuePropSection({
  badgeText,
  heading,
  subheading,
  benefits,
}: ValuePropSectionProps) {
  if (!benefits || benefits.length === 0) {
    // Schema enforces min(1), but good practice for robustness
    return null;
  }

  return (
    <Section id="value-prop-section" className="bg-gradient-to-b from-white/70 to-white/0">
      {/* Header stagger container */}
      <LazySection
        animation="none"
        className="stagger-container text-center mb-16"
        style={{ '--stagger-delay': '0.1s' } as CSSProperties}
      >
        {badgeText && (
          <Badge className="mb-4" style={{ '--index': 0 } as CSSProperties}>
            {badgeText}
          </Badge>
        )}
        {heading && (
          <h2 className="section-title" style={{ '--index': 1 } as CSSProperties}>
            {heading}
          </h2>
        )}
        {subheading && (
          <p className="section-subtitle" style={{ '--index': 2 } as CSSProperties}>
            {subheading}
          </p>
        )}
      </LazySection>
      {/* Benefits grid stagger container */}
      <LazySection
        animation="none"
        className="stagger-container grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3"
        style={{ '--stagger-delay': '0.2s' } as CSSProperties}
      >
        {benefits.map((benefit, idx) => {
          const Icon = iconMap[benefit.icon as keyof typeof iconMap] ?? CheckCircle;
          return (
            <div
              key={benefit.id}
              className="flex flex-col items-start space-y-3 rounded-lg p-6 shadow-sm hover:shadow-md"
              style={{ '--index': idx } as CSSProperties}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(var(--primary-rgb),0.1)] text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{benefit.title}</h3>
              <p className="text-neutral-text/500">{benefit.description}</p>
            </div>
          );
        })}
      </LazySection>
    </Section>
  );
}
