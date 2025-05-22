import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { BackgroundPattern } from '@/components/ui/background-pattern';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import LazySection from '@/components/ui/lazy-section';
import type { ctaSectionDataSchema } from '@/lib/schemas/sections.schema';
import { siteConfig } from '@/lib/siteConfig';

// Updated props type alias using Zod schema
export type CtaSectionProps = z.infer<typeof ctaSectionDataSchema>;

export default function CtaSection({
  badgeText,
  heading,
  description,
  primaryCta,
  secondaryCta,
}: CtaSectionProps) {
  // Get CTA style from siteConfig
  const ctaStyle = siteConfig.theme.sectionStyles?.ctaStyle || 'standard';

  // Hybrid: semantic keys or direct class names
  const semanticBgMap: Record<string, string> = {
    accent: 'bg-accent text-white',
    bold: 'bg-primary text-white',
    standard: 'bg-brand-secondary-dark text-white',
  };
  const bgColorClass = semanticBgMap[ctaStyle] || ctaStyle;

  // Configure pattern based on theme settings
  const showPattern = siteConfig.theme.visualStyle?.patternStyle !== 'none';
  const patternOpacity = ctaStyle === 'bold' ? 'medium' : 'subtle';

  // Use animation settings from config
  const animationIntensity = siteConfig.theme.animation?.intensity || 'subtle';

  return (
    <Section
      id="cta-section"
      aria-labelledby="cta-section-heading"
      fullBleed
      className={`relative overflow-hidden py-10 md:py-16 ${bgColorClass}`}
    >
      {/* Enhanced background styling */}
      {showPattern && (
        <BackgroundPattern
          pattern={
            siteConfig.theme.visualStyle?.patternStyle as
              | 'dots'
              | 'grid'
              | 'waves'
              | 'noise'
              | 'triangles'
              | 'hexagons'
              | 'crosshatch'
              | undefined
          }
          opacity={patternOpacity}
          color="white"
          animated={siteConfig.features.enableMicroInteractions}
          className="absolute inset-0 z-0 "
          patternSize={40}
        />
      )}

      {/* Decorative elements matching the theme */}
      <div className="hidden sm:block absolute top-0 right-0 size-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-0 left-0 size-96 bg-primary/10 rounded-full blur-3xl" />

      {/* Content with enhanced animations */}
      <div className="relative z-10 text-center pattern-overlay">
        {/* Badge */}
        {badgeText && (
          <LazySection animation="fade-up" delay={0.1} intensity={animationIntensity}>
            <Badge variant="light" className="mb-4">
              {badgeText}
            </Badge>
          </LazySection>
        )}

        {/* Heading */}
        {heading && (
          <LazySection animation="fade-up" delay={0.2} intensity={animationIntensity}>
            <h2 id="cta-section-heading" className="text-white">
              {heading}
            </h2>
          </LazySection>
        )}

        {/* Description */}
        {description && (
          <LazySection animation="fade-up" delay={0.3} intensity={animationIntensity}>
            <p className="text-white/90 max-w-xl mx-auto mb-8">{description}</p>
          </LazySection>
        )}

        {/* CTA buttons */}
        {(primaryCta?.text || secondaryCta?.text) && (
          <LazySection animation="fade-up" delay={0.4} intensity={animationIntensity}>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-12">
              {primaryCta?.href && primaryCta?.text && (
                <Button
                  size="lg"
                  variant="white"
                  className="group w-full sm:w-auto whitespace-normal"
                  elevation="medium"
                  animation={siteConfig.features.enableMicroInteractions ? 'moderate' : 'none'}
                  asChild
                >
                  <Link href={primaryCta.href}>
                    {primaryCta.text}
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              )}
              {secondaryCta?.href && secondaryCta?.text && (
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-neutral-surface/10 hover:text-white group w-full sm:w-auto whitespace-normal"
                  elevation="flat"
                  animation={siteConfig.features.enableMicroInteractions ? 'subtle' : 'none'}
                  asChild
                >
                  <Link href={secondaryCta.href}>
                    {secondaryCta.text}
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              )}
            </div>
          </LazySection>
        )}
      </div>
    </Section>
  );
}
