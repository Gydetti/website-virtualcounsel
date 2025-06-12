'use client';

import type { CSSProperties } from 'react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import LazySection from '@/components/ui/lazy-section';
import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import type { processSectionDataSchema } from '@/lib/schemas/sections.schema';

// Updated props type alias using Zod schema
export type ProcessHorizontalSectionProps = z.infer<typeof processSectionDataSchema>;

export default function ProcessHorizontalSection({
  badgeText,
  heading,
  subtitle,
  steps,
}: ProcessHorizontalSectionProps) {
  const { getElementBorderRadius } = useThemeBorderRadius();

  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <Section id="process-horizontal" className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
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
          {subtitle && (
            <p className="section-subtitle" style={{ '--index': 2 } as CSSProperties}>
              {subtitle}
            </p>
          )}
        </LazySection>

        {/* Horizontal Steps */}
        <div className="relative">
          {/* Connecting line - desktop only */}
          <div className="hidden lg:block absolute top-16 inset-x-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          {/* Steps Grid - card-equal-height for dynamic equal heights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 card-equal-height justify-items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="size-full max-w-sm">
                {/* Step Card - h-full to fill available space, LazySection removed for proper height distribution */}
                <div className="group bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 relative size-full flex flex-col">
                  {/* Step Number Circle */}
                  <div className="flex justify-center mb-4">
                    <div className="size-12 rounded-full flex items-center justify-center text-sm font-bold shadow-lg bg-gradient-to-br from-primary to-primary/80 text-white border-2 border-white relative z-10">
                      {step.number || String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Content - flex-grow to fill available space */}
                  <div className="text-center flex-1 flex flex-col justify-center">
                    <h3 className="text-lg font-bold mb-2 text-foreground">{step.title}</h3>
                    <p className="text-card-description">{step.description}</p>
                  </div>
                </div>

                {/* Mobile connection line */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-6">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-primary/40 to-primary/20" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
