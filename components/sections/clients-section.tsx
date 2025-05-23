'use client';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import LazySection from '@/components/ui/lazy-section';
import type { clientsSectionDataSchema } from '@/lib/schemas/sections.schema';

// Updated props type alias
export type ClientsSectionProps = z.infer<typeof clientsSectionDataSchema>;

export default function ClientsSection({ badgeText, heading, clients }: ClientsSectionProps) {
  // If clients is undefined or empty, perhaps render nothing or a placeholder.
  // For now, proceeding with the assumption that data layer provides valid clients array if section is enabled.
  const displayClients = clients && clients.length > 0 ? clients.slice(0, 6) : [];
  // Duplicate with an instance flag for unique, stable keys
  const sliderItems = [
    ...displayClients.map(c => ({ ...c, instance: 0 })),
    ...displayClients.map(c => ({ ...c, instance: 1 })),
  ];

  return (
    <Section
      id="clients-section"
      aria-labelledby="clients-section-heading"
      className="relative overflow-hidden"
    >
      <LazySection
        animation="none"
        className="stagger-container relative z-10"
        style={{ '--stagger-delay': '0.1s' } as CSSProperties}
      >
        <div className="text-center mb-4" style={{ '--index': 0 } as CSSProperties}>
          <Badge className="mb-4">{badgeText}</Badge>
        </div>

        <div className="py-4" style={{ '--index': 1 } as CSSProperties}>
          <div className="py-2">
            <div className="w-full max-w-[calc(166px*6)] mx-auto relative overflow-hidden">
              <div className="flex animate-scroll">
                {sliderItems.map(client => (
                  <div
                    key={`${client.name}-${client.instance}`}
                    className="shrink-0 basis-1/3 sm:basis-1/4 lg:basis-1/6 flex items-center justify-center"
                  >
                    <Image
                      src={client.logo.src}
                      alt={client.logo.alt}
                      width={120}
                      height={60}
                      className="w-24 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </LazySection>
    </Section>
  );
}
