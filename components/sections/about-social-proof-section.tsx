'use client';

import { Quote, Star } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { z } from 'zod';

import type { SectionProps } from '@/components/layout/Section';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import LazySection from '@/components/ui/lazy-section';
import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import type { aboutSocialProofSectionDataSchema } from '@/lib/schemas/sections.schema';

export type AboutSocialProofSectionProps = z.infer<typeof aboutSocialProofSectionDataSchema> & {
  patternStyle?: string;
  patternOpacity?: number;
  patternFade?: SectionProps['patternFade'];
  patternColor?: string;
};

export default function AboutSocialProofSection({
  badgeText,
  heading,
  socialProof,
  patternStyle,
  patternOpacity,
  patternFade,
  patternColor,
}: AboutSocialProofSectionProps) {
  const { getElementBorderRadius } = useThemeBorderRadius();

  return (
    <Section
      id="about-social-proof"
      patternStyle={patternStyle}
      patternOpacity={patternOpacity}
      patternFade={patternFade}
      patternColor={patternColor}
      className="relative z-10 py-16"
    >
      {/* Header */}
      <div className="text-center mb-16">
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

      {/* Social Proof Grid */}
      <LazySection
        childrenStagger={true}
        delay={0.3}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        style={{ '--stagger-delay': '0.1s' } as CSSProperties}
      >
        {socialProof.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className="h-full"
            style={{ '--index': index } as CSSProperties}
          >
            <div
              className={`bg-neutral-surface border ${getElementBorderRadius('section')} p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full flex flex-col`}
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="size-8 text-primary" />
              </div>

              {/* Quote Text */}
              <div className="flex-1 mb-6">
                <blockquote className="text-neutral-text leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="text-left">
                <div className="font-semibold text-neutral-text">{testimonial.name}</div>
                {testimonial.title && (
                  <div className="text-sm text-neutral-text/70">{testimonial.title}</div>
                )}
              </div>

              {/* Star Rating (Optional visual enhancement) */}
              <div className="flex gap-1 mt-4 justify-end">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={`star-${testimonial.id}-${i}`}
                    className="size-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </LazySection>
    </Section>
  );
}
