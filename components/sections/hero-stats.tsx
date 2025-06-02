'use client';

import CountUp from 'react-countup';
import type { z } from 'zod';

import LazySection from '@/components/ui/lazy-section';
import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import type { heroSectionDataSchema } from '@/lib/schemas/sections.schema';

export type HeroStatsProps = {
  stats: z.infer<typeof heroSectionDataSchema>['stats'];
};

export default function HeroStats({ stats }: HeroStatsProps) {
  const { getElementBorderRadius } = useThemeBorderRadius();

  if (!stats || stats.length === 0) return null;
  return (
    <LazySection animation="slide-up" delay={0.4} className="mt-16 md:mt-16 lg:mt-16">
      <div
        className={`relative z-10 bg-neutral-surface ${getElementBorderRadius('section')} shadow-lg p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8`}
      >
        {stats.map(stat => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <div className="text-primary font-bold text-3xl md:text-4xl mb-2">
              <CountUp
                end={stat.value}
                suffix={stat.suffix}
                duration={3.5}
                enableScrollSpy
                scrollSpyDelay={300}
                scrollSpyOnce
                preserveValue
              />
            </div>
            <p className="text-stat-label m-0">{stat.label}</p>
          </div>
        ))}
      </div>
    </LazySection>
  );
}
