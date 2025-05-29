'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useLayoutEffect, useRef } from 'react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import StructuredData from '@/components/seo/structured-data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import LazySection from '@/components/ui/lazy-section';
import type { ctaSchema } from '@/lib/schemas/common.schema';
import { siteConfig } from '@/lib/siteConfig';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  category: string;
  questions: FaqItem[];
}

export interface HomepageFaqSectionProps {
  badgeText?: string;
  heading?: string;
  description?: string;
  categories: FaqCategory[];
  cta?: z.infer<typeof ctaSchema>;
}

export default function HomepageFaqSection({
  badgeText = 'Frequently asked questions',
  heading = 'Invite users to explore common questions',
  description,
  categories,
  cta = { text: 'See all FAQs', href: '/contact' },
}: HomepageFaqSectionProps) {
  // Prepare JSON-LD items for structured-data
  const faqSchema = categories.flatMap(cat =>
    cat.questions.map(q => ({ question: q.question, answer: q.answer }))
  );

  // Calculate max collapsed height and apply to all FAQ cards
  const containerRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const items = Array.from(containerRef.current.querySelectorAll<HTMLDivElement>('.faq-item'));
    if (items.length === 0) return;
    const heights = items.map(item => item.getBoundingClientRect().height);
    const max = Math.max(...heights);
    for (const item of items) {
      item.style.minHeight = `${max}px`;
    }
  }, []);

  return (
    <>
      <StructuredData type="faq" data={{ items: faqSchema }} />
      <Section id="faq-homepage">
        {/* Header: badge, title, description */}
        <LazySection
          animation="none"
          className="stagger-container text-center"
          style={{ '--stagger-delay': '0.1s' } as CSSProperties}
        >
          <Badge className="mb-4" style={{ '--index': 0 } as React.CSSProperties}>
            {badgeText}
          </Badge>
          <h2 className="mb-12" style={{ '--index': 1 } as React.CSSProperties}>
            {heading}
          </h2>
          {description && (
            <p
              className="text-foreground mb-8 max-w-2xl mx-auto"
              style={{ '--index': 2 } as React.CSSProperties}
            >
              {description}
            </p>
          )}
        </LazySection>
        {/* FAQ items: responsive grid that centers content when fewer categories */}
        <div
          ref={containerRef}
          className={`grid gap-8 text-left max-w-5xl mx-auto ${
            categories.length === 1
              ? 'grid-cols-1 max-w-3xl'
              : categories.length === 2
                ? 'grid-cols-1 md:grid-cols-2 max-w-4xl'
                : 'grid-cols-1 md:grid-cols-3'
          }`}
        >
          {categories.map((cat, idx) => (
            <LazySection
              key={cat.category}
              animation="fade-up"
              delay={0.1 * idx}
              className="text-center"
            >
              {/* Category badge with solid background and strong shadow effect */}
              <div className="inline-flex items-center px-3 py-1 mb-6 bg-neutral-surface border border-divider rounded-full shadow-md">
                <h3 className="text-sm font-medium text-neutral-text">{cat.category}</h3>
              </div>
              <Accordion
                type="single"
                collapsible
                style={{ display: 'grid', gap: '1rem' } as CSSProperties}
              >
                {cat.questions.map((q, qIdx) => (
                  <AccordionItem
                    key={q.question}
                    value={`faq-${cat.category}-${q.question}`}
                    className="border border-divider rounded-lg overflow-hidden flex flex-col faq-item transition-all shadow-sm hover:shadow-md"
                  >
                    <AccordionTrigger className="flex items-center justify-between w-full px-6 py-4 text-body-base text-neutral-text font-medium text-left bg-neutral-surface hover:bg-neutral-surface/80 ">
                      {q.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 text-base text-neutral-text bg-neutral-surface/90 border-t border-divider/50">
                      {q.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </LazySection>
          ))}
        </div>
        {/* CTA button */}
        {siteConfig.features.enableHomepageFaqCta && (
          <LazySection
            animation="none"
            className="stagger-container text-center"
            style={{ '--stagger-delay': '0.2s' } as CSSProperties}
          >
            <div className="flex justify-center mt-12" style={{ '--index': 0 } as CSSProperties}>
              <Button size="lg" asChild>
                <Link href={cta.href || '/contact'}>{cta.text || 'See all FAQs'}</Link>
              </Button>
            </div>
          </LazySection>
        )}
      </Section>
    </>
  );
}
