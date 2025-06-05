'use client';

import { CheckCircle2, Sparkles } from 'lucide-react';
import type { CSSProperties } from 'react';

import { Card } from '@/components/ui/card';
import LazySection from '@/components/ui/lazy-section';
import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import { iconComponents } from '@/lib/icon-utils';
import { cn } from '@/lib/utils';

interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface ServiceFeaturesSectionProps {
  heading: string;
  subheading?: string;
  features: ServiceFeature[];
  layout?: 'grid' | 'list';
}

export default function ServiceFeaturesSection({
  heading,
  subheading,
  features,
  layout = 'grid',
}: ServiceFeaturesSectionProps) {
  const { getBorderRadiusClass } = useThemeBorderRadius();

  if (layout === 'list') {
    return (
      <div>
        <div className="text-center mb-12">
          <LazySection animation="fade-up" delay={0}>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-4">
              <Sparkles className="size-5" />
              <span>Belangrijkste kenmerken</span>
            </div>
          </LazySection>

          <LazySection animation="fade-up" delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{heading}</h2>
          </LazySection>

          {subheading && (
            <LazySection animation="fade-up" delay={0.2}>
              <p className="text-lg text-neutral-text max-w-3xl mx-auto">{subheading}</p>
            </LazySection>
          )}
        </div>

        <LazySection
          animation="none"
          className="stagger-container max-w-4xl mx-auto space-y-4"
          style={{ '--stagger-delay': '0.1s' } as CSSProperties}
        >
          {features.map((feature, idx) => {
            const IconComponent = feature.icon
              ? iconComponents[feature.icon] || CheckCircle2
              : CheckCircle2;

            return (
              <div
                key={feature.id}
                style={{ '--index': idx } as CSSProperties}
                className={cn(
                  'flex gap-4 p-6 bg-white border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-300',
                  getBorderRadiusClass('card')
                )}
              >
                <div className="shrink-0">
                  <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <IconComponent className="size-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-neutral-text">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </LazySection>
      </div>
    );
  }

  // Grid layout
  return (
    <div>
      <div className="text-center mb-12">
        <LazySection animation="fade-up" delay={0}>
          <div className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-4">
            <Sparkles className="size-5" />
            <span>Belangrijkste voordelen</span>
          </div>
        </LazySection>

        <LazySection animation="fade-up" delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{heading}</h2>
        </LazySection>

        {subheading && (
          <LazySection animation="fade-up" delay={0.2}>
            <p className="text-lg text-neutral-text max-w-3xl mx-auto">{subheading}</p>
          </LazySection>
        )}
      </div>

      <LazySection
        animation="none"
        className={cn(
          'stagger-container card-equal-height',
          features.length === 4
            ? 'service-features-grid-4'
            : 'grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center'
        )}
        style={{ '--stagger-delay': '0.1s' } as CSSProperties}
      >
        {features.map((feature, idx) => {
          const IconComponent = feature.icon
            ? iconComponents[feature.icon] || CheckCircle2
            : CheckCircle2;

          return (
            <div
              key={feature.id}
              className={features.length === 4 ? 'size-full' : 'size-full max-w-sm'}
              style={{ '--index': idx } as CSSProperties}
            >
              <Card className="size-full flex flex-col p-6 hover:shadow-lg transition-all duration-300">
                <div className="mb-4">
                  <div className="size-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="size-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                </div>
                <p className="text-neutral-text grow">{feature.description}</p>
              </Card>
            </div>
          );
        })}
      </LazySection>
    </div>
  );
}
