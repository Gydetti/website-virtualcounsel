'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import LazySection from '@/components/ui/lazy-section';
import type { resourceSchema } from '@/lib/schemas/contentBlocks.schema';
import { siteConfig } from '@/lib/siteConfig';
import { cn } from '@/lib/utils';

interface ResourceListSectionProps {
  id: string;
  title?: string;
  resources: Array<z.infer<typeof resourceSchema>>;
  readMoreText?: string;
  patternStyle?: string;
  patternOpacity?: number;
  patternFade?: 'none' | 'edges' | 'vertical' | 'top' | 'bottom';
  patternColor?: string;
}

export default function ResourceListSection({
  id,
  title = 'Our Resources',
  resources,
  readMoreText,
  patternStyle,
  patternOpacity,
  patternFade,
  patternColor,
}: ResourceListSectionProps) {
  // Get header configuration to add extra padding if transparent mode is enabled
  const headerConfig = siteConfig.theme.headerConfig;
  const isTransparentHeader = headerConfig?.transparentMode ?? false;
  const heroTopPadding = headerConfig?.heroTopPadding ?? 'pt-20 md:pt-24 lg:pt-28';

  if (!resources || resources.length === 0) {
    return (
      <Section
        id={id}
        patternStyle={patternStyle}
        patternOpacity={patternOpacity}
        patternFade={patternFade}
        patternColor={patternColor}
        className={cn('z-10', isTransparentHeader && heroTopPadding)}
      >
        <div className="text-center">
          <p>No resources available at the moment. Please check back later.</p>
        </div>
      </Section>
    );
  }

  // Determine column layout based on resource count
  const count = resources.length;
  const gridCols =
    count === 1
      ? 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1'
      : count === 2
        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  // Track per-resource image src for error fallbacks
  const initialSrcMap: Record<string, string> = {};
  for (const res of resources) {
    initialSrcMap[res.slug] = res.heroImage?.src || '/images/placeholders/placeholder.svg';
  }
  const [srcMap, setSrcMap] = useState<Record<string, string>>(initialSrcMap);

  return (
    <Section
      id={id}
      patternStyle={patternStyle}
      patternOpacity={patternOpacity}
      patternFade={patternFade}
      patternColor={patternColor}
      bgClass={siteConfig.sectionStyles?.heroGradient ?? ''}
      className={cn('z-10', isTransparentHeader && heroTopPadding)}
    >
      <LazySection>
        <h1 className="text-center mb-10">{title}</h1>
      </LazySection>
      <LazySection delay={0.1}>
        <div className={`grid ${gridCols} gap-8 items-stretch`}>
          {resources.map((resource, index) => (
            <LazySection key={resource.slug} delay={(index + 1) * 0.1}>
              <article
                className={`group relative flex flex-col h-full overflow-hidden rounded-xl border-0 bg-gradient-to-b from-white to-neutral-50/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${count === 1 ? 'max-w-md mx-auto' : ''}`}
              >
                <Link href={`/resources/${resource.slug}`} className="block h-full">
                  <div className="relative h-48 w-full overflow-hidden sm:h-56">
                    <Image
                      src={srcMap[resource.slug]}
                      alt={resource.heroImage?.alt || resource.title}
                      fill
                      priority
                      style={{ objectFit: 'cover' }}
                      onError={() => {
                        setSrcMap(prev => ({
                          ...prev,
                          [resource.slug]: '/images/placeholders/placeholder.svg',
                        }));
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-primary group-hover:text-primary">
                      {resource.title}
                    </h3>
                    {resource.subtitle && (
                      <p className="text-foreground text-sm line-clamp-3">{resource.subtitle}</p>
                    )}
                    <span className="mt-4 inline-block text-primary group-hover:underline">
                      {readMoreText || 'Lees meer &rarr;'}
                    </span>
                  </div>
                </Link>
              </article>
            </LazySection>
          ))}
        </div>
      </LazySection>
    </Section>
  );
}
