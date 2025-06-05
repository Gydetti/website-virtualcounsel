'use client';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import LazySection from '@/components/ui/lazy-section';
import type { solutionVisionSectionDataSchema } from '@/lib/schemas/sections.schema';

// Updated props type alias using Zod schema
export type SolutionVisionSectionProps = z.infer<typeof solutionVisionSectionDataSchema>;

// Micro-animation variants for text elements
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: i * 0.2, ease: 'easeIn' },
  }),
};

export default function SolutionVisionSection({
  badgeText,
  heading,
  description,
  imagineTitle,
  benefits,
  calloutText,
  calloutCta, // Replaces calloutLinkText and calloutLinkHref
}: SolutionVisionSectionProps) {
  return (
    <Section
      id="solution-vision-section"
      className="pattern-overlay pattern-overlay-fade bg-gradient-to-b from-accent/10 via-transparent to-transparent"
    >
      {/* Scroll reveal header */}
      <LazySection animation="slide-up" delay={0} className="text-center mb-16 max-w-4xl mx-auto">
        <motion.div custom={0} variants={textVariants} className="mb-4">
          <Badge variant="default" className="px-3 py-1 bg-primary text-white hover:bg-primary/90">
            {badgeText}
          </Badge>
        </motion.div>
        <motion.h2 custom={1} variants={textVariants} className="section-title">
          {heading}
        </motion.h2>
        <motion.p custom={2} variants={textVariants} className="section-subtitle">
          {description}
        </motion.p>
      </LazySection>

      {/* Unified motion glass card for subheading & benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mx-auto max-w-4xl bg-neutral-surface/20 backdrop-blur-lg rounded-xl shadow-2xl p-6 md:p-12 space-y-8"
      >
        <h3 className="font-semibold text-lg text-center my-0">
          {imagineTitle ?? 'Imagine having:'}
        </h3>
        {benefits && benefits.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map(b => (
              <div key={b} className="flex items-start space-x-2">
                <CheckCircle className="size-5 text-primary mt-1 shrink-0" />
                <span className="text-foreground">{b}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Callout Card Animation */}
      {calloutText && (
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          className="mt-16 max-w-4xl mx-auto bg-primary/5 border border-primary/20 p-6 rounded-lg"
        >
          <p className="text-neutral-text font-medium mb-2">{calloutText}</p>
          {calloutCta?.href && calloutCta?.text && (
            <a
              href={calloutCta.href}
              className="text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              {calloutCta.text} →
            </a>
          )}
        </motion.div>
      )}
    </Section>
  );
}
