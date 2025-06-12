'use client';

import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import LazySection from '@/components/ui/lazy-section';
import OptimizedImage from '@/components/ui/optimized-image';
import type { heroSectionDataSchema } from '@/lib/schemas/sections.schema';
import { siteConfig } from '@/lib/siteConfig';
import { cn } from '@/lib/utils';
import blurDataMap from '@/public/images/blurDataURL.json';

const HeroStats = dynamic(() => import('@/components/sections/hero-stats'), {
  ssr: false,
});

// Inline typing component to prevent layout shift and remove unnecessary dynamic import
function HeroTyping({ typingWords }: { typingWords?: string[] }) {
  const typingRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    if (!typingWords || typingWords.length === 0) return;
    const handleTyping = () => {
      const current = loopNum % typingWords.length;
      const fullText = typingWords[current];
      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );
      setTypingSpeed(isDeleting ? 50 : 100);
      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, typingWords]);

  return (
    <span className="block text-primary">
      <span className="inline-block min-h-[1.2em]" ref={typingRef}>
        {displayText}
        <span className="typing-cursor" />
      </span>
    </span>
  );
}

export type HeroSectionProps = z.infer<typeof heroSectionDataSchema> & {
  variant?: 'imageLeft' | 'imageRight' | 'centered';
  // Optional per-section background pattern overrides
  patternStyle?: string;
  patternOpacity?: number;
  patternFade?: 'none' | 'edges' | 'vertical' | 'top' | 'bottom';
  patternColor?: string;
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
  patternStyle,
  patternOpacity,
  patternFade,
  patternColor,
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

  // Get hero style from siteConfig
  const heroStyle = siteConfig.theme.sectionStyles?.heroStyle || 'gradient';

  // Get header configuration to add extra padding if transparent mode is enabled
  const headerConfig = siteConfig.theme.headerConfig;
  const isTransparentHeader = headerConfig?.transparentMode ?? false;
  const heroTopPadding = headerConfig?.heroTopPadding ?? 'pt-20 md:pt-24 lg:pt-28';

  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Hero Section - Transparent Header:', {
      isTransparentHeader,
      heroTopPadding,
      headerConfig,
    });
  }

  // Determine raw pattern and opacity override
  const rawPatternStyle = patternStyle ?? siteConfig.theme.visualStyle?.patternStyle;
  const usedOpacity = patternOpacity ?? siteConfig.theme.visualStyle?.patternOpacity;

  return (
    <Section
      id="hero-section"
      aria-labelledby="hero-section-heading"
      bgClass={siteConfig.sectionStyles?.heroGradient ?? ''}
      patternStyle={rawPatternStyle}
      patternOpacity={usedOpacity}
      patternFade={patternFade}
      patternColor={patternColor}
      className={cn(
        'relative md:min-h-[800px] flex items-center',
        isTransparentHeader && heroTopPadding
      )}
    >
      {/* BackgroundPattern now handled by Section */}

      {/* Enhanced gradient overlay with primary brand color - bottom left to top right fade (stronger) */}

      {/* Floating elements for visual interest - contained within viewport */}

      <div className="grid lg:grid-cols-2 items-center gap-8 sm:gap-8 md:gap-10 lg:gap-8 w-full">
        {/* Removed parent LazySection to prevent delay compounding */}
        <div className={`${contentOrderClass} flex flex-col justify-center space-y-2 z-10`}>
          {badgeText && (
            <LazySection delay={0.1}>
              <div className="flex justify-center md:justify-start w-full">
                <Badge variant="dark" className="w-fit text-white">
                  {badgeText}
                </Badge>
              </div>
            </LazySection>
          )}
          {headline && (
            <LazySection delay={0.2}>
              <h1
                id="hero-section-heading"
                className="font-bold leading-tight text-balance text-center md:text-left mb-2"
              >
                <span className="block">
                  {headline ===
                  'De juridische partner voor <span class="text-primary">ICT- & softwarebedrijven</span>' ? (
                    <>
                      De juridische partner voor{' '}
                      <span className="text-primary">ICT- & softwarebedrijven</span>
                    </>
                  ) : (
                    headline
                  )}
                </span>
                {/* <HeroTyping typingWords={typingWords} /> */}
              </h1>
            </LazySection>
          )}
          {subheadline && (
            <LazySection delay={0.3}>
              <p className="text-body-lg text-center md:text-left mx-auto md:mx-0 md:pr-14 lg:pr-20">
                {subheadline}
              </p>
            </LazySection>
          )}
          {(primaryCta?.text || secondaryCta?.text) && (
            <LazySection delay={0.4} className="w-full">
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 pt-12 justify-center md:justify-start items-center md:items-start">
                {primaryCta?.text && primaryCta.href && (
                  <Button
                    size="lg"
                    variant="spark"
                    className={`group whitespace-nowrap shrink-0 ${!showSecondaryCta || !secondaryCta?.text ? 'flex w-full sm:w-auto' : ''}`}
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
                    className="bg-transparent text-primary hover:text-primary80 hover:bg-transparent whitespace-nowrap shrink-0"
                    asChild
                  >
                    <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
                  </Button>
                )}
              </div>
            </LazySection>
          )}
          {showHelpedStats && (
            <LazySection delay={0.5}>
              <div className="flex justify-center md:justify-start w-full">
                <div className="flex items-center space-x-3 mt-0 md:mt-6 text-sm">
                  <div className="flex items-center justify-center size-10 rounded-full bg-primary/10 shrink-0">
                    <svg
                      className="size-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.236 4.53L8.32 10.29a.75.75 0 1 0-1.14.96l2.253 2.677a.75.75 0 0 0 1.177-.02l3.846-5.384Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="text-neutral-text">
                    <span className="font-semibold">Geen verplichtingen</span>
                    <span className="mx-2">•</span>
                    <span className="text-neutral-text">Gratis kennismaken</span>
                  </div>
                </div>
              </div>
            </LazySection>
          )}
        </div>

        <LazySection
          delay={0.1}
          className={`relative w-full self-center ${
            variant === 'imageLeft' ? 'md:order-1 lg:ml-0 lg:mr-auto' : 'lg:ml-auto lg:mr-0'
          }`}
        >
          {/* ✅ ENHANCED: Fixed height container with object-cover for better cropping */}
          <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl md:translate-y-6 transition-all">
            <OptimizedImage
              src={imageToDisplay}
              alt={imageAltText}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="absolute inset-0 scale-125 md:scale-110 origin-bottom-right"
              objectFit="cover"
              priority
              placeholder="blur"
              blurDataURL={blurDataMap[imageToDisplay as keyof typeof blurDataMap]}
              onError={() => setCurrentImageSrc(defaultImageSrc)}
            />
            {/* Enhanced gradient overlay with darker shadow for better text visibility */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-6 z-10">
              <p className="text-white font-medium">Maarten van Beek, Oprichter VirtualCounsel</p>
              <p className="text-white/90 text-sm">ICT-jurist met jarenlange ervaring</p>
            </div>
            {showOverlayStat && overlayTitle && overlayValue && (
              <div className="hidden md:block absolute -bottom-6 -left-6 h-24 w-2/3 rounded-xl p-4 shadow-lg z-10 bg-primary">
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
                    >
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                  </div>
                  <div className="text-white">
                    <p className="text-overlay-title m-0">{overlayTitle}</p>
                    <p className="text-overlay-value m-0">{overlayValue}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </LazySection>
      </div>

      {siteConfig.features.enableHeroStats && <HeroStats stats={stats} />}

      {/* soft left-only bottom shadow (20% width gradient) */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-1/5 h-1 bg-gradient-to-r from-black/10 to-transparent pointer-events-none"
      />
    </Section>
  );
}
