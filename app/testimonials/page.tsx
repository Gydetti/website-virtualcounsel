import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import LazySection from '@/components/ui/lazy-section';
import TestimonialCard from '@/components/ui/testimonial-card';
import * as homepageData from '@/lib/data/homepage';
import { defaultMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site.config.local';

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

  return (
    <>
      {/* Introduction Section with CSS-only staggered reveal */}
      <Section
        id="testimonials-intro"
        bgClass={siteConfig.sectionStyles?.heroGradient ?? ''}
        className="relative z-10 py-12"
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
      <Section className="py-12 bg-neutral-background" id="testimonials-list">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <LazySection
              key={t.id}
              animation="slide-up"
              delay={idx * 0.1}
              fullHeight
              className="h-full"
            >
              <TestimonialCard
                quote={t.quote}
                name={t.name}
                title={t.title}
                image={t.image.src}
                rating={t.rating}
              />
            </LazySection>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-12 bg-neutral-surface" id="testimonials-cta">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to write your own success story?</h2>
          <p className="text-neutral-text/600 mb-6">
            Contact us today to get started and see how we can help you achieve similar results.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary90 transition"
          >
            Contact Us
          </Link>
        </div>
      </Section>
    </>
  );
}
