'use client';

import type { z } from 'zod';

import type { SectionProps } from '@/components/layout/Section';
import { Section } from '@/components/layout/Section';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import LazySection from '@/components/ui/lazy-section';
import OptimizedImage from '@/components/ui/optimized-image';
import { DEFAULT_PLACEHOLDER_IMAGE } from '@/lib/constants';
import type { aboutPersonalJourneySectionDataSchema } from '@/lib/schemas/sections.schema';

export type AboutPersonalJourneySectionProps = z.infer<
  typeof aboutPersonalJourneySectionDataSchema
> & {
  patternStyle?: string;
  patternOpacity?: number;
  patternFade?: SectionProps['patternFade'];
  patternColor?: string;
};

export default function AboutPersonalJourneySection({
  badgeText,
  heading,
  subtitle,
  journeySteps,
  image,
  patternStyle,
  patternOpacity,
  patternFade,
  patternColor,
}: AboutPersonalJourneySectionProps) {
  return (
    <Section
      id="about-personal-journey"
      patternStyle={patternStyle}
      patternOpacity={patternOpacity}
      patternFade={patternFade}
      patternColor={patternColor}
      className="relative z-10"
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
        {subtitle && (
          <LazySection animation="fade-up" delay={0.3}>
            <p className="text-lg text-neutral-text max-w-3xl mx-auto">{subtitle}</p>
          </LazySection>
        )}
      </div>

      {/* Journey Content Grid */}
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Journey Steps */}
        <div className="space-y-8">
          {journeySteps.map((step, index) => (
            <LazySection key={step.id} animation="slide-up" delay={0.4 + index * 0.1}>
              <div className="relative pl-8 border-l-2 border-primary/20 last:border-l-0">
                {/* Timeline dot */}
                <div className="absolute -left-2 top-0 size-4 bg-primary rounded-full border-4 border-white shadow-sm" />

                <div className="pb-8">
                  <div className="text-sm font-medium text-primary mb-2">{step.timeframe}</div>
                  <h3 className="text-xl font-semibold text-neutral-text mb-3">{step.title}</h3>
                  <p className="text-neutral-text leading-relaxed">{step.description}</p>
                </div>
              </div>
            </LazySection>
          ))}
        </div>

        {/* Image */}
        <LazySection animation="slide-up" delay={0.5} className="lg:order-last">
          <AspectRatio ratio={5 / 4} className="overflow-hidden rounded-xl shadow-lg">
            <OptimizedImage
              src={image?.src || DEFAULT_PLACEHOLDER_IMAGE}
              alt={image?.alt || 'Image representing professional journey and development'}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="size-full"
              priority
            />
          </AspectRatio>
        </LazySection>
      </div>
    </Section>
  );
}
