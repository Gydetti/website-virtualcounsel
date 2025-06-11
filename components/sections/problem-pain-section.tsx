'use client';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import LazySection from '@/components/ui/lazy-section';
import type { problemPainSectionDataSchema } from '@/lib/schemas/sections.schema';

// Updated props type alias using Zod schema
export type ProblemPainSectionProps = z.infer<typeof problemPainSectionDataSchema>;

export default function ProblemPainSection({
  badgeText,
  heading,
  description,
  calloutText,
  cards,
}: ProblemPainSectionProps) {
  return (
    <Section id="pain" className="bg-gradient-to-b from-transparent to-accent/10">
      <LazySection
        animation="slide-up"
        delay={0}
        childrenStagger={false}
        className="-mx-3.5 sm:mx-auto bg-brand-secondary-dark text-white rounded-[30px] border shadow-lg p-8 sm:p-12"
      >
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              {badgeText && (
                <div className="inline-flex items-center space-x-2 text-orange-400">
                  <AlertTriangle className="size-5" />
                  <span className="font-medium text-sm uppercase tracking-wider">{badgeText}</span>
                </div>
              )}
              {heading && <h2 className=" text-white">{heading}</h2>}
              {description && (
                <p className="text-lg leading-relaxed md:text-xl max-w-[600px] text-white">
                  {description}
                </p>
              )}
            </div>
            {calloutText && (
              <div className="rounded-lg bg-white/10 p-6">
                <p className="text-lg font-medium">{calloutText}</p>
              </div>
            )}
          </div>
          {cards && cards.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {cards.map((card, idx) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    y: -3,
                    transition: { duration: 0.15, ease: 'easeOut' },
                  }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-lg bg-white/10 p-6"
                >
                  <h3 className="mb-3 text-xl font-bold text-orange-400">{card.title}</h3>
                  <p className="text-white/95 text-base md:text-lg">{card.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </LazySection>
    </Section>
  );
}
