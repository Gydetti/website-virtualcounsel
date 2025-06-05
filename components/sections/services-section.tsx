'use client';

import { ArrowRight, BarChart2, Globe, Zap } from 'lucide-react';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { z } from 'zod';

import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LazySection from '@/components/ui/lazy-section';
import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';
import type { serviceItemSchema, servicesSectionDataSchema } from '@/lib/schemas/sections.schema';

// Map of icon names to components
const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="size-10 text-primary" />,
  BarChart2: <BarChart2 className="size-10 text-primary" />,
  Zap: <Zap className="size-10 text-primary" />,
};

// Updated props type alias using Zod schema
export type ServicesSectionProps = z.infer<typeof servicesSectionDataSchema>;

export default function ServicesSection({
  badgeText,
  heading,
  description,
  services,
  learnMoreText,
  popularBadgeText,
  // displayType is part of schema, but not used for rendering logic here yet
  viewAllCta, // Replaces viewAllText and viewAllLink
  patternStyle,
  patternOpacity,
  patternFade,
  patternColor,
  totalServicesCount,
  remainingServicesCount,
  showRemainingCount,
}: ServicesSectionProps & {
  totalServicesCount?: number;
  remainingServicesCount?: number;
  showRemainingCount?: boolean;
}) {
  const { getElementBorderRadius } = useThemeBorderRadius();

  if (!services || services.length === 0) {
    // Schema implies services array is required, but good to check
    return null;
  }

  // FIRST_EDIT: Compute responsive grid columns based on number of services
  const colsClass =
    services.length === 1
      ? 'grid-cols-1'
      : services.length === 2
        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  // SECOND_EDIT: Adjust gap based on number of services
  const gapClass = services.length === 2 ? 'gap-6 md:gap-4 lg:gap-6' : 'gap-8';

  // THIRD_EDIT: Adjust card wrapper for different layouts
  const getCardWrapperClass = (serviceCount: number) => {
    if (serviceCount === 1) {
      return 'max-w-[550px] mx-auto size-full';
    }
    if (serviceCount === 2) {
      return 'size-full'; // Remove max-width and centering for 2-card layout
    }
    return 'max-w-[550px] mx-auto size-full'; // Keep max-width for 3+ cards
  };

  return (
    <Section
      id="services-section"
      aria-labelledby="services-section-heading"
      patternStyle={patternStyle}
      patternOpacity={patternOpacity}
      patternFade={patternFade}
      patternColor={patternColor}
    >
      {/* Decorative elements - re-enabled and styled with theme colors */}
      <div className="hidden sm:block absolute top-0 right-0 size-64 bg-primary/3 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none" />
      <div className="hidden sm:block absolute bottom-0 left-0 size-72 bg-secondary/3 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header CSS-only stagger */}
        <LazySection
          animation="none"
          className="stagger-container text-center mb-16"
          style={{ '--stagger-delay': '0.1s' } as CSSProperties}
        >
          <Badge className="mb-4" style={{ '--index': 0 } as CSSProperties}>
            {badgeText || 'Our Services'}
          </Badge>
          <h2 id="services-section-heading" className="" style={{ '--index': 1 } as CSSProperties}>
            {heading}
          </h2>
          <p className="section-subtitle" style={{ '--index': 2 } as CSSProperties}>
            {description}
          </p>
        </LazySection>

        {/* Services grid CSS-only stagger */}
        <LazySection
          animation="none"
          className={`stagger-container grid ${gapClass} ${colsClass}`}
          style={{ '--stagger-delay': '0.2s' } as CSSProperties}
        >
          {services.map((service: z.infer<typeof serviceItemSchema>, idx) => {
            // get button radius class for theme
            const buttonRadius = getElementBorderRadius('button');
            return (
              <div
                key={service.id}
                className={getCardWrapperClass(services.length)}
                style={{ '--index': idx } as CSSProperties}
              >
                <Card
                  className={`card-equal-height h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-b from-white to-blue-50/30 ${
                    service.popular
                      ? 'border-accent shadow-lg relative'
                      : 'border-[#e5e7eb80] shadow-lg'
                  }`}
                >
                  {service.popular && (
                    <div className="absolute top-0 right-0 bg-accent text-white text-sm font-bold px-3 py-1 rounded-bl-lg">
                      {popularBadgeText ?? 'Populair'}
                    </div>
                  )}

                  <CardHeader className="pt-12">
                    <div
                      className={`mb-6 bg-primary/10 size-16 ${getElementBorderRadius('card')} flex items-center justify-center`}
                    >
                      {iconMap[service.icon ?? 'Globe'] || (
                        <Globe className="size-10 text-primary" />
                      )}
                    </div>
                    <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                    <CardDescription className="text-foreground">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="card-content">
                    <ul className="space-y-3">
                      {service.features?.map(feature => (
                        <li key={feature} className="flex items-start">
                          <span className="text-feedback-success mr-3 shrink-0 mt-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="size-5"
                            >
                              <title>Check mark icon</title>
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                              <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="card-footer pt-6">
                    <Button
                      variant="clean"
                      animation="none"
                      asChild
                      className={`w-full ${buttonRadius} text-style-balanced px-4 py-2.5 font-semibold transition-colors duration-200 ${
                        service.popular
                          ? 'bg-primary text-white hover:bg-primary/90'
                          : 'bg-white border border-primary text-primary hover:bg-primary hover:text-white'
                      }`}
                    >
                      <Link href={`/services/${service.slug}`}>
                        {`${learnMoreText ?? 'Meer informatie over'} ${service.title}`}
                        <ArrowRight className="ml-2 size-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </LazySection>

        {/* View All CTA stagger */}
        {viewAllCta?.href && viewAllCta?.text && (
          <LazySection
            animation="none"
            className="stagger-container text-center mt-12"
            style={{ '--stagger-delay': '0.1s' } as CSSProperties}
          >
            {showRemainingCount && remainingServicesCount && remainingServicesCount > 0 && (
              <p
                className="text-lg text-muted-foreground mb-6"
                style={{ '--index': 0 } as CSSProperties}
              >
                En nog {remainingServicesCount} andere specialistische diensten voor ICT-bedrijven
              </p>
            )}
            <div style={{ '--index': showRemainingCount ? 1 : 0 } as CSSProperties}>
              <Button
                size="lg"
                variant="default"
                className="w-full sm:w-auto whitespace-normal break-words bg-primary hover:bg-primary/90 text-white"
                asChild
              >
                <Link href={viewAllCta.href}>
                  {viewAllCta.text}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </LazySection>
        )}
      </div>
    </Section>
  );
}
