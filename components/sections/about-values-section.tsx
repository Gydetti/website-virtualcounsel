'use client';

import { Award, CheckCircle, Heart, Lightbulb, Target, Users } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import LazySection from '@/components/ui/lazy-section';
import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import type { aboutValuesSectionDataSchema } from '@/lib/schemas/sections.schema';

export type AboutValuesSectionProps = z.infer<typeof aboutValuesSectionDataSchema>;

// Map values to appropriate icons based on content
const getValueIcon = (value: string, index: number) => {
  const lowerValue = value.toLowerCase();

  if (lowerValue.includes('tech-first') || lowerValue.includes('innovatie')) return Lightbulb;
  if (lowerValue.includes('transparantie') || lowerValue.includes('vaste prijzen'))
    return CheckCircle;
  if (lowerValue.includes('pragmatisme') || lowerValue.includes('praktijk')) return Target;
  if (lowerValue.includes('toegankelijkheid') || lowerValue.includes('direct contact'))
    return Users;
  if (lowerValue.includes('kwaliteit') || lowerValue.includes('specialist')) return Award;
  if (lowerValue.includes('betrouwbaar') || lowerValue.includes('partner')) return Heart;

  // Fallback icons based on index
  const icons = [CheckCircle, Target, Award, Heart, Users, Lightbulb];
  return icons[index % icons.length];
};

// Extract title from value text (before the colon)
const getValueTitle = (value: string) => {
  const colonIndex = value.indexOf(':');
  return colonIndex > 0 ? value.substring(0, colonIndex).trim() : value.split('.')[0].trim();
};

// Extract description from value text (after the colon)
const getValueDescription = (value: string) => {
  const colonIndex = value.indexOf(':');
  return colonIndex > 0 ? value.substring(colonIndex + 1).trim() : value;
};

export default function AboutValuesSection({
  badgeText,
  heading,
  values,
}: AboutValuesSectionProps) {
  const { getElementBorderRadius } = useThemeBorderRadius();

  return (
    <Section id="about-values" className="py-16">
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
      </div>

      {/* Values Grid */}
      <LazySection
        childrenStagger={true}
        delay={0.3}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        style={{ '--stagger-delay': '0.1s' } as CSSProperties}
      >
        {values.map((value, index) => {
          const IconComponent = getValueIcon(value, index);
          const title = getValueTitle(value);
          const description = getValueDescription(value);

          return (
            <div key={title} className="h-full" style={{ '--index': index } as CSSProperties}>
              <div
                className={`bg-neutral-surface border ${getElementBorderRadius('section')} p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full flex flex-col`}
              >
                {/* Icon and Title */}
                <div className="mb-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 mb-3">
                    <IconComponent className="size-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-text mb-2">{title}</h3>
                </div>

                {/* Description */}
                <div className="flex-1">
                  <p className="text-neutral-text leading-relaxed">{description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </LazySection>
    </Section>
  );
}
