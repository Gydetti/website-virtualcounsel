'use client';

import { Compass, Heart, Lightbulb, Quote, Target } from 'lucide-react';
import Image from 'next/image';
import type { z } from 'zod';

import type { SectionProps } from '@/components/layout/Section';
import { Section } from '@/components/layout/Section';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import LazySection from '@/components/ui/lazy-section';
import OptimizedImage from '@/components/ui/optimized-image';
import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import { DEFAULT_PLACEHOLDER_IMAGE } from '@/lib/constants';
import type { aboutPhilosophySectionDataSchema } from '@/lib/schemas/sections.schema';
import { cn } from '@/lib/utils';

export type AboutPhilosophySectionProps = z.infer<typeof aboutPhilosophySectionDataSchema> & {
  patternStyle?: string;
  patternOpacity?: number;
  patternFade?: SectionProps['patternFade'];
  patternColor?: string;
};

const iconMap = {
  heart: Heart,
  compass: Compass,
  lightbulb: Lightbulb,
  target: Target,
};

export default function AboutPhilosophySection({
  badgeText,
  heading,
  subtitle,
  philosophyPoints,
  quote,
  image,
  patternStyle,
  patternOpacity,
  patternFade,
  patternColor,
}: AboutPhilosophySectionProps) {
  const { getBorderRadiusClass } = useThemeBorderRadius();

  return (
    <Section
      id="about-philosophy"
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

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
        {/* Philosophy Points */}
        <div className="space-y-8">
          {philosophyPoints.map((point, index) => {
            const IconComponent = iconMap[point.icon as keyof typeof iconMap] || Heart;

            return (
              <LazySection key={point.id} animation="slide-up" delay={0.4 + index * 0.1}>
                <div className="flex gap-4 items-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                    <IconComponent className="size-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-text mb-3">{point.title}</h3>
                    <p className="text-neutral-text leading-relaxed">{point.description}</p>
                  </div>
                </div>
              </LazySection>
            );
          })}
        </div>

        {/* Image */}
        <LazySection animation="slide-up" delay={0.5}>
          <div className="relative">
            <AspectRatio ratio={4 / 3}>
              <OptimizedImage
                src={image?.src || DEFAULT_PLACEHOLDER_IMAGE}
                alt={image?.alt || 'Image representing our philosophy and values'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={cn(getBorderRadiusClass('image'), 'object-center')}
                priority
                objectFit="cover"
              />
            </AspectRatio>
          </div>
        </LazySection>
      </div>

      {/* Quote Section */}
      {quote && (
        <LazySection animation="fade-up" delay={0.7}>
          <div className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <Quote className="size-8 text-primary shrink-0 mt-1" />
              <div>
                <blockquote className="text-xl font-medium text-neutral-text leading-relaxed mb-4">
                  "{quote.text}"
                </blockquote>
                <cite className="text-primary font-semibold">— {quote.author}</cite>
              </div>
            </div>
          </div>
        </LazySection>
      )}
    </Section>
  );
}
