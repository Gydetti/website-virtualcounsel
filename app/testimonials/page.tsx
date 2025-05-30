import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import LazySection from '@/components/ui/lazy-section';
import TestimonialCard from '@/components/ui/testimonial-card';
import * as homepageData from '@/lib/data/homepage';
import { defaultMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site.config.local';
import { cn } from '@/lib/utils';

// Generate page metadata
export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    title: `Testimonials | ${siteConfig.site.name}`,
    description: 'Read real success stories and testimonials from our clients',
  });
}

export default function TestimonialsPage() {
  // Guard route by feature flag and enabledPages setting
  if (
    !siteConfig.features.enableTestimonials ||
    (siteConfig.enabledPages && !siteConfig.enabledPages.includes('/testimonials'))
  ) {
    notFound();
  }

  const { badgeText, heading, subtitle, testimonials } = homepageData.testimonialsSectionData;

  // Get header configuration to add extra padding if transparent mode is enabled
  const headerConfig = siteConfig.theme.headerConfig;
  const isTransparentHeader = headerConfig?.transparentMode ?? false;
  const heroTopPadding = headerConfig?.heroTopPadding ?? 'pt-20 md:pt-24 lg:pt-28';

  return (
    <>
      {/* Introduction Section with CSS-only staggered reveal */}
      <Section
        id="testimonials-intro"
        bgClass={siteConfig.sectionStyles?.heroGradient ?? ''}
        className={cn('relative z-10', isTransparentHeader && heroTopPadding)}
      >
        <LazySection
          animation="none"
          className="stagger-container text-center mb-16 max-w-3xl mx-auto"
          style={{ '--stagger-delay': '0.1s' } as CSSProperties}
        >
          {badgeText && (
            <Badge className="mb-4" style={{ '--index': 0 } as CSSProperties}>
              {badgeText}
            </Badge>
          )}
          {heading && <h1 style={{ '--index': 1 } as CSSProperties}>{heading}</h1>}
          {subtitle && (
            <p className="section-subtitle" style={{ '--index': 2 } as CSSProperties}>
              {subtitle}
            </p>
          )}
        </LazySection>
      </Section>

      {/* Testimonials Grid Section */}
      <Section className="bg-neutral-background">
        <LazySection animation="fade-up" delay={0} className="text-center mb-12">
          <Badge className="mb-6">{badgeText}</Badge>
          <h1 className="mb-4">{heading}</h1>
          <p className="text-xl text-neutral-text max-w-3xl mx-auto">{subtitle}</p>
        </LazySection>

        <LazySection
          animation="none"
          className="stagger-container grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
          style={{ '--stagger-delay': '0.15s' } as CSSProperties}
        >
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              className="h-full"
              style={{ '--index': idx } as CSSProperties}
            />
          ))}
        </LazySection>
      </Section>

      {/* CTA Section */}
      <Section className="py-12 bg-neutral-surface" id="testimonials-cta">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to write your own success story?</h2>
          <p className="text-neutral-text/600 mb-6">
            Contact us today to get started and see how we can help you achieve similar results.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Get Your Success Story</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
