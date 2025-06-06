'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import LazySection from '@/components/ui/lazy-section';
import OptimizedImage from '@/components/ui/optimized-image';
import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import { DEFAULT_PLACEHOLDER_IMAGE } from '@/lib/constants';
import type { aboutSectionDataSchema } from '@/lib/schemas/sections.schema';
import { siteConfig } from '@/lib/site.config.local';
import { cn } from '@/lib/utils';
import { parseMarkdownParts } from '@/lib/utils/text-formatting';

export type AboutSectionProps = z.infer<typeof aboutSectionDataSchema> & {
  isHomepage?: boolean;
  philosophy?: {
    title: string;
    text: string;
  };
  patternStyle?: string;
  patternOpacity?: number;
};

export default function AboutSection({
  badgeText,
  heading,
  paragraphs,
  image,
  cta,
  philosophy,
  isHomepage = false,
  patternStyle,
  patternOpacity,
}: AboutSectionProps) {
  const { getBorderRadiusClass } = useThemeBorderRadius();

  // Get header configuration for transparent header support
  const headerConfig = siteConfig.theme.headerConfig;
  const isTransparentHeader = headerConfig?.transparentMode ?? false;
  const heroTopPadding = headerConfig?.heroTopPadding ?? 'pt-20 md:pt-24 lg:pt-28';

  if (isHomepage) {
    // Homepage version: Image left, text right, philosophy section below with dark background
    // Note: Homepage about section doesn't need hero top padding since it's not at the top
    return (
      <Section
        id="about"
        bgClass={siteConfig.sectionStyles?.heroGradient ?? ''}
        patternStyle={patternStyle}
        patternOpacity={patternOpacity}
        className="relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image on left */}
          <LazySection animation="slide-up" delay={0}>
            <div className="relative">
              <AspectRatio ratio={5 / 6}>
                <OptimizedImage
                  src={image?.src || DEFAULT_PLACEHOLDER_IMAGE}
                  alt={image?.alt || 'About our company'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={cn(getBorderRadiusClass('image'), 'object-[30%_center]')}
                  priority={isHomepage}
                  objectFit="cover"
                />
              </AspectRatio>
            </div>
          </LazySection>

          {/* Content on right */}
          <div className="space-y-8">
            <LazySection animation="slide-up" delay={0.1} className="space-y-6">
              {badgeText && <Badge className="mb-4">{badgeText}</Badge>}

              {heading && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {heading}
                </h2>
              )}

              {paragraphs && paragraphs.length > 0 && (
                <div className="space-y-4">
                  {paragraphs.slice(0, 2).map(paragraph => {
                    const parts = parseMarkdownParts(paragraph);
                    return (
                      <p
                        key={paragraph.slice(0, 20)}
                        className="text-lg leading-relaxed text-foreground/80"
                      >
                        {parts.map((part, index) =>
                          part.isBold ? (
                            <strong
                              key={`${paragraph.slice(0, 10)}-${index}`}
                              className="font-semibold text-primary-dark"
                            >
                              {part.text}
                            </strong>
                          ) : (
                            part.text
                          )
                        )}
                      </p>
                    );
                  })}
                </div>
              )}
            </LazySection>

            {/* Philosophy section with dark brand background */}
            {philosophy && (
              <LazySection animation="slide-up" delay={0.2}>
                <div
                  className={cn(
                    'p-6 lg:p-8',
                    getBorderRadiusClass('card'),
                    'bg-brand-secondary-dark text-white relative overflow-hidden'
                  )}
                >
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold mb-4 text-white">{philosophy.title}</h3>
                    <p className="text-white/90 leading-relaxed mb-6">{philosophy.text}</p>

                    {/* Button to about page */}
                    <Button
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 hover:border-white/60 transition-all duration-200"
                      animation="none"
                      asChild
                    >
                      <Link href="/about">
                        Meer over mij
                        <ArrowRight className="ml-2 size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </LazySection>
            )}
          </div>
        </div>
      </Section>
    );
  }

  // About page version: Image left, title and text on right (simple layout)
  // Note: About page gets hero padding because it's the first section and needs to account for transparent header
  return (
    <Section
      id="about"
      bgClass={siteConfig.sectionStyles?.heroGradient ?? ''}
      patternStyle={patternStyle}
      patternOpacity={patternOpacity}
      className={cn('relative z-10', isTransparentHeader && heroTopPadding)}
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image on left */}
        <LazySection animation="slide-up" delay={0}>
          <div className="relative">
            <AspectRatio ratio={5 / 6}>
              <OptimizedImage
                src={image?.src || DEFAULT_PLACEHOLDER_IMAGE}
                alt={image?.alt || 'About our company'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={getBorderRadiusClass('image')}
                priority
                objectFit="cover"
              />
            </AspectRatio>
          </div>
        </LazySection>

        {/* Content on right */}
        <LazySection animation="slide-up" delay={0.1} className="space-y-6">
          {badgeText && <Badge className="mb-4">{badgeText}</Badge>}

          {heading && <h1 className="">{heading}</h1>}

          {paragraphs && paragraphs.length > 0 && (
            <div className="space-y-6">
              {paragraphs.map(paragraph => {
                const parts = parseMarkdownParts(paragraph);
                return (
                  <p
                    key={paragraph.slice(0, 20)}
                    className="text-lg leading-relaxed text-foreground/80"
                  >
                    {parts.map((part, index) =>
                      part.isBold ? (
                        <strong
                          key={`${paragraph.slice(0, 10)}-${index}`}
                          className="font-semibold text-primary-dark"
                        >
                          {part.text}
                        </strong>
                      ) : (
                        part.text
                      )
                    )}
                  </p>
                );
              })}
            </div>
          )}

          {cta?.href && cta?.text && (
            <Button size="lg" className="mt-8" asChild>
              <Link href={cta.href}>
                {cta.text}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          )}
        </LazySection>
      </div>
    </Section>
  );
}
