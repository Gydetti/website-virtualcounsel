'use client';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LazySection from '@/components/ui/lazy-section';
import OptimizedImage from '@/components/ui/optimized-image';
import type { featuresSectionDataSchema } from '@/lib/schemas/sections.schema';
import { siteConfig } from '@/lib/siteConfig';

// Updated props type alias using Zod schema
export type FeaturesSectionProps = z.infer<typeof featuresSectionDataSchema> & {
  // Optional per-section background pattern overrides
  patternStyle?: string;
  patternOpacity?: number;
};

export default function FeaturesSection({
  badgeText,
  heading,
  description,
  comparison,
  cta, // cta is in schema, but rendering is commented out in component
  patternStyle,
  patternOpacity,
}: FeaturesSectionProps) {
  const { without, with: withComp } = comparison || {};
  const withoutTitle = without?.title;
  const withoutItems = without?.items;
  const withTitle = withComp?.title;
  const withItems = withComp?.items;

  // Normalize pattern style and opacity
  const rawPatternStyle = patternStyle ?? siteConfig.theme.visualStyle?.patternStyle;
  const usedOpacity = patternOpacity ?? siteConfig.theme.visualStyle?.patternOpacity;

  // Check if micro-interactions are enabled
  const enableMicroInteractions = siteConfig.features.enableMicroInteractions;

  return (
    <Section
      id="features-section"
      aria-labelledby="features-section-heading"
      className="relative overflow-hidden py-16 md:py-24"
      patternStyle={rawPatternStyle}
      patternOpacity={usedOpacity}
    >
      {/* Decorative elements for depth */}
      <div className="absolute top-0 right-0 size-96 bg-primary/5 rounded-full -translate-y-1/4 translate-x-1/4 blur-3xl z-0" />

      <div className="relative z-10">
        <LazySection animation="fade-up" duration={0.5} intensity="subtle">
          <div className="max-w-3xl mx-auto text-center mb-16">
            {badgeText && <Badge className="mb-4">{badgeText}</Badge>}
            {heading && (
              <h2 id="features-section-heading" className="section-title text-neutral-text mb-6">
                {heading}
              </h2>
            )}
            {description && <p className="text-foreground text-lg md:text-xl">{description}</p>}
          </div>
        </LazySection>

        {/* Comparison panels with staggered reveal */}
        <div className="relative grid md:grid-cols-2 gap-8 md:gap-0 mb-16">
          {comparison?.without?.items && comparison.without.items.length > 0 && (
            <LazySection
              animation="slide-right"
              delay={0.2}
              intensity="moderate"
              className="md:w-4/5 md:mx-auto"
            >
              <Card
                className="border border-feedback-error bg-feedback-error-bg/50 backdrop-blur p-6 transition-colors text-neutral-text/800"
                elevation="subtle"
                hover={enableMicroInteractions ? 'lift' : 'none'}
              >
                {withoutTitle && (
                  <h3 className="text-feedback-error mb-4 text-xl font-semibold">{withoutTitle}</h3>
                )}
                <ul className="space-y-4">
                  {withoutItems?.map((item, index) => (
                    <LazySection
                      key={item}
                      animation="fade-up"
                      delay={0.1 * (index + 1)}
                      intensity="subtle"
                      className="flex items-start"
                    >
                      <XCircle className="text-feedback-error mr-3 size-5 shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </LazySection>
                  ))}
                </ul>
              </Card>
            </LazySection>
          )}

          {/* Decorative arrow with animation */}
          <LazySection
            className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animation="fade"
            delay={0.6}
            intensity="moderate"
          >
            <div className="relative">
              <OptimizedImage
                src="/images/general/1 bend arrow right.svg"
                alt="Arrow indicating transition"
                width={64}
                height={64}
                objectFit="contain"
                className="opacity-90 animate-pulse"
              />
              {/* Small decorative dot accent */}
              <div className="absolute size-2 bg-primary rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </LazySection>

          {comparison?.with?.items && comparison.with.items.length > 0 && (
            <LazySection
              animation="slide-left"
              delay={0.4}
              intensity="moderate"
              className="md:w-4/5 md:mx-auto"
            >
              <Card
                className="border border-feedback-success bg-feedback-success-bg/50 backdrop-blur p-6 transition-colors text-neutral-text/800"
                elevation="subtle"
                hover={enableMicroInteractions ? 'lift' : 'none'}
              >
                {withTitle && (
                  <h3 className="text-feedback-success mb-4 text-xl font-semibold">{withTitle}</h3>
                )}
                <ul className="space-y-4">
                  {withItems?.map((item, index) => (
                    <LazySection
                      key={item}
                      animation="fade-up"
                      delay={0.1 * (index + 1)}
                      intensity="subtle"
                      className="flex items-start"
                    >
                      <CheckCircle className="text-feedback-success mr-3 size-5 shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </LazySection>
                  ))}
                </ul>
              </Card>
            </LazySection>
          )}
        </div>

        {/* CTA with animation */}
        {cta?.href && cta?.text && (
          <LazySection animation="fade-up" delay={0.7} className="text-center">
            <Button size="lg" className="group" elevation="medium" animation="moderate" asChild>
              <Link href={cta.href}>
                {cta.text}
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </LazySection>
        )}
      </div>
    </Section>
  );
}
