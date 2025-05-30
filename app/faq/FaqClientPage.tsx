'use client';

import { DEFAULT_PLACEHOLDER_IMAGE } from '@/lib/constants';

import { useState } from 'react';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import StructuredData from '@/components/seo/structured-data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LazySection from '@/components/ui/lazy-section';
import { staticContent } from '@/lib/data/staticContent';
import type { CSSProperties } from 'react';
import { Section } from '@/components/layout/Section';
import { siteConfig } from '@/lib/siteConfig';
import { cn } from '@/lib/utils';

export default function FaqClientPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Load FAQ categories from staticContent
  const faqCategories = staticContent.faqCategories;

  // Prepare FAQ structured-data for SEO
  const faqSchemaData = faqCategories
    .flatMap(category => category.questions)
    .map(({ question, answer }) => ({ question, answer }));

  // Filter questions based on search query
  const filteredFaqs = searchQuery
    ? faqCategories
        .map(category => ({
          ...category,
          questions: category.questions.filter(
            q =>
              q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.answer.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter(category => category.questions.length > 0)
    : faqCategories;

  // Get header configuration to add extra padding if transparent mode is enabled
  const headerConfig = siteConfig.theme.headerConfig;
  const isTransparentHeader = headerConfig?.transparentMode ?? false;
  const heroTopPadding = headerConfig?.heroTopPadding ?? 'pt-20 md:pt-24 lg:pt-28';

  return (
    <>
      <StructuredData type="faq" data={{ items: faqSchemaData }} />
      <Section
        bgClass={siteConfig.sectionStyles?.heroGradient ?? ''}
        className={cn('relative z-10', isTransparentHeader && heroTopPadding)}
      >
        <LazySection
          animation="none"
          className="stagger-container text-center max-w-3xl mx-auto"
          style={{ '--stagger-delay': '0.1s' } as CSSProperties}
        >
          <Badge className="mb-4" style={{ '--index': 0 } as CSSProperties}>
            {staticContent.faqSection.badge}
          </Badge>
          <h1 style={{ '--index': 1 } as CSSProperties}>{staticContent.faqSection.title}</h1>
          <p className="text-neutral-text mb-8" style={{ '--index': 2 } as CSSProperties}>
            {staticContent.faqSection.subtitle}
          </p>
          <div className="relative max-w-xl mx-auto" style={{ '--index': 3 } as CSSProperties}>
            <Input
              autoComplete="off"
              type="text"
              placeholder={staticContent.faqSection.searchPlaceholder}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent pl-10"
            />
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-text/400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </LazySection>
      </Section>

      <LazySection>
        <section className="py-16">
          <div className="container-wide">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((category, idx) => (
                <LazySection key={category.category} delay={idx * 0.1}>
                  <div className="mb-12">
                    <h2 className="text-[1.625rem] md:text-[2rem] font-semibold mb-6">
                      {category.category}
                    </h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.questions.map(faq => (
                        <AccordionItem
                          key={faq.question}
                          value={`${/* replaced index-based value */ ''}`}
                          className="border border-divider rounded-lg overflow-hidden"
                        >
                          <AccordionTrigger className="px-6 py-4 text-body-base text-neutral-text font-medium hover:bg-neutral-background text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="px-6 py-4 text-body-base bg-neutral-background text-neutral-text">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </LazySection>
              ))
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">No results found</h2>
                <p className="text-neutral-text/600 mb-8">
                  We couldn't find any FAQs matching your search. Please try a different search term
                  or browse our categories.
                </p>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </section>
      </LazySection>

      <LazySection>
        <section className="py-16 bg-neutral-background">
          <div className="container-wide text-center">
            <h2 className="text-3xl font-bold mb-6">
              {staticContent.faqSection.assistance.heading}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {staticContent.faqSection.assistance.prompt}
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary90" asChild>
              <Link href="/contact">
                {staticContent.faqSection.assistance.buttonLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </LazySection>
    </>
  );
}
