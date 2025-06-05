import type { z } from 'zod';

import { serviceDetailPageDataSchema } from '@/lib/schemas/sections.schema';

/**
 * Virtual Counsel Service Detail Page Data
 *
 * This file contains structured content for service detail pages.
 * Content is in Dutch and focused on legal services for ICT/Software companies.
 */

export const serviceDetailPageData: z.infer<typeof serviceDetailPageDataSchema> = {
  // Benefits Section - Voordelen van de dienst
  benefitsSection: {
    heading: 'Waarom kiezen voor deze dienst?',
    benefits: [
      {
        id: 'benefit-expertise',
        title: 'Diepgaande tech-kennis',
        description:
          "Juridisch advies van een specialist die de taal van software, SaaS en IT-dienstverlening spreekt. Geen uitleg nodig over API's of cloud architectuur.",
        icon: '✓',
      },
      {
        id: 'benefit-speed',
        title: 'Snelle levering',
        description:
          'Documenten binnen 1-2 weken geleverd. Voor spoedgevallen kunnen we nog sneller schakelen. U weet altijd waar u aan toe bent.',
        icon: '✓',
      },
      {
        id: 'benefit-fixed-price',
        title: 'Vaste prijzen',
        description:
          'Geen uurtje-factuurtje maar heldere afspraken vooraf. U weet exact wat het kost voordat we beginnen.',
        icon: '✓',
      },
    ],
  },

  // FAQ Section - Veelgestelde vragen per dienst
  faqSection: {
    heading: 'Veelgestelde vragen',
    items: [
      {
        question: 'Hoe snel kan ik de documenten verwachten?',
        answer:
          'De meeste documenten leveren we binnen 5-10 werkdagen. Voor complexere projecten maken we vooraf een realistische planning. Spoed? Dat kan tegen een toeslag - we leveren dan binnen 2-3 werkdagen.',
      },
      {
        question: 'Kan ik ook doorlopende ondersteuning krijgen?',
        answer:
          'Jazeker! Veel klanten kiezen voor een strippenkaart of maandelijks abonnement. Zo heeft u altijd snel juridisch advies bij de hand zonder hoge kosten. Ideaal voor groeiende tech-bedrijven.',
      },
      {
        question: 'Hoe werkt het reviewproces?',
        answer:
          'Na oplevering heeft u 5 werkdagen om feedback te geven. We verwerken uw feedback kosteloos (mits binnen scope). Daarna bespreken we de definitieve versie telefonisch door zodat u precies weet wat er staat.',
      },
      {
        question: 'Zijn jullie documenten up-to-date?',
        answer:
          'Absoluut. We volgen alle relevante wetgeving op de voet - van AVG updates tot de nieuwe AI Act. Uw documenten voldoen altijd aan de laatste wettelijke vereisten en best practices in de tech-industrie.',
      },
    ],
  },

  // Testimonials Section - Klant ervaringen
  testimonialsSection: {
    heading: 'Wat klanten zeggen',
    testimonials: [
      {
        id: 'testimonial-tech',
        quote:
          'VirtualCounsel begrijpt echt wat wij als SaaS-bedrijf nodig hebben. De contracten sluiten perfect aan bij ons businessmodel en groeiambities.',
        author: 'Robert van der Berg',
        company: 'CloudPlatform B.V.',
      },
      {
        id: 'testimonial-startup',
        quote:
          'Voor onze funding ronde hadden we snel professionele contracten nodig. Binnen een week hadden we alles op orde - de investeerders waren onder de indruk.',
        author: 'Sarah Jansen',
        company: 'TechStartup Amsterdam',
      },
    ],
  },

  // Ready to Start CTA Section - Actie ondernemen
  readyToStartCta: {
    heading: 'Klaar om uw juridische zaken te regelen?',
    description:
      'Boek een gratis kennismakingsgesprek en ontdek hoe we uw specifieke situatie kunnen aanpakken. Binnen 30 minuten weet u precies wat mogelijk is.',
    buttonText: 'Plan uw gesprek',
    buttonLink: '/contact',
  },

  // Button Labels - Nederlandse labels
  buttonLabels: {
    consultation: 'Plan een gesprek',
    scheduleConsultation: 'Plan uw kennismaking',
    getStarted: 'Start vandaag',
  },
};

// Validate data at module load
try {
  serviceDetailPageDataSchema.parse(serviceDetailPageData);
} catch (error) {
  console.error(
    'Error validating serviceDetailPageData:',
    error instanceof Error ? error.message : error
  );
}
