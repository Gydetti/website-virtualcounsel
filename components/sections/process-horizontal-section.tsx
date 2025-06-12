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

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <LazySection
                key={step.id}
                animation="slide-up"
                delay={0.1 + index * 0.1}
                className="relative"
              >
                {/* Step Card */}
                <div className="group bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 relative">
                  {/* Step Number Circle */}
                  <div className="flex justify-center mb-4">
                    <div className="size-12 rounded-full flex items-center justify-center text-sm font-bold shadow-lg bg-gradient-to-br from-primary to-primary/80 text-white border-2 border-white relative z-10">
                      {step.number || String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-lg font-bold mb-2 text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{step.description}</p>

                    {/* Key Details - Show max 2 for horizontal layout */}
                    {step.details && step.details.length > 0 && (
                      <div
                        className={`bg-gray-50 p-3 ${getElementBorderRadius('card')} border-l-4 border-primary/30`}
                      >
                        <ul className="space-y-1 text-xs text-left">
                          {step.details.slice(0, 2).map(detail => (
                            <li key={detail} className="flex items-start gap-2">
                              <div className="size-1 bg-primary/60 rounded-full mt-1.5 shrink-0" />
                              <span className="text-gray-700">{detail}</span>
                            </li>
                          ))}
                          {step.details.length > 2 && (
                            <li className="text-gray-500 text-xs font-medium mt-1 text-center">
                              +{step.details.length - 2} meer...
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Connecting Arrow - desktop only */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 -right-3 -translate-y-1/2 z-20">
                      <div className="size-6 flex items-center justify-center">
                        <svg
                          className="size-4 text-primary/60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile connection line */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-6">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-primary/40 to-primary/20" />
                  </div>
                )}
              </LazySection>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <LazySection animation="slide-up" delay={0.6} className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-8 rounded-xl border border-primary/10">
            <p className="text-lg font-medium text-gray-700 mb-4">
              Klaar om te beginnen met juridische zekerheid voor uw ICT-bedrijf?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Plan een kennismaking
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors"
              >
                Bekijk alle diensten
              </a>
            </div>
          </div>
        </LazySection>
      </div>
    </Section>
  );
}
