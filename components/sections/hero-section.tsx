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
import blurDataMap from '@/lib/blurDataURL.json';
import type { heroSectionDataSchema } from '@/lib/schemas/sections.schema';
import { siteConfig } from '@/lib/siteConfig';

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
    <span className="block mt-3 md:mt-3 lg:mt-4 text-primary">
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
      className="relative md:min-h-[880px] flex"
    >
      {/* BackgroundPattern now handled by Section */}

      {/* Floating elements for visual interest */}
      {/* <div className="hidden sm:block absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
			<div className="hidden sm:block absolute bottom-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" /> */}

      <div className="grid lg:grid-cols-2 items-center gap-8 sm:gap-8 md:gap-10 lg:gap-10">
        {/* Removed parent LazySection to prevent delay compounding */}
        <div className={`${contentOrderClass} flex flex-col justify-center space-y-6 z-10`}>
          {badgeText && (
            <LazySection delay={0.1}>
              <Badge variant="dark" className="w-fit text-white">
                {badgeText}
              </Badge>
            </LazySection>
          )}
          {headline && (
            <LazySection delay={0.2}>
              <h1 id="hero-section-heading" className="font-bold leading-tight text-balance text-center">
                <span className="block">{headline}</span>
                <HeroTyping typingWords={typingWords} />
              </h1>
            </LazySection>
          )}
          {subheadline && (
            <LazySection delay={0.3}>
              <p className="text-body-lg text-center max-w-lg mx-auto">{subheadline}</p>
            </LazySection>
          )}
          {(primaryCta?.text || secondaryCta?.text) && (
            <LazySection delay={0.4} className="">
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 pt-4 justify-center">
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
              <div className="flex justify-center">
                <div className="flex space-x-4 mt-6 text-sm text-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className="inline-block size-8 rounded-full ring-2 ring-white overflow-hidden bg-neutral-background/200"
                      >
                        <Image
                          src="/images/placeholders/placeholder.svg"
                          alt="User avatar"
                          width={32}
                          height={32}
                          className="size-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-neutral-text">
                    <span className="font-medium">100+</span> statistic that helps build authority
                  </div>
                </div>
              </div>
            </LazySection>
          )}
        </div>

        <LazySection
          delay={0.1}
          className={`relative w-full max-w-[600px] self-center mx-auto ${
            variant === 'imageLeft' ? 'md:order-1 lg:ml-0 lg:mr-auto' : 'lg:ml-auto lg:mr-0'
          }`}
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
          </AspectRatio>
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
