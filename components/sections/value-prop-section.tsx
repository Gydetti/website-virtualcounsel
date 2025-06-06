'use client';

import { CheckCircle } from 'lucide-react';
import type { ComponentType, CSSProperties, SVGProps } from 'react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import LazySection from '@/components/ui/lazy-section';
import type { valuePropSectionDataSchema } from '@/lib/schemas/sections.schema';

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
        {heading && <h2 style={{ '--index': 1 } as CSSProperties}>{heading}</h2>}
        {subheading && (
          <p className="section-subtitle" style={{ '--index': 2 } as CSSProperties}>
            {subheading}
          </p>
        )}
      </LazySection>
      {/* Benefits grid stagger container */}
      <LazySection
        animation="none"
        className="stagger-container grid grid-cols-1 gap-6 mt-16 md:grid-cols-2 lg:grid-cols-3 justify-items-center card-equal-height max-w-6xl mx-auto"
        style={{ '--stagger-delay': '0.2s' } as CSSProperties}
      >
        {benefits.map((benefit, idx) => {
          const Icon = iconMap[benefit.icon as keyof typeof iconMap] ?? CheckCircle;
          const isLastOdd = benefits.length % 2 === 1 && idx === benefits.length - 1;
          if (isLastOdd) {
            return (
              <div
                key={benefit.id}
                className="md:col-span-2 md:flex md:justify-center lg:col-span-1 lg:block size-full max-w-sm"
                style={{ '--index': idx } as CSSProperties}
              >
                <Card className="flex flex-col items-center text-center space-y-3 p-6 hover:shadow-md transition-shadow size-full">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-xl font-bold">{benefit.title}</h3>
                  <p className="text-card-description">{benefit.description}</p>
                </Card>
              </div>
            );
          }
          return (
            <div
              key={benefit.id}
              className="size-full max-w-sm"
              style={{ '--index': idx } as CSSProperties}
            >
              <Card className="flex flex-col items-center text-center space-y-3 p-6 hover:shadow-md transition-shadow size-full">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-xl font-bold">{benefit.title}</h3>
                <p className="text-card-description">{benefit.description}</p>
              </Card>
            </div>
          );
        })}
      </LazySection>
    </Section>
  );
}
