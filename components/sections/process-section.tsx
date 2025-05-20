'use client';

import type { CSSProperties } from 'react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import LazySection from '@/components/ui/lazy-section';
import type { processSectionDataSchema } from '@/lib/schemas/sections.schema';

// Updated props type alias using Zod schema
export type ProcessSectionProps = z.infer<typeof processSectionDataSchema>;

export default function ProcessSection({
  badgeText,
  heading,
  subtitle,
  steps,
}: ProcessSectionProps) {
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

      <div className="max-w-4xl mx-auto relative z-10">
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

        {/* Steps: animate each step sequentially on initial load */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[40px] inset-y-0 w-0.5 bg-neutral-background/200 hidden md:block" />
          <div className="space-y-16">
            {steps.map((step, index) => (
              <LazySection
                key={step.id}
                animation="slide-up"
                delay={0.1 + index * 0.1}
                className="flex flex-col md:flex-row gap-8"
              >
                <div className="shrink-0 flex items-start justify-center relative z-10">
                  <div className="size-20 rounded-full flex items-center justify-center text-2xl font-bold shadow-md bg-primary text-white">
                    {step.number || String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="grow w-full bg-neutral-surface p-8 rounded-xl shadow-md border hover:shadow-lg transition-shadow">
                  <h3 className="mb-1">{step.title}</h3>
                  {step.subtitle && (
                    <p className="text-primary font-medium mb-3">{step.subtitle}</p>
                  )}
                  <p className="text-foreground mb-6">{step.description}</p>
                  {step.details && step.details.length > 0 && (
                    <div className="bg-background p-6 rounded-lg">
                      <h3 className="mb-3">What this includes:</h3>
                      <ul className="space-y-2">
                        {step.details.map(detail => (
                          <li key={detail} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </LazySection>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
