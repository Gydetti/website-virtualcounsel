// @ts-nocheck
'use client';

import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import LazySection from '@/components/ui/lazy-section';
import OptimizedImage from '@/components/ui/optimized-image';
import blurDataMap from '@/public/images/blurDataURL.json';
import type { heroSectionDataSchema } from '@/lib/schemas/sections.schema';
import { siteConfig } from '@/lib/siteConfig';

const HeroStats = dynamic(() => import('@/components/sections/hero-stats'), {
  ssr: false,
});
const HeroTyping = dynamic(() => import('@/components/sections/hero-typing'), {
  ssr: false,
});

export type HeroSectionProps = z.infer<typeof heroSectionDataSchema> & {
  variant?: 'imageLeft' | 'imageRight' | 'centered';
};

export default function HeroSection({
  variant = 'imageRight',
  badgeText,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  showSecondaryCta = true,
  typingWords,
  stats,
  image,
  showHelpedStats = true,
  showOverlayStat = false,
  overlayTitle,
  overlayValue,
}: HeroSectionProps) {
  // Hero image source state with fallback
  const [currentImageSrc, setCurrentImageSrc] = useState(image?.src);
  useEffect(() => {
    setCurrentImageSrc(image?.src);
  }, [image?.src]);

  const defaultImageSrc = '/images/placeholders/placeholder.svg';
  const imageToDisplay = currentImageSrc || defaultImageSrc;
  const imageAltText = image?.alt || 'Hero image';

  const router = useRouter();
  // Determine order class for left column content
  const contentOrderClass = variant === 'imageLeft' ? 'md:order-2' : '';

  return (
    <section
      id="hero-section"
      aria-labelledby="hero-section-heading"
      className="hero-pattern relative overflow-hidden bg-gradient-to-r from-brand-primary/10 to-white min-h-[80vh] sm:min-h-[80vh] flex items-center"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Floating elements for visual interest */}
      {/* <div className="hidden sm:block absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
			<div className="hidden sm:block absolute bottom-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" /> */}

      <Section
        fullBleed={false}
        className="relative z-10 pb-16 pt-14 sm:py-12 md:py-14 flex flex-col justify-center h-full"
      >
        <div className="grid md:grid-cols-2 gap-8 sm:gap-8 md:gap-12 lg:gap-16 items-center">
          <LazySection
            animation="slide-up"
            delay={0.1}
            className={`${contentOrderClass} flex flex-col justify-center space-y-6 z-10`}
          >
            {badgeText && (
              <LazySection animation="fade-up" delay={0.2}>
                <Badge variant="dark" className="w-fit text-white">
                  {badgeText}
                </Badge>
              </LazySection>
            )}
            {headline && (
              <LazySection animation="fade-up" delay={0.3}>
                <h1 id="hero-section-heading" className="font-bold leading-tight text-balance">
                  <span className="block">{headline}</span>
                  <HeroTyping typingWords={typingWords} />
                </h1>
              </LazySection>
            )}
            {subheadline && (
              <LazySection animation="fade-up" delay={0.4}>
                <p className="text-foreground max-w-lg">{subheadline}</p>
              </LazySection>
            )}
            {(primaryCta?.text || secondaryCta?.text) && (
              <LazySection animation="fade-up" delay={0.5}>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {primaryCta?.text && primaryCta.href && (
                    <Button
                      size="lg"
                      variant="spark"
                      className={`group ${!showSecondaryCta || !secondaryCta?.text ? 'w-full sm:w-auto' : ''}`}
                      onClick={() => {
                        if (primaryCta.href) router.push(primaryCta.href);
                      }}
                    >
                      {primaryCta.text}
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  )}
                  {showSecondaryCta && secondaryCta?.text && secondaryCta.href && (
                    <Button
                      size="lg"
                      variant="ghost"
                      className="bg-transparent text-primary hover:text-primary80 hover:bg-transparent"
                      asChild
                    >
                      <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
                    </Button>
                  )}
                </div>
              </LazySection>
            )}
            {showHelpedStats && (
              <LazySection animation="fade-up" delay={0.6}>
                <div className="flex items-center space-x-4 mt-6 text-sm">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className="inline-block size-8 rounded-full ring-2 ring-white overflow-hidden bg-neutral-background/200"
                      >
                        <Image
                          src="/placeholder.svg?height=32&width=32"
                          alt="User avatar"
                          width={32}
                          height={32}
                          className="size-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-foreground">
                    <span className="font-medium">100+</span> statistic that helps build authority
                  </div>
                </div>
              </LazySection>
            )}
          </LazySection>

          <LazySection
            animation="slide-up"
            delay={0.2}
            className={`relative w-full max-w-[600px] md:translate-y-6${variant === 'imageLeft' ? 'md:order-1' : 'ml-auto'}`}
          >
            <AspectRatio ratio={6 / 5} className="overflow-visible rounded-xl shadow-2xl relative">
              <OptimizedImage
                src={imageToDisplay}
                alt={imageAltText}
                fill
                sizes="(max-width: 600px) 100vw, 600px"
                className="absolute inset-0 object-cover rounded-xl"
                priority
                placeholder="blur"
                blurDataURL={blurDataMap[imageToDisplay as keyof typeof blurDataMap]}
                onError={() => setCurrentImageSrc(defaultImageSrc)}
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-xl">
                <p className="text-white font-medium"> </p>
              </div>
              {showOverlayStat && overlayTitle && overlayValue && (
                <div
                  className="hidden md:block absolute -bottom-6 -left-6 h-24 w-2/3 rounded-xl p-4 shadow-lg z-10"
                  style={{ backgroundColor: siteConfig.theme.colors.secondary }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex size-12 items-center justify-center rounded-full bg-neutral-surface">
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: siteConfig.theme.colors.secondary }}
                      >
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                    </div>
                    <div className="text-white">
                      <p className="text-sm font-medium m-0">{overlayTitle}</p>
                      <p className="text-xl font-bold m-0">{overlayValue}</p>
                    </div>
                  </div>
                </div>
              )}
            </AspectRatio>
          </LazySection>
        </div>

        {siteConfig.features.enableHeroStats && <HeroStats stats={stats} />}
      </Section>

      {/* soft left-only bottom shadow (20% width gradient) */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-1/5 h-1 bg-gradient-to-r from-black/10 to-transparent pointer-events-none"
      />
    </section>
  );
}
