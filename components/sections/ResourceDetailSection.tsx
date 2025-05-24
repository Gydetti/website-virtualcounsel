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

  // Dynamic benefits list - fallback to placeholder content
  const benefits: string[] = [
    'Detailed step-by-step guidance for immediate implementation',
    'Expert insights from years of proven experience',
    'Actionable strategies you can apply right away',
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

            {/* Enhanced benefits section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
                <CheckCircle className="size-5 text-primary" />
                What you'll gain
              </h3>
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
                <CardTitle className="text-xl font-semibold text-foreground flex items-center justify-center gap-2">
                  <CheckCircle className="size-5 text-primary" />
                  Get Your Free Resource
                </CardTitle>
                <p className="text-sm text-foreground/70 mt-2">
                  Download this valuable resource instantly
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <FormBlock config={downloadFormConfig} />
              </CardContent>
            </Card>
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
