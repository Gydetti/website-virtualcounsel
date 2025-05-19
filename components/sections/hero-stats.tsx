import LazySection from '@/components/ui/lazy-section';
import type { heroSectionDataSchema } from '@/lib/schemas/sections.schema';
import dynamic from 'next/dynamic';
import CountUp from 'react-countup';
import type { z } from 'zod';

export type HeroStatsProps = {
  stats: z.infer<typeof heroSectionDataSchema>['stats'];
};

export default function HeroStats({ stats }: HeroStatsProps) {
  if (!stats || stats.length === 0) return null;
  return (
    <LazySection animation="slide-up" delay={0.5} className="mt-10">
      <div className="bg-neutral-surface rounded-xl shadow-lg p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
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
            <p className="text-neutral-text text-sm md:text-base m-0">{stat.label}</p>
          </div>
        ))}
      </div>
    </LazySection>
  );
}
