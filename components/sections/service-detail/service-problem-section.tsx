'use client';

import { AlertTriangle, XCircle } from 'lucide-react';
import type { CSSProperties } from 'react';

import { Card } from '@/components/ui/card';
import LazySection from '@/components/ui/lazy-section';
import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import { cn } from '@/lib/utils';

interface ServiceProblemSectionProps {
  heading: string;
  problems: {
    title: string;
    description: string;
    impact?: string;
  }[];
  mainProblemStatement: string;
}

export default function ServiceProblemSection({
  heading,
  problems,
  mainProblemStatement,
}: ServiceProblemSectionProps) {
  const { getBorderRadiusClass } = useThemeBorderRadius();

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 size-64 bg-red-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 size-64 bg-orange-100 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="text-center mb-12">
        <LazySection animation="fade-up" delay={0}>
          <div className="inline-flex items-center gap-2 text-sm font-medium text-red-600 mb-4">
            <AlertTriangle className="size-5" />
            <span>Het probleem</span>
          </div>
        </LazySection>

        <LazySection animation="fade-up" delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{heading}</h2>
        </LazySection>

        <LazySection animation="fade-up" delay={0.2}>
          <p className="text-lg text-neutral-text max-w-3xl mx-auto">{mainProblemStatement}</p>
        </LazySection>
      </div>

      <LazySection
        animation="none"
        className={cn(
          'stagger-container card-equal-height',
          problems.length === 3
            ? 'problem-section-grid-3'
            : 'grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center'
        )}
        style={{ '--stagger-delay': '0.1s' } as CSSProperties}
      >
        {problems.map((problem, idx) => (
          <div
            key={`problem-${problem.title.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`}
            className={problems.length === 3 ? 'size-full' : 'size-full max-w-sm'}
            style={{ '--index': idx } as CSSProperties}
          >
            <Card
              className={cn(
                'size-full flex flex-col p-6 border-red-100 bg-red-50/50 hover:shadow-lg transition-all duration-300',
                getBorderRadiusClass('card')
              )}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-full">
                  <XCircle className="size-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground flex-1">{problem.title}</h3>
              </div>

              <p className="text-neutral-text mb-4 grow">{problem.description}</p>

              {problem.impact && (
                <div className="pt-4 border-t border-red-100">
                  <p className="text-sm text-red-600 font-medium">Impact: {problem.impact}</p>
                </div>
              )}
            </Card>
          </div>
        ))}
      </LazySection>
    </div>
  );
}
