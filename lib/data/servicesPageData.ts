import type { z } from 'zod';

import {
  servicesOverviewSectionDataSchema,
  servicesPageDataSchema,
} from '@/lib/schemas/sections.schema';

/**
 * Virtual Counsel Services Page Data
 *
 * This file contains structured content for the services overview page.
 * Content is in Dutch and focused on ICT/Software legal services.
 */

export const servicesOverviewSectionData: z.infer<typeof servicesOverviewSectionDataSchema> = {
  badgeText: 'Mijn expertise',
  heading: 'Juridische diensten voor de tech industrie',
  description:
    'Specialistische juridische ondersteuning voor ICT- en softwarebedrijven. Van contracten tot compliance - ik spreek uw taal.',
};

// Complete services page data with all sections
export const servicesPageData: z.infer<typeof servicesPageDataSchema> = {
  // Overview section
  overview: servicesOverviewSectionData,

  // Why Choose Services section - differentiation and value
  whyChooseSection: {
    heading: 'Waarom kiezen voor VirtualCounsel?',
    description:
      'Met diepgaande kennis van de tech-industrie lever ik juridisch advies dat aansluit bij uw businessmodel en werkwijze.',
    benefits: [
      {
        id: 'benefit-fixed-price',
        text: 'Vaste prijzen - geen nacalculatie of verrassingen achteraf',
        icon: 'Check',
      },
      {
        id: 'benefit-direct-contact',
        text: 'Direct met gespecialiseerde jurist - geen juniors of tussenpersonen',
        icon: 'Check',
      },
      {
        id: 'benefit-practical-advice',
        text: 'Praktische adviezen ipv theoretische modellen - oplossingen die werken',
        icon: 'Check',
      },
      {
        id: 'benefit-tech-knowledge',
        text: 'Diepgaande kennis van software, SaaS en IT-dienstverlening',
        icon: 'Check',
      },
    ],
    buttonText: 'Plan een kennismaking',
    buttonLink: '/contact',
    image: {
      src: '/images/team/virtual-counsel-maarten-pointing.webp',
      alt: 'Maarten van Beek - VirtualCounsel specialist in ICT-recht',
    },
  },

  // Main CTA section - conversion focused
  ctaSection: {
    heading: 'Klaar om uw juridische zaken te regelen?',
    description:
      'Boek een gratis kennismakingsgesprek en ontdek hoe ik uw ICT-bedrijf kunnen beschermen en laten groeien.',
    buttonText: 'Maak een afspraak',
    buttonLink: '/contact',
  },

  // Button labels for consistency across the page
  buttonLabels: {
    learnMore: 'Meer informatie',
    scheduleConsultation: 'Plan een gesprek',
    getStartedToday: 'Start vandaag',
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
