'use client';

import type { CSSProperties } from 'react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import LazySection from '@/components/ui/lazy-section';
import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import type { processSectionDataSchema } from '@/lib/schemas/sections.schema';

// Updated props type alias using Zod schema
export type ProcessSectionProps = z.infer<typeof processSectionDataSchema>;

export default function ProcessSection({
  badgeText,
  heading,
  subtitle,
  steps,
}: ProcessSectionProps) {
  const { getElementBorderRadius } = useThemeBorderRadius();

  if (!steps || steps.length === 0) {
    // Schema enforces min(1) for steps
    return null;
  }

  return (
    <Section id="process" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1000&width=1000')] bg-center opacity-5" />

      {/* Decorative elements */}
      {/* <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl" />
			<div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl" /> */}

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header stagger container (CSS-only) */}
        <LazySection
          animation="none"
          className="stagger-container text-center"
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

        {/* Steps: alternating left-right timeline */}
        <div className="relative">
          {/* Center timeline line */}
          <div className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary/20 to-primary/10 hidden md:block" />

          <div className="space-y-16">
            {steps.map((step, index) => (
              <LazySection
                key={step.id}
                animation="slide-up"
                delay={0.1 + index * 0.1}
                className="relative"
              >
                {/* Mobile circle - visible on mobile only - MOVED TO TOP */}
                <div className="md:hidden flex justify-center mb-6">
                  <div className="size-16 rounded-full flex items-center justify-center text-lg font-bold shadow-lg bg-gradient-to-br from-primary to-primary/80 text-white border-2 border-white">
                    {step.number || String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <div
                  className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}
                >
                  {/* Card */}
                  <div className="group w-full md:w-5/12 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                    {/* Card header with step indicator - hide mobile number since it's now above */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    {step.subtitle && (
                      <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                        {step.subtitle}
                      </div>
                    )}
                    <p className="text-gray-600 leading-relaxed mb-6">{step.description}</p>
                    {step.details && step.details.length > 0 && (
                      <div
                        className={`bg-gray-50 p-5 ${getElementBorderRadius('card')} border-l-4 border-primary/30`}
                      >
                        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                          <div className="size-1.5 bg-primary rounded-full" />
                          What this includes:
                        </h4>
                        <ul className="space-y-2 text-sm">
                          {step.details.slice(0, 3).map(detail => (
                            <li key={detail} className="flex items-start gap-2">
                              <div className="size-1.5 bg-primary/60 rounded-full mt-2 shrink-0" />
                              <span className="text-gray-600">{detail}</span>
                            </li>
                          ))}
                          {step.details.length > 3 && (
                            <li className="text-gray-400 text-xs font-medium mt-2">
                              +{step.details.length - 3} more...
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Center circle - visible on desktop */}
                  <div className="hidden md:flex shrink-0 relative z-10">
                    {/* Connecting line to card */}
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 ${index % 2 === 0 ? '-right-8' : '-left-8'} w-8 h-0.5 ${index % 2 === 0 ? 'bg-gradient-to-r from-primary/40 to-transparent' : 'bg-gradient-to-l from-primary/40 to-transparent'}`}
                    />

                    <div className="size-20 rounded-full flex items-center justify-center text-xl font-bold shadow-xl bg-gradient-to-br from-primary to-primary/80 text-white border-4 border-white relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
                      {/* Subtle shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {step.number || String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block w-5/12" />
                </div>

                {/* Progress indicator for mobile - moved closer to card */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center mt-6">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-primary/40 to-primary/20" />
                  </div>
                )}
              </LazySection>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
