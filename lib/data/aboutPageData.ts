import { z } from 'zod';

// biome-ignore lint/style/useImportType: Schemas are used in z.infer<typeof T> which requires runtime imports
import {
  aboutFeatureCardsSectionDataSchema,
  aboutSectionDataSchema,
} from '../schemas/sections.schema';

export const aboutPageMainContentData: z.infer<typeof aboutSectionDataSchema> = {
  // Virtual Counsel - Maarten van Beek About Section
  badgeText: 'Over VirtualCounsel',
  heading: 'De Juridische Partner voor Tech',
  paragraphs: [
    'Ik ben Maarten van Beek, oprichter van VirtualCounsel. Met meer dan **10 jaar ervaring** in het adviseren van **ICT- en softwarebedrijven** begrijp ik de unieke uitdagingen waar tech-ondernemers tegenaan lopen.',
    'Na jaren als bedrijfsjurist bij verschillende tech-bedrijven zag ik hoe vaak juridisch advies niet aansloot bij de realiteit van **software ontwikkeling, SaaS-modellen en agile werken**. Daarom richtte ik VirtualCounsel op: juridisch advies dat écht werkt voor tech-bedrijven.',
    'Mijn aanpak is **praktisch en to-the-point**. Geen juridisch jargon, maar concrete oplossingen die aansluiten bij uw businessmodel. Of het nu gaat om **SaaS-contracten, open source compliance of AI-regelgeving** - ik spreek uw taal.',
    'Wat mij drijft? Het gevoel wanneer een klant zegt: **"Eindelijk een jurist die ons begrijpt!"** Dat is waar ik het voor doe - juridische zekerheid bieden zonder uw innovatie te remmen.',
  ],
  image: {
    src: '/images/team/virtual-counsel-maarten-about4.webp',
    alt: 'Maarten van Beek - Oprichter VirtualCounsel',
    width: 500,
    height: 500,
  },
  variant: 'classic',
  cta: {
    text: 'Plan een kennismaking',
    href: '/contact',
  },
};

