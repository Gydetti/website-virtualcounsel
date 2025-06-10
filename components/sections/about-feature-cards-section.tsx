'use client';

import { CheckCircle, Star } from 'lucide-react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import LazySection from '@/components/ui/lazy-section';
import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import type { aboutFeatureCardsSectionDataSchema } from '@/lib/schemas/sections.schema';
import { cn } from '@/lib/utils';

export type AboutFeatureCardsSectionProps = z.infer<typeof aboutFeatureCardsSectionDataSchema>;

const iconMap = {
  Star,
  CheckCircle,
};

export default function AboutFeatureCardsSection({
  badgeText,
  heading,
  subheading,
  featureCards,
  patternStyle,
  patternOpacity,
}: AboutFeatureCardsSectionProps) {
  const { getBorderRadiusClass } = useThemeBorderRadius();

  if (!featureCards || featureCards.length === 0) {
    return null;
  }

  return (
    <Section id="about-feature-cards" patternStyle={patternStyle} patternOpacity={patternOpacity}>
      <div className="text-center mb-12">
        {badgeText && (
          <LazySection animation="fade-up" delay={0}>
            <Badge className="mb-4">{badgeText}</Badge>
          </LazySection>
        )}

        {heading && (
          <LazySection animation="fade-up" delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{heading}</h2>
          </LazySection>
        )}

        {subheading && (
          <LazySection animation="fade-up" delay={0.2}>
            <p className="text-lg text-neutral-text max-w-2xl mx-auto">{subheading}</p>
          </LazySection>
        )}
      </div>

      <LazySection
        animation="fade-up"
        delay={0.3}
        childrenStagger={true}
        childrenStaggerDelay={0.1}
        className={cn(
          'stagger-container card-equal-height',
          featureCards.length === 3
            ? 'card-grid-optimized-3'
            : 'grid gap-6 md:grid-cols-3 justify-items-center'
        )}
      >
        {featureCards.map((card, index) => {
          const IconComponent = iconMap[card.icon as keyof typeof iconMap] || CheckCircle;

          return (
            <div
              key={card.id}
              className={featureCards.length === 3 ? 'size-full' : 'size-full max-w-sm'}
            >
              <Card
                className={`size-full flex flex-col p-6 text-center hover:shadow-lg transition-all duration-300 ${getBorderRadiusClass('card')}`}
              >
                <div className="mb-6">
                  <div
                    className={`size-16 mx-auto ${card.iconBg} flex items-center justify-center mb-4 ${getBorderRadiusClass('badge')}`}
                  >
                    <IconComponent className={`size-8 ${card.iconColor}`} />
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-2">{card.title}</h3>
                </div>

                <p className="text-foreground/80 leading-relaxed grow">{card.description}</p>
              </Card>
            </div>
          );
        })}
      </LazySection>
    </Section>
  );
}
