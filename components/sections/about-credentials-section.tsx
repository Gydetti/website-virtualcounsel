'use client';

import { motion } from 'framer-motion';
import { Award, Book, Star } from 'lucide-react';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { z } from 'zod';

import type { SectionProps } from '@/components/layout/Section';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import LazySection from '@/components/ui/lazy-section';
import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import type { aboutCredentialsSectionDataSchema } from '@/lib/schemas/sections.schema';

export type AboutCredentialsSectionProps = z.infer<typeof aboutCredentialsSectionDataSchema> & {
  patternStyle?: string;
  patternOpacity?: number;
  patternFade?: SectionProps['patternFade'];
  patternColor?: string;
};

const iconMap = {
  award: Award,
  book: Book,
  star: Star,
  certificate: Award,
};

export default function AboutCredentialsSection({
  badgeText,
  heading,
  subtitle,
  credentials,
  cta,
  patternStyle,
  patternOpacity,
  patternFade,
  patternColor,
}: AboutCredentialsSectionProps) {
  const { getElementBorderRadius } = useThemeBorderRadius();

  return (
    <Section
      id="about-credentials"
      patternStyle={patternStyle}
      patternOpacity={patternOpacity}
      patternFade={patternFade}
      patternColor={patternColor}
      className="relative z-10"
    >
      {/* Header */}
      <div className="text-center mb-16">
        {badgeText && (
          <LazySection animation="fade-up" delay={0.1}>
            <Badge className="mb-4">{badgeText}</Badge>
          </LazySection>
        )}
        {heading && (
          <LazySection animation="fade-up" delay={0.2}>
            <h2 className="text-heading mb-4">{heading}</h2>
          </LazySection>
        )}
        {subtitle && (
          <LazySection animation="fade-up" delay={0.3}>
            <p className="text-lg text-neutral-text max-w-3xl mx-auto">{subtitle}</p>
          </LazySection>
        )}
      </div>

      {/* Credentials Grid */}
      <LazySection
        animation="none"
        className="stagger-container grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 items-stretch"
        style={{ '--stagger-delay': '0.1s' } as CSSProperties}
      >
        {credentials.map((credential, index) => {
          const IconComponent = iconMap[credential.icon as keyof typeof iconMap] || Award;

          return (
            <div
              key={credential.id}
              className="h-full"
              style={{ '--index': index } as CSSProperties}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-neutral-surface border ${getElementBorderRadius('section')} p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full flex flex-col`}
              >
                {/* Icon and Type */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                    <IconComponent className="size-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-primary uppercase tracking-wide">
                    {credential.type}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-neutral-text mb-2">
                    {credential.title}
                  </h3>
                  <div className="text-neutral-text text-base mb-3">
                    {credential.issuer} • {credential.year}
                  </div>
                  <p className="text-neutral-text leading-relaxed">{credential.description}</p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </LazySection>

      {/* CTA */}
      {cta && (
        <LazySection animation="fade-up" delay={0.7}>
          <div className="text-center">
            <Button size="lg" variant="default" asChild>
              <Link href={cta.href}>{cta.text}</Link>
            </Button>
          </div>
        </LazySection>
      )}
    </Section>
  );
}
