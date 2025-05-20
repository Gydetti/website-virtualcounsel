import type { CSSProperties } from 'react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import LazySection from '@/components/ui/lazy-section';
import OptimizedImage from '@/components/ui/optimized-image';
import type { aboutSocialProofSectionDataSchema } from '@/lib/schemas/sections.schema';

export type AboutSocialProofSectionProps = z.infer<typeof aboutSocialProofSectionDataSchema>;

export default function AboutSocialProofSection({
  badgeText,
  heading,
  socialProof,
}: AboutSocialProofSectionProps) {
  return (
    <Section id="about-social-proof" className="py-12 bg-background">
      <LazySection
        animation="none"
        className="stagger-container max-w-4xl mx-auto text-center"
        style={{ '--stagger-delay': '0.1s' } as CSSProperties}
      >
        {badgeText && (
          <Badge className="mb-4" style={{ '--index': 0 } as CSSProperties}>
            {badgeText}
          </Badge>
        )}
        {heading && (
          <h3 className="section-title mb-6" style={{ '--index': 1 } as CSSProperties}>
            {heading}
          </h3>
        )}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          style={{ '--index': 2 } as CSSProperties}
        >
          {socialProof.map((item, idx) => (
            <div
              key={item.id}
              className="p-6 bg-neutral-surface rounded-lg shadow hover:shadow-md transition-shadow"
              style={{ '--index': 3 + idx } as CSSProperties}
            >
              {item.image?.src && (
                <div className="mb-4 flex justify-center">
                  <OptimizedImage
                    src={item.image.src}
                    alt={item.image.alt || item.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
              )}
              <p className="italic text-foreground mb-4">"{item.quote}"</p>
              <div className="font-semibold text-neutral-text">{item.name}</div>
              {item.title && <div className="text-neutral-text/500 text-sm">{item.title}</div>}
            </div>
          ))}
        </div>
      </LazySection>
    </Section>
  );
}
