'use client';

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

  return (
    <>
      <StructuredData type="faq" data={{ items: faqSchemaData }} />
      <section className="relative overflow-hidden bg-gradient-to-r from-brand-primary/10 to-brand-hero-background md:py-24 z-10">
        <LazySection>
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto">
              <Badge className="mb-4 bg-brand-light text-primary hover:bg-brand-light/90">
                {staticContent.faqSection.badge}
              </Badge>
              <h1 className="">{staticContent.faqSection.title}</h1>
              <p className="text-neutral-text mb-8">{staticContent.faqSection.subtitle}</p>

              <div className="relative max-w-xl mx-auto">
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
            </div>
          </div>
        </LazySection>
      </section>

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
                          <AccordionTrigger className="px-6 py-4 text-body-base font-medium hover:bg-neutral-background text-left">
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
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
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
