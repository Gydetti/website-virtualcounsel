'use client';
/* biome-disable lint/suspicious/noArrayIndexKey */

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import LazySection from '@/components/ui/lazy-section';
import type { testimonialsSectionDataSchema } from '@/lib/schemas/sections.schema';
import { siteConfig } from '@/lib/siteConfig';

// Updated props type alias using Zod schema
export type TestimonialsSectionProps = z.infer<typeof testimonialsSectionDataSchema>;

export default function TestimonialsSection({
  badgeText,
  heading,
  subtitle,
  testimonials,
}: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  // Enable drag only after component mounts (avoids undefined ref errors)
  const [dragEnabled, setDragEnabled] = useState(false);
  useEffect(() => {
    setDragEnabled(true);
  }, []);

  // Auto-advance testimonials every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (!testimonials || testimonials.length === 0) {
    return null; // Or some placeholder if the section must render
  }

  const nextTestimonial = () => {
    setActiveIndex(prevIndex => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(prevIndex => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Get testimonial style from siteConfig
  const testimonialStyle = siteConfig.theme.sectionStyles?.testimonialStyle || 'cards';
  const configCardStyle = siteConfig.theme.visualStyle?.cardStyle || 'subtle';

  // Map config style to card elevation
  const cardElevation =
    configCardStyle === 'flat'
      ? 'flat'
      : configCardStyle === 'pronounced'
        ? 'pronounced'
        : 'subtle';

  // Use animation settings from config
  const animationSpeed = siteConfig.theme.animation?.speed || 'balanced';
  const transitionDuration =
    animationSpeed === 'fast' ? 0.3 : animationSpeed === 'slow' ? 0.7 : 0.5;

  return (
    <Section
      id="testimonials-section"
      aria-labelledby="testimonials-section-heading"
      className="relative !overflow-visible"
    >
      {/* Decorative elements - re-enabled and styled with theme colors */}
      <div className="hidden sm:block absolute top-0 right-1/4 size-72 bg-accent/5 rounded-full -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="hidden sm:block absolute bottom-0 left-1/4 size-72 bg-primary/5 rounded-full translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <LazySection animation="fade-up" delay={0} className="text-center mb-16">
          {badgeText && <Badge className="mb-4">{badgeText}</Badge>}
          <h2 id="testimonials-section-heading" className="">
            {heading}
          </h2>
          <p className="section-subtitle">{subtitle}</p>
        </LazySection>

        <LazySection animation="fade-up" delay={0.1} className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              drag={dragEnabled ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) nextTestimonial();
                else if (info.offset.x > 50) prevTestimonial();
              }}
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ x: { type: 'tween', ease: 'easeInOut', duration: transitionDuration } }}
              style={{ touchAction: 'pan-y' }}
            >
              {testimonials.map((item, index) => (
                <motion.div key={item.id} className="w-full shrink-0 sm:px-4 pb-12">
                  <Card
                    elevation={cardElevation}
                    hover="lift"
                    border={testimonialStyle === 'minimal' ? 'subtle' : 'normal'}
                    padding="large"
                    className={`h-full ${testimonialStyle === 'featured' ? 'bg-gradient-to-br from-white to-blue-50/10' : ''}`}
                  >
                    <CardContent className="p-0">
                      {/* Quote icon for featured style */}
                      {testimonialStyle === 'featured' && (
                        <div className="absolute -top-5 -left-2 text-primary/10">
                          <Quote size={60} className="opacity-80" />
                        </div>
                      )}

                      <div className="flex items-center mb-6">
                        {item.rating && item.rating > 0
                          ? Array.from({ length: 5 }).map((_, starIndex) => (
                              <Star
                                key={`${item.id}-star-${starIndex}`}
                                aria-hidden="true"
                                className={`size-5 ${
                                  starIndex < (item.rating || 0)
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-neutral-text/300 fill-gray-300'
                                }`}
                              />
                            ))
                          : Array.from({ length: 5 }).map((_, starIndex) => (
                              <Star
                                key={`${item.id}-star-${starIndex}`}
                                aria-hidden="true"
                                className="size-5 text-neutral-text/300 fill-gray-300"
                              />
                            ))}
                      </div>
                      <p className="text-neutral-text text-base mb-8 line-clamp-6 italic">
                        &quot;{item.quote}&quot;
                      </p>
                      <div className="flex items-center mt-auto">
                        <div className="mr-4">
                          <Image
                            src={item.image.src}
                            alt={item.image.alt}
                            width={item.image.width || 60}
                            height={item.image.height || 60}
                            className={`rounded-full border-2 ${testimonialStyle === 'featured' ? 'border-primary/20 shadow-md' : 'border-divider'}`}
                          />
                        </div>
                        <div>
                          <h3 className="text-body-base font-semibold text-neutral-text">
                            {item.name}
                          </h3>
                          <p className="text-caption">{item.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
          {/* Arrow controls positioned relative to LazySection container */}
          <div className="hidden lg:block absolute top-1/2 -left-12 -translate-y-1/2">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={prevTestimonial}
              className="inline-flex items-center justify-center p-2 bg-neutral-surface rounded-full shadow-md hover:shadow-lg focus:outline-none transition-all hover:-translate-y-1"
            >
              <ChevronLeft className="size-5 text-foreground" />
            </button>
          </div>
          <div className="hidden lg:block absolute top-1/2 -right-12 -translate-y-1/2">
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={nextTestimonial}
              className="inline-flex items-center justify-center p-2 bg-neutral-surface rounded-full shadow-md hover:shadow-lg focus:outline-none transition-all hover:-translate-y-1"
            >
              <ChevronRight className="size-5 text-foreground" />
            </button>
          </div>
        </LazySection>

        <div className="flex justify-center mt-4 space-x-2 absolute bottom-0 inset-x-0">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              className={`size-3 rounded-full transition-all min-h-0 min-w-0 ${
                activeIndex === index ? 'bg-primary w-6' : 'bg-neutral-background/300'
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Authority Badge */}
      <LazySection animation="fade-up" delay={0.2} className="mt-16 flex justify-center">
        <div className="inline-flex items-center rounded-full border border-secondary/20 bg-neutral-surface px-6 py-2 text-sm font-medium shadow-lg">
          <span className="mr-2 size-2 rounded-full bg-secondary" />
          Show that you are certified or an expert in your field
        </div>
      </LazySection>
    </Section>
  );
}
