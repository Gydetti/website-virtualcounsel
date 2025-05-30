import { z } from 'zod';

import { aboutSectionDataSchema } from '../schemas/sections.schema';

export const aboutPageMainContentData: z.infer<typeof aboutSectionDataSchema> = {
  // Enhanced About page hero section for solo entrepreneurs - personal trust building
  badgeText: 'Badge introducing personal story section',
  heading: 'Page heading - personal introduction emphasizing expertise and approachability',
  paragraphs: [
    'Opening paragraph: Personal introduction explaining your background, passion, and what drives you to help clients in your specific field.',
    'Journey paragraph: Brief story of how you got started, key experiences that shaped your approach, and pivotal moments in your professional development.',
    'Approach paragraph: Explanation of your unique methodology, philosophy, or framework that sets you apart from others in your field.',
    "Connection paragraph: Why you're passionate about this work and what you love most about helping clients achieve their goals.",
  ],
  image: {
    src: '/images/placeholders/placeholder.svg',
    alt: 'Professional headshot showing warmth, expertise, and approachability - key for solo entrepreneur trust building',
    width: 500,
    height: 500,
  },
  variant: 'imageRight',
  stats: [
    {
      id: 'stat-experience',
      value: 'Number + years',
      label: 'Years of experience in field',
    },
    {
      id: 'stat-clients',
      value: 'Number+',
      label: 'Clients successfully helped',
    },
    {
      id: 'stat-transformations',
      value: 'Number+',
      label: 'Successful transformations/outcomes',
    },
    {
      id: 'stat-certifications',
      value: 'Number+',
      label: 'Relevant certifications/credentials',
    },
  ],
  cta: {
    text: 'Call-to-action for next step - typically booking consultation or learning about services',
    href: '/contact',
  },
};

// Validate data
try {
  aboutSectionDataSchema.parse(aboutPageMainContentData);
} catch (error) {
  console.error(
    'Error validating aboutPageMainContentData:',
    error instanceof z.ZodError ? error.errors : error
  );
  // Potentially throw error in build to ensure data conforms
}

// Data for About Values & Philosophy section - core beliefs that guide solo entrepreneur's work
export const aboutValuesSectionData = {
  badgeText: 'Badge for values/principles section',
  heading: 'Section heading about core values or guiding principles',
  values: [
    'Core value 1 - fundamental principle that guides your work approach',
    'Core value 2 - belief about client relationships or methodology',
    'Core value 3 - commitment to outcomes or professional standards',
    'Core value 4 - philosophy about growth, change, or transformation',
    'Core value 5 - principle about authenticity, integrity, or trust',
  ],
};

// Data for About Social Proof snippet section - testimonials focused on personal transformation
export const aboutSocialProofSectionData = {
  badgeText: 'Badge highlighting client results or testimonials',
  heading: 'Section heading about client success stories or testimonials',
  socialProof: [
    {
      id: 'sp1',
      quote:
        'Testimonial quote highlighting specific transformation, outcome, or breakthrough achieved through working together',
      name: 'Client first name + last initial',
      title: 'Client role/industry - adds credibility',
      image: {
        src: '/images/testimonials/placeholder-client-1.jpg',
        alt: 'Professional photo of satisfied client (with permission) or avatar placeholder',
        width: 60,
        height: 60,
      },
    },
    {
      id: 'sp2',
      quote:
        'Second testimonial emphasizing different aspect - methodology, support, or specific result achieved',
      name: 'Client first name + last initial',
      title: 'Client background that target audience can relate to',
      image: {
        src: '/images/testimonials/placeholder-client-2.jpg',
        alt: 'Professional photo of satisfied client (with permission) or avatar placeholder',
        width: 60,
        height: 60,
      },
    },
    {
      id: 'sp3',
      quote:
        'Third testimonial focusing on personal connection, trust, or unique approach that sets you apart',
      name: 'Client first name + last initial',
      title: 'Client role demonstrating range of people you help',
      image: {
        src: '/images/testimonials/placeholder-client-3.jpg',
        alt: 'Professional photo of satisfied client (with permission) or avatar placeholder',
        width: 60,
        height: 60,
      },
    },
  ],
};

