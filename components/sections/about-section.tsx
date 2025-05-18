'use client';

import { Section } from '@/components/layout/Section';
import KpiSection from '@/components/sections/kpi-section';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import LazySection from '@/components/ui/lazy-section';
import OptimizedImage from '@/components/ui/optimized-image';
import * as homepageData from '@/lib/data/homepage';
import type { aboutSectionDataSchema } from '@/lib/schemas/sections.schema';
import { siteConfig } from '@/lib/site.config.local';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import Link from 'next/link';
import type { z } from 'zod';

// Updated props type alias using Zod schema
export type AboutSectionProps = z.infer<typeof aboutSectionDataSchema> & {
  variant?: 'imageLeft' | 'imageRight' | 'centered' | 'classic';
  philosophy?: {
    title: string;
    text: string;
  };
  featureCards?: {
    id: string;
    title: string;
    description: string;
    icon: string;
    iconBg: string;
    iconColor: string;
  }[];
  isHomepage?: boolean;
};

export default function AboutSection({
  variant = 'imageLeft',
  badgeText,
  heading,
  paragraphs,
  image,
  stats,
  cta,
  philosophy,
  featureCards,
  isHomepage = false,
}: AboutSectionProps) {
  const containerClasses =
    variant === 'centered'
      ? 'grid grid-cols-1 gap-12 items-center text-center'
      : 'grid md:grid-cols-2 gap-12 items-center';
  const imageOrderClass = variant === 'imageRight' ? 'md:order-2' : '';
  const contentOrderClass = variant === 'imageRight' ? 'md:order-1' : '';

  const outerContainerClass = isHomepage
    ? `${containerClasses} lg:max-w-[85vw] mx-auto`
    : containerClasses;

  // Refactored image rendering logic
  const renderImage = () => {
    if (!image?.src) {
      console.warn('Image source is missing. Using placeholder.');
      return (
        <OptimizedImage
          src="/images/placeholders/placeholder.svg"
          alt="Placeholder image representing company or team"
          fill
          className="relative aspect-[3/2] w-full max-w-xl mx-auto rounded-xl shadow-2xl z-10"
          objectFit="cover"
          priority
        />
      );
    }

    return (
      <OptimizedImage
        src={image.src}
        alt={image.alt || 'About our company'}
        fill
        className="relative aspect-[3/2] w-full max-w-xl mx-auto rounded-xl shadow-2xl z-10"
        objectFit="cover"
        priority
      />
    );
  };

  // Legacy 'classic' two-column layout with image left and original content
  if (variant === 'classic') {
    return (
      <Section
        id="about"
        className="relative overflow-hidden bg-gradient-to-r from-brand-light via-transparent to-transparent z-10"
      >
        <div className={outerContainerClass}>
          <LazySection
            animation="slide-up"
            delay={0}
            className={`relative w-full max-w-[600px] transform md:translate-y-6 ${imageOrderClass}`}
          >
            <AspectRatio ratio={6 / 5} className="overflow-visible rounded-xl shadow-2xl relative">
              <OptimizedImage
                src={image?.src || '/images/placeholders/placeholder.svg'}
                alt={image?.alt || 'About our company'}
                fill
                sizes="(max-width: 600px) 100vw, 600px"
                className="absolute inset-0 object-cover rounded-xl"
                priority
              />
            </AspectRatio>
          </LazySection>
          <LazySection animation="slide-up" delay={0.1} className={contentOrderClass}>
            <div className={contentOrderClass}>
              {badgeText && (
                <LazySection animation="fade-up" delay={0.2}>
                  <Badge variant="light" className="mb-4">
                    {badgeText}
                  </Badge>
                </LazySection>
              )}
              {heading && (
                <LazySection animation="fade-up" delay={0.3}>
                  {isHomepage ? (
                    <h2 className="text-heading">{heading}</h2>
                  ) : (
                    <h1 className="text-heading">{heading}</h1>
                  )}
                </LazySection>
              )}
              {paragraphs && paragraphs.length > 0 && (
                <LazySection animation="fade-up" delay={0.4}>
                  {paragraphs.map(p => (
                    <p key={p.slice(0, 16)} className="text-neutral-text mb-6 last:mb-8">
                      {p}
                    </p>
                  ))}
                </LazySection>
              )}
              {stats && stats.length > 0 && (
                <LazySection animation="fade-up" delay={0.5}>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {stats.map(stat => (
                      <div
                        key={stat.id}
                        className="bg-neutral-surface p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="font-bold text-primary text-xl">{stat.value}</div>
                        <div className="text-neutral-text">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </LazySection>
              )}
              {philosophy && (
                <LazySection animation="fade-up" delay={0.4} className="mt-8">
                  <div className="rounded-xl border bg-neutral-background p-8 shadow-sm hover:shadow-md transition-shadow">
                    <h2 className="text-xl font-semibold text-neutral-text">{philosophy.title}</h2>
                    <p className="mt-2 text-neutral-text leading-relaxed">{philosophy.text}</p>
                  </div>
                </LazySection>
              )}
              {featureCards && featureCards.length > 0 && (
                <LazySection animation="fade-up" delay={0.5} className="mt-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {featureCards.map(card => {
                      const Icon = card.icon === 'Star' ? Star : CheckCircle;
                      return (
                        <div
                          key={card.id}
                          className="rounded-xl border bg-neutral-surface p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-full ${card.iconBg}`}
                          >
                            <Icon className={`${card.iconColor} h-6 w-6`} />
                          </div>
                          <h3 className="mt-4 text-lg font-semibold text-neutral-text">
                            {card.title}
                          </h3>
                          <p className="mt-2 text-sm text-neutral-text">{card.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </LazySection>
              )}
              {siteConfig.features.enableAboutHeroCta && cta?.href && cta?.text && (
                <LazySection animation="fade-up" delay={0.6}>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 group" asChild>
                    <Link href={cta.href}>
                      {cta.text}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </LazySection>
              )}
            </div>
          </LazySection>
        </div>
      </Section>
    );
  }

  return (
    <Section
      id="about"
      className={`relative overflow-hidden bg-gradient-to-r from-brand-light via-transparent to-transparent z-10${isHomepage ? ' md:min-h-[880px] flex items-center' : ''}`}
    >
      <div className={outerContainerClass}>
        <LazySection animation="slide-up" delay={0} className={contentOrderClass}>
          {badgeText && (
            <LazySection animation="fade-up" delay={0.2}>
              <Badge variant="light" className="mb-4">
                {badgeText}
              </Badge>
            </LazySection>
          )}
          {heading && (
            <LazySection animation="fade-up" delay={0.3}>
              {isHomepage ? (
                <h2 className="text-heading">{heading}</h2>
              ) : (
                <h1 className="text-heading">{heading}</h1>
              )}
            </LazySection>
          )}
          {paragraphs && paragraphs.length > 0 && (
            <LazySection animation="fade-up" delay={0.4}>
              {paragraphs.map(p => (
                <p key={p.slice(0, 16)} className="text-neutral-text mb-6 last:mb-8">
                  {p}
                </p>
              ))}
            </LazySection>
          )}
          {cta?.href && cta?.text && (
            <LazySection animation="fade-up" delay={0.5}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 group" asChild>
                <Link href={cta.href}>
                  {cta.text}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </LazySection>
          )}
        </LazySection>
        <LazySection animation="slide-up" delay={0.1} className={imageOrderClass}>
          {philosophy && (
            <LazySection animation="fade-up" delay={0.6}>
              <div className="rounded-xl border bg-neutral-background p-8 shadow-sm hover:shadow-md transition-shadow mb-6">
                <h2 className="text-xl font-semibold text-neutral-text">{philosophy.title}</h2>
                <p className="mt-2 text-neutral-text leading-relaxed">{philosophy.text}</p>
              </div>
            </LazySection>
          )}
          {featureCards && featureCards.length > 0 && (
            <LazySection animation="fade-up" delay={0.7}>
              <div className="grid gap-4 sm:grid-cols-2">
                {featureCards.map(card => {
                  const Icon = card.icon === 'Star' ? Star : CheckCircle;
                  return (
                    <div
                      key={card.id}
                      className="rounded-xl border bg-neutral-surface p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${card.iconBg}`}
                      >
                        <Icon className={`${card.iconColor} h-6 w-6`} />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-neutral-text">{card.title}</h3>
                      <p className="mt-2 text-sm text-neutral-text">{card.description}</p>
                    </div>
                  );
                })}
              </div>
            </LazySection>
          )}
        </LazySection>
      </div>
      {/* Full-width KPI row under About two-column grid */}
      {isHomepage && siteConfig.features.enableAboutKpiSection && (
        <LazySection animation="fade-up" delay={0.3} className="w-full mt-20">
          <KpiSection stats={homepageData.kpiSectionData.stats} embedInAbout />
        </LazySection>
      )}
    </Section>
  );
}
