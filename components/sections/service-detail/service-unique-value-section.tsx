'use client';

import { Award, Star } from 'lucide-react';

import LazySection from '@/components/ui/lazy-section';
import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import { cn } from '@/lib/utils';

interface ServiceUniqueValueSectionProps {
  heading: string;
  uniqueValueStatement: string;
  keyDifferentiators: {
    title: string;
    description: string;
  }[];
  highlight?: string;
}

export default function ServiceUniqueValueSection({
  heading,
  uniqueValueStatement,
  keyDifferentiators,
  highlight,
}: ServiceUniqueValueSectionProps) {
  const { getBorderRadiusClass } = useThemeBorderRadius();

  return (
    <div className="relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <LazySection animation="fade-up" delay={0}>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-4">
              <Award className="size-5" />
              <span>Wat maakt ons uniek</span>
            </div>
          </LazySection>

          <LazySection animation="fade-up" delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{heading}</h2>
          </LazySection>

          <LazySection animation="fade-up" delay={0.2}>
            <p className="text-xl text-neutral-text leading-relaxed mb-8">{uniqueValueStatement}</p>
          </LazySection>

          {highlight && (
            <LazySection animation="fade-up" delay={0.3}>
              <div
                className={cn(
                  'inline-flex items-center gap-3 px-6 py-3 bg-primary/10 text-primary font-medium',
                  getBorderRadiusClass('pill')
                )}
              >
                <Star className="size-5 fill-current" />
                <span>{highlight}</span>
              </div>
            </LazySection>
          )}
        </div>

        <LazySection animation="fade-up" delay={0.4}>
          <div className="grid md:grid-cols-2 gap-6">
            {keyDifferentiators.map(differentiator => (
              <div
                key={`diff-${differentiator.title.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`}
                className={cn(
                  'group relative p-6 bg-white border-2 border-primary/10 hover:border-primary/30 transition-all duration-300',
                  getBorderRadiusClass('card')
                )}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Award className="size-16 text-primary" />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-3 relative z-10">
                  {differentiator.title}
                </h3>
                <p className="text-neutral-text relative z-10">{differentiator.description}</p>
              </div>
            ))}
          </div>
        </LazySection>
      </div>
    </div>
  );
}
