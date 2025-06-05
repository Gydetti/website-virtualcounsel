'use client';
import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/button';
import LazySection from '@/components/ui/lazy-section';
import { iconComponents } from '@/lib/icon-utils';
import type { whyChooseServicesSectionDataSchema } from '@/lib/schemas/sections.schema';

export type ServicesWhyChooseSectionProps = z.infer<typeof whyChooseServicesSectionDataSchema>;

export default function ServicesWhyChooseSection({
  heading,
  description,
  benefits,
  buttonText,
  buttonLink,
  image,
}: ServicesWhyChooseSectionProps) {
  return (
    <Section className="bg-neutral-background">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <LazySection animation="slide-right" className="!overflow-x-visible">
          <h2 className="text-heading text-3xl font-bold mb-6">{heading}</h2>
          <p className="text-neutral-text mb-8 text-lg">{description}</p>

          <div className="space-y-6">
            {benefits?.map(benefit => {
              const IconComponent = benefit.icon ? iconComponents[benefit.icon] : null;
              const Icon = IconComponent || Check;
              return (
                <div key={benefit.id} className="flex items-start gap-4">
                  <div className="shrink-0 size-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <span className="text-foreground">{benefit.text}</span>
                </div>
              );
            })}
          </div>

          <Button size="lg" className="mt-8 group" asChild>
            <Link href={buttonLink || '/contact'}>
              {buttonText}
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </LazySection>

        <LazySection animation="slide-left" delay={0.15} className="!overflow-x-visible">
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={image?.src || '/images/team/virtual-counsel-maarten-pointing.webp'}
              alt={image?.alt || 'Professional consultation and strategic planning session'}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="size-full object-cover"
              priority
            />
          </div>
        </LazySection>
      </div>
    </Section>
  );
}
