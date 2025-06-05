'use client';

import { ArrowRight, ClipboardCheck } from 'lucide-react';
import Link from 'next/link';
import type { CSSProperties } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LazySection from '@/components/ui/lazy-section';
import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import { iconComponents } from '@/lib/icon-utils';
import { cn } from '@/lib/utils';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  duration?: string;
  icon?: string;
}

interface ServiceProcessSectionProps {
  heading: string;
  subheading?: string;
  steps: ProcessStep[];
  ctaText?: string;
  ctaLink?: string;
}

export default function ServiceProcessSection({
  heading,
  subheading,
  steps,
  ctaText = 'Start vandaag',
  ctaLink = '/contact',
}: ServiceProcessSectionProps) {
  const { getBorderRadiusClass } = useThemeBorderRadius();

  return (
    <div id="hoe-werkt-het">
      <div className="text-center mb-12">
        <LazySection animation="fade-up" delay={0}>
          <div className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-4">
            <ClipboardCheck className="size-5" />
            <span>Onze werkwijze</span>
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
        className="stagger-container relative"
        style={{ '--stagger-delay': '0.15s' } as CSSProperties}
      >
        {/* Connection line for desktop */}
        <div className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-[calc(100%-200px)] h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const IconComponent = step.icon
              ? iconComponents[step.icon] || ClipboardCheck
              : ClipboardCheck;
            const stepNumber = idx + 1;

            return (
              <div key={step.id} style={{ '--index': idx } as CSSProperties} className="relative">
                {/* Connection arrow for mobile/tablet */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block lg:hidden absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="size-6 text-primary/40" />
                  </div>
                )}

                <Card
                  className={cn(
                    'relative h-full p-6 hover:shadow-lg transition-all duration-300',
                    getBorderRadiusClass('card')
                  )}
                >
                  {/* Step number badge */}
                  <div className="absolute -top-3 -right-3 size-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {stepNumber}
                  </div>

                  <div className="space-y-4">
                    <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="size-6 text-primary" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-neutral-text">{step.description}</p>
                    </div>

                    {step.duration && (
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-sm text-primary font-medium">
                          Doorlooptijd: {step.duration}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </LazySection>

      {/* CTA */}
      <LazySection animation="fade-up" delay={0.5} className="text-center mt-12">
        <Button size="lg" asChild>
          <Link href={ctaLink}>
            {ctaText}
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </LazySection>
    </div>
  );
}
