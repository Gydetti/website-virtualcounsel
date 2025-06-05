'use client';

import { ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import LazySection from '@/components/ui/lazy-section';
import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import { DEFAULT_PLACEHOLDER_IMAGE } from '@/lib/constants';
import { iconComponents } from '@/lib/icon-utils';
import { cn } from '@/lib/utils';

interface ServiceHeroSectionProps {
  title: string;
  description: string;
  targetAudience: string[];
  icon: string;
  slug: string;
  trustIndicators?: string[];
  heroImage?: {
    src: string;
    alt: string;
  };
}

export default function ServiceHeroSection({
  title,
  description,
  targetAudience,
  icon,
  slug,
  trustIndicators = ['Vaste prijzen', 'Snelle levering', 'Tech expertise'],
  heroImage,
}: ServiceHeroSectionProps) {
  const { getBorderRadiusClass } = useThemeBorderRadius();
  const IconComponent = iconComponents[icon] || iconComponents.Globe;

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <LazySection animation="slide-up" delay={0}>
          <div className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-4">
            <IconComponent className="size-5" />
            <span>Specialistische Dienst</span>
          </div>
        </LazySection>

        <LazySection animation="fade-up" delay={0.1}>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{title}</h1>
        </LazySection>

        <LazySection animation="fade-up" delay={0.2}>
          <p className="text-lg text-neutral-text leading-relaxed mb-6">{description}</p>
        </LazySection>

        <LazySection animation="fade-up" delay={0.3}>
          <div className="space-y-3 mb-8">
            <p className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Voor wie is dit bedoeld?
            </p>
            <div className="space-y-2">
              {targetAudience.map(audience => (
                <div
                  key={`audience-${audience.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`}
                  className="flex items-start gap-2"
                >
                  <CheckCircle className="size-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-neutral-text">{audience}</span>
                </div>
              ))}
            </div>
          </div>
        </LazySection>

        <LazySection animation="fade-up" delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button size="lg" className="bg-primary hover:bg-primary90" asChild>
              <Link href="/contact">
                Maak een afspraak
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#hoe-werkt-het">Hoe werkt het?</Link>
            </Button>
          </div>
        </LazySection>

        <LazySection animation="fade-up" delay={0.5}>
          <div className="flex flex-wrap gap-4 text-sm text-neutral-text">
            {trustIndicators.map(indicator => (
              <span
                key={`trust-${indicator.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`}
                className="flex items-center gap-2"
              >
                <CheckCircle className="size-4 text-primary" />
                {indicator}
              </span>
            ))}
          </div>
        </LazySection>
      </div>

      <LazySection animation="fade" delay={0.6} className="relative">
        <div
          className={cn(
            'relative h-[500px] overflow-hidden shadow-2xl',
            getBorderRadiusClass('section')
          )}
        >
          <Image
            src={heroImage?.src || DEFAULT_PLACEHOLDER_IMAGE}
            alt={heroImage?.alt || `${title} illustratie`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="size-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent flex items-end p-8">
            <div className={cn('bg-white/95 backdrop-blur p-6', getBorderRadiusClass('card'))}>
              <IconComponent className="size-12 text-primary mb-3" />
              <p className="text-sm font-medium text-foreground">
                Gespecialiseerd in {title.toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      </LazySection>
    </div>
  );
}
