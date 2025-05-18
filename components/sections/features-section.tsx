'use client';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/ui/optimized-image';
import type { featuresSectionDataSchema } from '@/lib/schemas/sections.schema';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { z } from 'zod';

// Updated props type alias using Zod schema
export type FeaturesSectionProps = z.infer<typeof featuresSectionDataSchema>;

export default function FeaturesSection({
  badgeText,
  heading,
  description,
  comparison,
  cta, // cta is in schema, but rendering is commented out in component
}: FeaturesSectionProps) {
  const withoutTitle = comparison?.without?.title;
  const withoutItems = comparison?.without?.items;
  const withTitle = comparison?.with?.title;
  const withItems = comparison?.with?.items;

  return (
    <Section
      id="features-section"
      aria-labelledby="features-section-heading"
      className="text-neutral-text/800 relative overflow-hidden"
    >
      {/* Ensure decorative elements overlap edges */}
      {/* <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/4 translate-x-1/4 blur-3xl z-0" /> */}

      <div
        className="relative z-10 stagger-container"
        style={{ '--stagger-delay': '0.1s' } as CSSProperties}
      >
        <div className="max-w-3xl mx-auto text-center mb-12">
          {badgeText && (
            <Badge className="mb-4" style={{ '--index': 0 } as CSSProperties}>
              {badgeText}
            </Badge>
          )}
          {heading && (
            <h2
              id="features-section-heading"
              className="section-title text-neutral-text"
              style={{ '--index': 1 } as CSSProperties}
            >
              {heading}
            </h2>
          )}
          {description && (
            <p className="text-foreground" style={{ '--index': 2 } as CSSProperties}>
              {description}
            </p>
          )}
        </div>

        {/* Comparison panels with CSS-only stagger */}
        <div
          className="relative grid md:grid-cols-2 gap-8 md:gap-0 mb-0 stagger-container"
          style={{ '--stagger-delay': '0.2s' } as React.CSSProperties}
        >
          {comparison?.without?.items && comparison.without.items.length > 0 && (
            <div
              className="md:w-4/5 md:mx-auto rounded-lg border border-red-200 bg-feedback-error-bg/50 backdrop-blur p-6 transition-colors text-neutral-text/800"
              style={{ '--index': 0 } as React.CSSProperties}
            >
              {withoutTitle && <h3 className="text-feedback-error mb-4">{withoutTitle}</h3>}
              <ul className="space-y-3">
                {withoutItems?.map(item => (
                  <li key={item} className="flex items-start">
                    <XCircle className="text-feedback-error mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Decorative arrow: CSS-only fade-up */}
          <div
            className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ '--index': 1 } as React.CSSProperties}
          >
            <OptimizedImage
              src="/images/general/1 bend arrow right.svg"
              alt="Arrow indicating transition"
              width={64}
              height={64}
              objectFit="contain"
              className="opacity-90"
            />
          </div>
          {comparison?.with?.items && comparison.with.items.length > 0 && (
            <div
              className="md:w-4/5 md:mx-auto rounded-lg border border-green-200 bg-feedback-success-bg/50 backdrop-blur p-6 transition-colors text-neutral-text/800"
              style={{ '--index': 2 } as React.CSSProperties}
            >
              {withTitle && <h3 className="text-feedback-success mb-4">{withTitle}</h3>}
              <ul className="space-y-3">
                {withItems?.map(item => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="text-feedback-success mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* CTA stagger container */}
      {cta?.href && cta?.text && (
        <div
          className="stagger-container text-center"
          style={{ '--stagger-delay': '0.3s' } as CSSProperties}
        >
          <div style={{ '--index': 0 } as CSSProperties}>
            <Button size="lg" className="group" asChild>
              <Link href={cta.href}>
                {cta.text}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </Section>
  );
}