export const aboutFeatureCardsSectionData: z.infer<typeof aboutFeatureCardsSectionDataSchema> = {
  badgeText: 'Waarom VirtualCounsel',
  heading: 'Juridische expertise die werkt voor tech',
  subheading:
    'Ontdek waarom meer dan 100 ICT-bedrijven kiezen voor VirtualCounsel als hun juridische partner.',
  featureCards: [
    {
      id: 'certified',
      title: 'ICT-recht specialist',
      description:
        'Gecertificeerd en erkend expert in technologie recht met jarenlange ervaring in de sector.',
      icon: 'Star',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 'proven',
      title: 'Bewezen resultaten',
      description:
        'Honderden succesvolle contracten en deals begeleid voor SaaS-bedrijven en tech startups.',
      icon: 'CheckCircle',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      id: 'practical',
      title: 'Praktische aanpak',
      description:
        'Geen juridisch jargon, maar concrete oplossingen die direct toepasbaar zijn in uw bedrijf.',
      icon: 'CheckCircle',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ],
};

// Validate data
try {
  aboutSectionDataSchema.parse(aboutPageMainContentData);
} catch (error) {
  console.error(
    'Error validating aboutPageMainContentData:',
    error instanceof z.ZodError ? error.errors : error
  );
}

// Virtual Counsel waarden en filosofie
export const aboutValuesSectionData = {
  badgeText: 'Mijn waarden',
  heading: 'De principes die mijn werk sturen',
  values: [
    'Tech-first denken: Juridisch advies dat aansluit bij moderne software ontwikkeling',
    'Transparantie: Vaste prijzen en duidelijke afspraken - geen verrassingen',
    'Pragmatisme: Oplossingen die werken in de praktijk, niet alleen op papier',
    'Toegankelijkheid: Direct contact met een specialist, geen juniors of tussenpersonen',
    'Innovatie mogelijk maken: Juridische zekerheid zonder uw groei te belemmeren',
  ],
};

// Klant testimonials voor About pagina
export const aboutSocialProofSectionData = {
  badgeText: 'Wat klanten zeggen',
  heading: 'Ervaringen van tech-ondernemers',
  socialProof: [
    {
      id: 'sp1',
      quote:
        'Eindelijk een jurist die snapt wat een API is en waarom onze SaaS-contracten anders moeten zijn dan traditionele software licenties. Maarten denkt mee vanuit ons businessmodel.',
      name: 'Thomas K.',
      title: 'CTO, CloudScale Solutions',
      image: {
        src: '/images/placeholders/placeholder.svg',
        alt: 'Thomas K. - CTO CloudScale Solutions',
        width: 60,
        height: 60,
      },
    },
    {
      id: 'sp2',
      quote:
        'De verwerkersovereenkomst die Maarten opstelde was niet alleen AVG-compliant, maar ook praktisch werkbaar. Hij begreep direct onze multi-tenant architectuur en de implicaties daarvan.',
      name: 'Linda M.',
      title: 'Legal Counsel, DataFlow B.V.',
      image: {
        src: '/images/placeholders/placeholder.svg',
        alt: 'Linda M. - Legal Counsel DataFlow',
        width: 60,
        height: 60,
      },
    },
    {
      id: 'sp3',
      quote:
        'Voor onze Series A hadden we snel onze juridische zaken op orde nodig. Maarten leverde binnen een week een complete legal cleanup. De investeerders waren onder de indruk.',
      name: 'Pieter V.',
      title: 'Founder & CEO, TechStart',
      image: {
        src: '/images/placeholders/placeholder.svg',
        alt: 'Pieter V. - Founder TechStart',
        width: 60,
        height: 60,
      },
    },
  ],
};

// Professionele reis van Maarten
export const aboutPersonalJourneySectionData = {
  badgeText: 'Mijn achtergrond',
  heading: 'Van bedrijfsjurist naar tech-specialist',
  subtitle: 'Hoe mijn ervaring in de tech-industrie leidde tot VirtualCounsel',
  journeySteps: [
    {
      id: 'step-1',
      timeframe: '2010-2015',
      title: 'Start als bedrijfsjurist in de tech-sector',
      description:
        'Als juridisch adviseur bij verschillende software- en IT-bedrijven ontdekte ik hoe traditioneel juridisch advies vaak botst met de realiteit van tech. Ik leerde de taal van developers, product owners en CTOs.',
    },
    {
      id: 'step-2',
      timeframe: '2015-2020',
      title: 'Specialisatie in SaaS en cloud computing',
      description:
        'Focus op de juridische uitdagingen van subscription modellen, data processing en internationale tech-deals. Ontwikkelde praktische frameworks voor recurring revenue bedrijven en API-economie.',
    },
    {
      id: 'step-3',
      timeframe: '2020-heden',
      title: 'VirtualCounsel: juridisch advies voor de nieuwe economie',
      description:
        'Met VirtualCounsel combineer ik diepgaande juridische kennis met begrip van moderne technologie. Van AI Act compliance tot open source strategie - ik help tech-bedrijven veilig innoveren.',
    },
  ],
  image: {
    src: '/images/team/virtual-counsel-maarten-about3.webp',
    alt: 'Professionele ontwikkeling van traditioneel recht naar tech-specialisatie',
    width: 500,
    height: 400,
  },
};

// Kwalificaties en expertise
export const aboutCredentialsSectionData = {
  badgeText: 'Expertise & kwalificaties',
  heading: 'Specialistische kennis voor de tech-industrie',
  subtitle:
    'Continue ontwikkeling in zowel juridische als technologische expertise om u het beste advies te kunnen geven',
  credentials: [
    {
      id: 'credential-1',
      type: 'Certificering',
      title: 'Certified Data Protection Officer (DPO)',
      issuer: 'Privacy & Security Academy',
      year: '2021',
      description:
        'Diepgaande kennis van GDPR/AVG specifiek voor SaaS en cloud diensten. Essentieel voor het opstellen van verwerkersovereenkomsten en privacy compliance.',
      icon: 'award',
    },
    {
      id: 'credential-2',
      type: 'Opleiding',
      title: 'Master IT-recht & Intellectueel Eigendom',
      issuer: 'Universiteit van Amsterdam',
      year: '2012',
      description:
        'Specialisatie in software licenties, open source recht en digitale diensten. Basis voor mijn expertise in tech-contracten.',
      icon: 'book',
    },
    {
      id: 'credential-3',
      type: 'Ervaring',
      title: 'Legal advisor tech scale-ups',
      issuer: 'Diverse SaaS & software bedrijven',
      year: '10+ jaar',
      description:
        'Hands-on ervaring met funding rondes, internationale expansie, partner agreements en exit trajecten. Ik ken de groei-uitdagingen van tech-bedrijven van binnenuit.',
      icon: 'star',
    },
  ],
  cta: {
    text: 'Bekijk onze diensten',
    href: '/services',
  },
};

// Filosofie en aanpak
export const aboutPhilosophySectionData = {
  badgeText: 'Onze aanpak',
  heading: 'Juridisch advies dat innovatie mogelijk maakt',
  subtitle: 'Hoe we complexe juridische vraagstukken vertalen naar praktische oplossingen',
  philosophyPoints: [
    {
      id: 'philosophy-1',
      title: 'Business-first benadering',
      description:
        'We beginnen met uw businessmodel en doelen. Juridische oplossingen moeten uw groei ondersteunen, niet belemmeren. Daarom denken we eerst commercieel, dan pas juridisch.',
      icon: 'heart',
    },
    {
      id: 'philosophy-2',
      title: 'Preventief in plaats van reactief',
      description:
        "Voorkomen is beter dan genezen. We helpen u juridische risico's vroegtijdig te identificeren en aan te pakken, voordat ze kostbare problemen worden.",
      icon: 'compass',
    },
    {
      id: 'philosophy-3',
      title: 'Kennis delen maakt sterker',
      description:
        'We geloven in empowerment door educatie. Daarom leggen we niet alleen uit wát we adviseren, maar ook waarom. Zo bouwt u intern juridische kennis op.',
      icon: 'lightbulb',
    },
  ],
  quote: {
    text: 'Goed juridisch advies maakt innovatie mogelijk, slecht juridisch advies remt het af.',
    author: 'Maarten van Beek',
  },
  image: {
    src: '/images/general/handshake.webp',
    alt: 'VirtualCounsel filosofie - balans tussen juridische zekerheid en business innovatie',
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
