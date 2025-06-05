import { z } from 'zod';

import { resourceSchema } from '../schemas/contentBlocks.schema';

// Define specific section prop types
export interface TextSectionProps {
  content: string;
}
export interface ImageSectionProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}
export interface FormSectionProps {
  formEmbed?: React.ReactNode;
}

// Union type for resource sections
export type ResourceSection =
  | { type: 'text'; props: TextSectionProps }
  | { type: 'image'; props: ImageSectionProps }
  | { type: 'form'; props: FormSectionProps };

// Define the Resource type and data accessors
export type Resource = {
  slug: string;
  type: string;
  title: string;
  subtitle?: string;
  heroImage: string;
  sections: ResourceSection[];
};

// Virtual Counsel resource data
const sampleResourcesData: z.infer<typeof resourceSchema>[] = [
  {
    slug: 'saas-contracten-checklist',
    resourceType: 'guide',
    title: 'SaaS Contracten Checklist: De complete gids voor ICT-bedrijven',
    subtitle:
      '50+ essentiële clausules voor waterdichte SaaS-overeenkomsten die uw recurring revenue beschermen.',
    heroImage: {
      src: '/images/resources/saas-checklist-hero.jpg',
      alt: 'SaaS Contracten Checklist voor ICT-bedrijven',
      width: 1200,
      height: 630,
    },
    sections: [
      {
        type: 'text',
        content:
          'Deze uitgebreide checklist is speciaal ontwikkeld voor Nederlandse SaaS-providers en software-bedrijven die hun contracten professioneel willen inrichten. Op basis van 10+ jaar ervaring in de tech-industrie delen we de meest kritische contractuele aandachtspunten die vaak over het hoofd worden gezien.',
      },
      {
        type: 'text',
        content:
          'Wat krijgt u? Een praktische checklist met 50+ essentiële clausules, concrete voorbeeldteksten, specifieke aandachtspunten voor verschillende SaaS-modellen (B2B, B2C, Enterprise), tips voor internationale contracten en een bonus sectie over aansprakelijkheidsbeperking.',
      },
      {
        type: 'image',
        image: {
          src: '/images/resources/saas-checklist-preview.png',
          alt: 'Preview van de SaaS contracten checklist',
          width: 800,
          height: 600,
        },
        caption: 'Een voorproefje van de complete checklist.',
      },
      {
        type: 'form',
        title: 'Download uw gratis SaaS contracten checklist',
        description: 'Vul uw gegevens in voor directe toegang tot de checklist.',
        config: {
          provider: 'custom',
          embedCode: '<!-- VirtualCounsel form embed voor SaaS checklist -->',
        },
      },
    ],
  },
  {
    slug: 'avg-compliance-gids-software',
    resourceType: 'guide',
    title: 'AVG Compliance Gids voor Software-bedrijven',
    subtitle:
      'Praktische stappen voor GDPR-compliant software ontwikkelen en data processing agreements opstellen.',
    heroImage: {
      src: '/images/resources/avg-guide-hero.jpg',
      alt: 'AVG GDPR Compliance Gids voor Software-bedrijven',
      width: 1200,
      height: 630,
    },
    sections: [
      {
        type: 'text',
        content:
          'Privacy by design is niet langer optioneel. Deze gids helpt software-ontwikkelaars en SaaS-providers om AVG-compliant te worden zonder de innovatie te remmen. We vertalen de complexe privacywetgeving naar concrete acties voor uw development team.',
      },
      {
        type: 'text',
        content:
          'Inclusief: Privacy by design principes voor developers, template verwerkersovereenkomst (DPA), data retention beleid voorbeelden, security maatregelen checklist, sub-processor management framework en incident response procedures.',
      },
      {
        type: 'form',
        title: 'Download de AVG Compliance Gids',
        description: 'Ontvang direct toegang tot alle templates en checklists.',
        config: {
          provider: 'custom',
          embedCode: '<!-- VirtualCounsel form embed voor AVG gids -->',
        },
      },
    ],
  },
  {
    slug: 'ip-bescherming-tech-startups',
    resourceType: 'whitepaper',
    title: 'Intellectueel Eigendom beschermen: De tech startup survival guide',
    subtitle: 'Voorkom dat uw code, algoritmes en innovaties in verkeerde handen vallen.',
    heroImage: {
      src: '/images/resources/ip-guide-hero.jpg',
      alt: 'Intellectueel Eigendom bescherming voor tech startups',
      width: 1200,
      height: 630,
    },
    sections: [
      {
        type: 'text',
        content:
          'Uw source code is uw belangrijkste asset. Deze whitepaper laat zien hoe u vanaf dag één uw intellectuele eigendom beschermt, van employee IP agreements tot open source compliance en van trade secrets tot software patents.',
      },
      {
        type: 'text',
        content:
          'Behandelde onderwerpen: IP overdrachtsovereenkomsten voor developers, open source risico management, bescherming van algoritmes en AI-modellen, investeringsklare IP-structuur opzetten, internationale IP-strategie voor tech-bedrijven.',
      },
      {
        type: 'image',
        image: {
          src: '/images/resources/ip-framework-preview.png',
          alt: 'IP bescherming framework voor tech bedrijven',
          width: 800,
          height: 600,
        },
        caption: 'Het VirtualCounsel IP-bescherming framework.',
      },
      {
        type: 'form',
        title: 'Download de IP Bescherming Guide',
        description: 'Krijg toegang tot het complete framework en alle templates.',
        config: {
          provider: 'custom',
          embedCode: '<!-- VirtualCounsel form embed voor IP guide -->',
        },
      },
    ],
  },
];

// Validate the sample data
try {
  z.array(resourceSchema).parse(sampleResourcesData);
} catch (error) {
  console.error(
    'Error validating sample resources data:',
    error instanceof z.ZodError ? error.errors : error
  );
  // Throw error during build or testing to catch issues early
  // throw new Error("Sample resources data validation failed");
}

// Return the sample resource data (can be replaced by CMS fetch)
export async function getResources(): Promise<z.infer<typeof resourceSchema>[]> {
  // In a real app, you might fetch and then validate data from a CMS here
  return sampleResourcesData;
}

// Find a resource by slug
export async function getResourceBySlug(
  slug: string
): Promise<z.infer<typeof resourceSchema> | undefined> {
  const resource = sampleResourcesData.find(r => r.slug === slug);
  // Optionally validate the found resource again if needed, though sampleResourcesData is already validated
  return resource;
}
