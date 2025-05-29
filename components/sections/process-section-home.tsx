'use client';

import type { CSSProperties } from 'react';

import { Section } from '@/components/layout/Section';
import type { ProcessSectionProps } from '@/components/sections/process-section';
import { Badge } from '@/components/ui/badge';
import LazySection from '@/components/ui/lazy-section';
import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';

export default function ProcessSectionHome({
  badgeText,
  heading,
  subtitle,
  steps,
}: ProcessSectionProps) {
  const { getElementBorderRadius } = useThemeBorderRadius();

  if (!steps || steps.length === 0) return null;

  return (
    <Section id="process" fullBleed={false} className=" px-4 py-20 md:px-6 md:py-16">
      <LazySection
        animation="none"
        className="stagger-container mx-auto max-w-6xl text-center"
        style={{ '--stagger-delay': '0.1s' } as CSSProperties}
      >
        <Badge className="mb-4" style={{ '--index': 0 } as CSSProperties}>
          {badgeText}
        </Badge>
        {heading && (
          <h2 className="mt-4 tracking-tight" style={{ '--index': 1 } as CSSProperties}>
            {heading}
          </h2>
        )}
        {subtitle && (
          <p
            className="mt-6 text-lg leading-relaxed text-neutral-text"
            style={{ '--index': 2 } as CSSProperties}
          >
            {subtitle}
          </p>
        )}
      </LazySection>

      <LazySection
        animation="none"
        className={`stagger-container mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-stretch mx-auto ${
          steps.length === 1
            ? 'md:grid-cols-1 max-w-2xl'
            : steps.length === 2
              ? 'md:grid-cols-2 max-w-4xl'
              : steps.length === 3
                ? 'md:grid-cols-3 max-w-6xl'
                : steps.length === 4
                  ? 'md:grid-cols-4 max-w-7xl'
                  : steps.length >= 5
                    ? 'md:grid-cols-4 max-w-7xl' // Cap at 4 columns for readability
                    : 'md:grid-cols-3 max-w-6xl' // Default fallback
        }`}
        style={{ '--stagger-delay': '0.2s' } as CSSProperties}
      >
        {steps.map((step, i) => (
          <div key={step.id} className="relative" style={{ '--index': i } as CSSProperties}>
            <div
              className={`relative z-10 size-full flex flex-col items-center ${getElementBorderRadius('card')} border border-divider bg-neutral-surface p-8 text-center shadow-sm transition-all hover:shadow-md card-equal-height`}
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-primary text-white text-lg font-semibold mb-4">
                {step.number ?? String(i + 1).padStart(2, '00')}
              </div>
              <div className="card-content flex flex-col items-center gap-4">
                <h3 className="text-xl font-semibold text-neutral-text">{step.title}</h3>
                <p className="text-neutral-text leading-relaxed">{step.description}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="absolute left-1/2 top-1/2 hidden h-1 w-full -translate-y-1/2 bg-neutral-divider z-0 md:block" />
            )}
          </div>
        ))}
      </LazySection>
    </Section>
  );
}
