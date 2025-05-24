import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { z } from 'zod';

import ContentBlockRenderer from '@/components/content-blocks/ContentBlockRenderer';
import FormBlock from '@/components/content-blocks/FormBlock';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LazySection from '@/components/ui/lazy-section';
import { DEFAULT_PLACEHOLDER_IMAGE } from '@/lib/constants';
import type { resourceSchema } from '@/lib/schemas/contentBlocks.schema';
import { siteConfig } from '@/lib/site.config.local';

interface ResourceDetailSectionProps {
  resource: z.infer<typeof resourceSchema>;
  // Optional per-section background pattern overrides
  patternStyle?: string;
  patternOpacity?: number;
  patternFade?: 'none' | 'edges' | 'top' | 'bottom';
  patternColor?: string;
}

export default function ResourceDetailSection({
  resource,
  patternStyle,
  patternOpacity,
  patternFade,
  patternColor,
}: ResourceDetailSectionProps) {
  // Enhanced form configuration - configurable through resource data
  const downloadFormConfig = {
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Full Name',
        placeholder: 'Your full name',
        required: true,
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'your@email.com',
        required: true,
      },
    ],
    submitButtonText: 'Download Your Free Resource',
  };

  // Hero image variables with proper fallback
  const imgSrc = resource.heroImage?.src || DEFAULT_PLACEHOLDER_IMAGE;
  const imgAlt = resource.heroImage?.alt || `${resource.title} preview image`;
  const imgWidth = resource.heroImage?.width || 700;
  const imgHeight = resource.heroImage?.height || 1000;

  // Professional outcomes list - fallback to placeholder content
  const benefits: string[] = [
    'Structured methodology for evidence-based implementation',
    'Professional frameworks developed through field research',
    'Assessment tools and outcome measurement strategies',
  ];

  return (
    <Section
      id={`resource-${resource.slug}-detail`}
      patternStyle={patternStyle}
      patternOpacity={patternOpacity}
      patternFade={patternFade}
      patternColor={patternColor}
      bgClass={siteConfig.sectionStyles?.heroGradient ?? ''}
      className="relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="hidden sm:block absolute top-0 left-1/4 size-72 bg-secondary/5 rounded-full -translate-y-1/2 blur-3xl pointer-events-none opacity-70" />
      <div className="hidden sm:block absolute bottom-0 right-1/4 size-72 bg-primary/5 rounded-full translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Enhanced Hero Area with staggered animations */}
        <LazySection
          animation="none"
          className="stagger-container grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-12 md:mb-20"
          style={{ '--stagger-delay': '0.1s' } as CSSProperties}
        >
          {/* Content Column */}
          <div className="text-center md:text-left" style={{ '--index': 0 } as CSSProperties}>
            {/* Resource type badge */}
            {resource.resourceType && (
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                {resource.resourceType.charAt(0).toUpperCase() + resource.resourceType.slice(1)}
              </Badge>
            )}

            <h1 className="text-heading mb-4 text-balance">{resource.title}</h1>

            {resource.subtitle && (
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed max-w-xl">
                {resource.subtitle}
              </p>
            )}

            {/* Professional outcomes section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-foreground">Professional Outcomes</h3>
              <ul className="space-y-4 text-left">
                {benefits.map(benefit => (
                  <li key={benefit.slice(0, 20)} className="flex items-start gap-3 group">
                    <CheckCircle className="size-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-foreground/90 leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Image & Form Column */}
          <div
            className="flex flex-col items-center space-y-6"
            style={{ '--index': 1 } as CSSProperties}
          >
            {/* Enhanced resource preview */}
            <div className="w-full max-w-md group">
              <div className="relative overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-white to-neutral-50 p-2 transition-all duration-500 group-hover:shadow-3xl group-hover:-translate-y-2">
                <Image
                  src={imgSrc}
                  alt={imgAlt}
                  width={imgWidth}
                  height={imgHeight}
                  className="w-full h-auto object-contain rounded-lg"
                  priority
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-xl pointer-events-none" />
              </div>
            </div>

            {/* Enhanced download form card */}
            <Card className="w-full max-w-md shadow-xl border-0 bg-gradient-to-br from-white to-neutral-50/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-semibold text-foreground">
                  Access This Professional Resource
                </CardTitle>
                <p className="text-sm text-foreground/70 mt-2">
                  Complete the form below to receive your copy
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <FormBlock config={downloadFormConfig} />
              </CardContent>
            </Card>
          </div>
        </LazySection>

        {/* Product Overview Section */}
        <LazySection
          animation="none"
          className="stagger-container mb-16 md:mb-20"
          style={{ '--stagger-delay': '0.1s' } as CSSProperties}
        >
          <div className="max-w-4xl mx-auto text-center" style={{ '--index': 0 } as CSSProperties}>
            <h2 className="text-3xl font-bold mb-6 text-foreground">Resource Overview</h2>
            <div className="prose prose-lg mx-auto text-foreground/80">
              <p className="text-lg leading-relaxed mb-6">
                Professional development resource covering specific methodology, theoretical
                framework, and practical applications. Designed to support evidence-based practice
                and enhance professional competency in this specialized area.
              </p>
              <p className="leading-relaxed">
                Developed through comprehensive research and field testing, this resource provides
                structured guidance, assessment tools, and implementation strategies. Includes case
                study examples and professional references to support continued learning.
              </p>
            </div>
          </div>
        </LazySection>

        {/* Who This Is For Section */}
        <LazySection
          animation="none"
          className="stagger-container bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-8 md:p-12 mb-16 md:mb-20"
          style={{ '--stagger-delay': '0.1s' } as CSSProperties}
        >
          <div className="max-w-4xl mx-auto" style={{ '--index': 0 } as CSSProperties}>
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
              Who This Resource Serves
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  Designed for professionals who:
                </h3>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-primary shrink-0 mt-0.5" />
                    <span>Professional context or challenge that describes ideal reader</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-primary shrink-0 mt-0.5" />
                    <span>Specific expertise level or professional development goal</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-primary shrink-0 mt-0.5" />
                    <span>Commitment to implementing evidence-based approaches</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground/70">
                  Consider other resources if you:
                </h3>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-start gap-3">
                    <span className="size-4 text-foreground/40 shrink-0 mt-1">•</span>
                    <span>Professional context where this approach may not be applicable</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="size-4 text-foreground/40 shrink-0 mt-1">•</span>
                    <span>
                      Experience level that might benefit from foundational resources first
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="size-4 text-foreground/40 shrink-0 mt-1">•</span>
                    <span>Specific field or methodology that requires different approaches</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </LazySection>

        {/* Preview/Contents Section */}
        <LazySection
          animation="none"
          className="stagger-container mb-16 md:mb-20"
          style={{ '--stagger-delay': '0.1s' } as CSSProperties}
        >
          <div className="max-w-4xl mx-auto" style={{ '--index': 0 } as CSSProperties}>
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground">What's Inside</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    Chapter/Section 1 Title
                  </h3>
                  <p className="text-foreground/70">
                    Brief description of what this section covers and the key insights or tools
                    provided.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    Chapter/Section 2 Title
                  </h3>
                  <p className="text-foreground/70">
                    Description of the framework, strategy, or methodology explained in this
                    section.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    Chapter/Section 3 Title
                  </h3>
                  <p className="text-foreground/70">
                    Overview of actionable steps, templates, or checklists included here.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Bonus Materials</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-foreground/80">
                      <CheckCircle className="size-5 text-primary shrink-0" />
                      <span>Downloadable template or worksheet description</span>
                    </li>
                    <li className="flex items-center gap-3 text-foreground/80">
                      <CheckCircle className="size-5 text-primary shrink-0" />
                      <span>Quick reference guide or cheat sheet</span>
                    </li>
                    <li className="flex items-center gap-3 text-foreground/80">
                      <CheckCircle className="size-5 text-primary shrink-0" />
                      <span>Additional resource or tool recommendation</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center p-6 bg-neutral-50 rounded-xl">
                  <div className="text-2xl font-bold text-primary mb-2">X Pages</div>
                  <div className="text-sm text-foreground/70">Total content length</div>
                  <div className="text-2xl font-bold text-primary mb-2 mt-4">X Minutes</div>
                  <div className="text-sm text-foreground/70">Estimated reading time</div>
                </div>
              </div>
            </div>
          </div>
        </LazySection>

        {/* Professional Validation Section */}
        <LazySection
          animation="none"
          className="stagger-container bg-gradient-to-r from-neutral-50/50 to-white rounded-2xl p-8 md:p-12 mb-16 md:mb-20"
          style={{ '--stagger-delay': '0.1s' } as CSSProperties}
        >
          <div className="max-w-4xl mx-auto text-center" style={{ '--index': 0 } as CSSProperties}>
            <h2 className="text-3xl font-bold mb-8 text-foreground">
              Trusted by Professional Communities
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-semibold text-primary mb-2">XX+ Years</div>
                <div className="text-sm text-foreground/70">Combined expertise</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-primary mb-2">Evidence-Based</div>
                <div className="text-sm text-foreground/70">Methodology</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-primary mb-2">Peer-Reviewed</div>
                <div className="text-sm text-foreground/70">Approach</div>
              </div>
            </div>
            <blockquote className="text-lg text-foreground/80 max-w-2xl mx-auto border-l-4 border-primary pl-6">
              "Professional testimonial highlighting how this resource enhanced their practice
              methodology and client outcomes. Should reflect authentic professional development
              rather than dramatic claims."
            </blockquote>
            <div className="mt-4 text-foreground/60">
              — Professional Name, Credentials, Field of Practice
            </div>
          </div>
        </LazySection>

        {/* Enhanced Content Blocks */}
        {resource.sections && resource.sections.length > 0 && (
          <LazySection
            animation="none"
            className="stagger-container space-y-12"
            style={{ '--stagger-delay': '0.15s' } as CSSProperties}
          >
            {resource.sections
              .filter(block => block.type !== 'image')
              .map((block, i) => (
                <div key={`${block.type}-${i}`} style={{ '--index': i } as CSSProperties}>
                  <ContentBlockRenderer block={block} />
                </div>
              ))}
          </LazySection>
        )}
      </div>
    </Section>
  );
}
