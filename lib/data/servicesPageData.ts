import type { z } from 'zod';

import {
  servicesOverviewSectionDataSchema,
  servicesPageDataSchema,
} from '@/lib/schemas/sections.schema';

/**
 * Services Page Data - Meta-instructional placeholder content
 *
 * This file contains structured content for the services overview page.
 * All content follows meta-instructional patterns to guide AI agents toward best practices.
 *
 * Content Strategy:
 * - Overview: Clear value proposition and service introduction
 * - Why Choose: Differentiation and competitive advantages
 * - CTA: Clear next steps and conversion optimization
 */

export const servicesOverviewSectionData: z.infer<typeof servicesOverviewSectionDataSchema> = {
  badgeText: 'Our services',
  heading: 'What we offer',
  description:
    'Explore our full range of services designed to help your business grow, optimize operations, and achieve measurable success.',
};

// Complete services page data with all sections
export const servicesPageData: z.infer<typeof servicesPageDataSchema> = {
  // Overview section (existing)
  overview: servicesOverviewSectionData,

  // Why Choose Services section - differentiation and value
  whyChooseSection: {
    heading: 'Why Choose Our Services',
    description:
      'We deliver measurable results through proven methodologies and personalized attention to your business goals.',
    benefits: [
      {
        id: 'benefit-tailored',
        text: 'Tailored solutions for your specific business needs',
        icon: 'Check',
      },
      {
        id: 'benefit-data-driven',
        text: 'Data-driven strategies that deliver measurable results',
        icon: 'Check',
      },
      {
        id: 'benefit-transparent',
        text: 'Transparent communication throughout the process',
        icon: 'Check',
      },
      {
        id: 'benefit-ongoing',
        text: 'Ongoing support and optimization',
        icon: 'Check',
      },
    ],
    buttonText: 'Schedule a consultation',
    buttonLink: '/contact',
  },

  // Main CTA section - conversion focused
  ctaSection: {
    heading: 'Ready to Transform Your Business?',
    description:
      'Take the first step towards achieving your business goals with our expert guidance and proven strategies.',
    buttonText: 'Get started today',
    buttonLink: '/contact',
  },

  // Button labels for consistency across the page
  buttonLabels: {
    learnMore: 'Learn more',
    scheduleConsultation: 'Schedule a consultation',
    getStartedToday: 'Get started today',
  },
};

// Validate data
try {
  servicesOverviewSectionDataSchema.parse(servicesOverviewSectionData);
  servicesPageDataSchema.parse(servicesPageData);
} catch (error) {
  console.error(
    'Error validating servicesPageData:',
    error instanceof Error ? error.message : error
  );
}