// Personal Journey Section - detailed storytelling for trust building
export const aboutPersonalJourneySectionData = {
  badgeText: 'Badge for personal story/journey section',
  heading: 'Section heading about your professional journey or transformation story',
  subtitle: 'Optional subtitle providing context about your path or what changed everything',
  journeySteps: [
    {
      id: 'step-1',
      timeframe: 'Time period or life stage',
      title: 'Major milestone, realization, or turning point in your journey',
      description:
        'Detailed description of what happened, what you learned, or how this shaped your approach to helping others.',
    },
    {
      id: 'step-2',
      timeframe: 'Next time period or stage',
      title: 'Another key experience, challenge overcome, or skill developed',
      description:
        'Story about growth, learning, or experiences that make you uniquely qualified to help your target audience.',
    },
    {
      id: 'step-3',
      timeframe: 'Recent period or current focus',
      title: 'Current mission, vision, or what drives your work today',
      description:
        'Explanation of your current focus, why this work matters to you, and what you are passionate about achieving for clients.',
    },
  ],
  image: {
    src: '/images/placeholders/placeholder.svg',
    alt: 'Image representing your journey - could be professional progression, before/after, or symbolic representation',
    width: 500,
    height: 400,
  },
};

// Credentials & Qualifications Section - building authority and trust
export const aboutCredentialsSectionData = {
  badgeText: 'Badge for qualifications/credentials section',
  heading: 'Section heading about expertise, qualifications, or credentials',
  subtitle:
    'Brief explanation of your commitment to professional excellence and continuous learning',
  credentials: [
    {
      id: 'credential-1',
      type: 'Certification',
      title: 'Name of relevant certification or qualification',
      issuer: 'Issuing organization or institution',
      year: 'Year obtained',
      description:
        'Brief explanation of what this credential represents and its relevance to your work',
      icon: 'award', // could be: award, book, star, certificate
    },
    {
      id: 'credential-2',
      type: 'Education',
      title: 'Relevant degree or educational background',
      issuer: 'Institution name',
      year: 'Year completed',
      description: 'How this education foundation supports your current expertise and approach',
      icon: 'book',
    },
    {
      id: 'credential-3',
      type: 'Experience',
      title: 'Significant professional experience or expertise area',
      issuer: 'Context or organization where gained',
      year: 'Time period',
      description:
        'Key experience that demonstrates your capability and understanding of client challenges',
      icon: 'star',
    },
  ],
  cta: {
    text: 'Call-to-action related to learning more about working together',
    href: '/services',
  },
};

// Philosophy & Approach Section - detailed methodology explanation
export const aboutPhilosophySectionData = {
  badgeText: 'Badge for philosophy/approach section',
  heading: 'Section heading about your unique approach or methodology',
  subtitle: 'Brief introduction to your philosophy or what makes your approach different',
  philosophyPoints: [
    {
      id: 'philosophy-1',
      title: 'Core principle 1 of your approach',
      description: 'Detailed explanation of this principle and why it matters for client success',
      icon: 'heart', // could be: heart, compass, lightbulb, target
    },
    {
      id: 'philosophy-2',
      title: 'Core principle 2 of your methodology',
      description: 'How this principle shows up in your work and benefits it provides to clients',
      icon: 'compass',
    },
    {
      id: 'philosophy-3',
      title: 'Core principle 3 that guides your practice',
      description: 'Why this principle is important and how it creates better outcomes',
      icon: 'lightbulb',
    },
  ],
  quote: {
    text: 'Inspiring quote that captures your philosophy or approach to transformation/growth',
    author: 'Your name or relevant attribution',
  },
  image: {
    src: '/images/placeholders/placeholder.svg',
    alt: 'Image representing your philosophy - could be metaphorical, symbolic, or showing you in action',
    width: 500,
    height: 400,
  },
};

// Validate new data
import {
  aboutCredentialsSectionDataSchema,
  aboutPersonalJourneySectionDataSchema,
  aboutPhilosophySectionDataSchema,
  aboutSocialProofSectionDataSchema,
  aboutValuesSectionDataSchema,
} from '@/lib/schemas/sections.schema';

try {
  aboutValuesSectionDataSchema.parse(aboutValuesSectionData);
  aboutSocialProofSectionDataSchema.parse(aboutSocialProofSectionData);
  aboutPersonalJourneySectionDataSchema.parse(aboutPersonalJourneySectionData);
  aboutCredentialsSectionDataSchema.parse(aboutCredentialsSectionData);
  aboutPhilosophySectionDataSchema.parse(aboutPhilosophySectionData);
} catch (error) {
  console.error(
    'Error validating About page section data:',
    error instanceof Error ? error.message : error
  );
}
