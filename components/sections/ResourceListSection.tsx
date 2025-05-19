'use client';
import type { resourceSchema } from '@/lib/schemas/contentBlocks.schema';
import Image from 'next/image';
import Link from 'next/link';
import LazySection from '@/components/ui/lazy-section';
import { useState } from 'react';
import type { z } from 'zod';

interface ResourceListSectionProps {
  id: string;
  title?: string;
  resources: Array<z.infer<typeof resourceSchema>>;
}

export default function ResourceListSection({
  id,
  title = 'Our Resources',
  resources,
}: ResourceListSectionProps) {
  if (!resources || resources.length === 0) {
    return (
      <section id={id} className="py-12">
        <div className="container mx-auto px-4 text-center">
          <p>No resources available at the moment. Please check back later.</p>
        </div>
      </section>
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
    <section
      id={id}
      className="relative overflow-hidden bg-gradient-to-r from-brand-light via-transparent to-transparent py-12 z-10"
    >
      <div className="container mx-auto px-4">
        <LazySection>
          <h1 className="text-center mb-10">{title}</h1>
        </LazySection>
        <LazySection delay={0.1}>
          <div className={`grid ${gridCols} gap-8`}>
            {resources.map((resource, index) => (
              <LazySection key={resource.slug} delay={(index + 1) * 0.1}>
                <article
                  className={`group relative flex flex-col overflow-hidden rounded-lg border border-[#e5e7eb80] bg-gradient-to-b from-white to-blue-50/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${count === 1 ? 'max-w-md mx-auto' : ''}`}
                >
                  <Link href={`/resources/${resource.slug}`} className="block h-full">
                    <div className="relative h-48 w-full overflow-hidden sm:h-56">
                      <Image
                        src={srcMap[resource.slug]}
                        alt={resource.heroImage?.alt || resource.title}
                        fill
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
                        Read more &rarr;
                      </span>
                    </div>
                  </Link>
                </article>
              </LazySection>
            ))}
          </div>
        </LazySection>
      </div>
    </section>
  );
}
