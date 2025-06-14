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
    'Ik ben Maarten van Beek, oprichter van VirtualCounsel. Met **jarenlange ervaring** in het adviseren van **ICT- en softwarebedrijven** begrijp ik de unieke uitdagingen waar tech-ondernemers tegenaan lopen.',
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
  subheading: 'Ontdek waarom ICT-bedrijven kiezen voor VirtualCounsel als hun juridische partner.',
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
      description: 'Succesvolle contracten en deals begeleid voor SaaS-bedrijven en tech startups.',
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
    'Klantgerichtheid: Uw behoeften en doelen staan altijd centraal in mijn juridische advies',
    'Kwaliteit: Diepgaande expertise en zorgvuldige uitwerking van elk document',
    'Betrouwbaarheid: Afspraken nakomen en beschikbaar zijn wanneer u mij nodig heeft',
    'Passie: Echte betrokkenheid bij het succes van uw tech-onderneming',
    'Samenwerking: Als juridische partner die met u meedenkt en meegroeit',
    'Flexibiliteit: Aanpasbaar aan uw specifieke situatie en groeiende behoeften',
    'Professionaliteit: Uitstekende service met respect voor uw tijd en budget',
    'Resultaatgerichtheid: Praktische oplossingen die uw business vooruit helpen',
    'Transparantie: Vaste prijzen en heldere communicatie zonder verrassingen achteraf',
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
        'Sinds een aantal maanden werken we samen met Maarten van VirtualCounsel en dat bevalt goed. Hij doet pragmatische reviews van onze juridische documenten, staat ons bij in gesprek met potentiële klanten waar vragen over voorwaarden zijn en heeft een commercieel model waarmee zijn dienst goed betaalbaar is. Aanrader!',
      name: 'Ivar van Duuren',
      title: 'Co-founder ISOPlanner',
    },
    {
      id: 'sp2',
      quote:
        'Onze samenwerking met Maarten van Beek van VirtualCounsel was zeer vruchtbaar. Hij heeft ons bijgestaan in het opstellen van algemene voorwaarden, een Service Level Agreement (SLA), en een verwerkersovereenkomst voor meerdere van onze ondernemingen. Zijn expertise in juridische zaken is een waardevolle toevoeging in het succes van deze projecten. De communicatie met Maarten verliep steeds efficiënt en professioneel, wat het proces aanzienlijk vergemakkelijkte. Wij zijn uitermate tevreden over de kwaliteit van de dienstverlening en bevelen Maarten van harte aan als een deskundige en betrouwbare jurist.',
      name: 'Joram van Doorn',
      title: 'Founder SiteOnline',
    },
    {
      id: 'sp3',
      quote:
        'Maarten heeft ons uitstekend ondersteund bij het opstellen van een maatwerk SLA en nieuwe algemene voorwaarden. In mijn zoektocht naar de juiste expertise heb ik contact gehad met verschillende partijen, maar Maarten was de enige die daadwerkelijk advies gaf en met ons meedacht. Hij is snel, betrouwbaar en betrokken. Een aanrader voor iedereen die zoekt naar een partner die net dat stapje extra zet!',
      name: 'Joey Deckers',
      title: 'Founder Retrii',
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
      timeframe: 'Startperiode',
      title: 'Begin als jurist in de tech-sector',
      description:
        'Als juridisch adviseur bij verschillende ICT- en softwarebedrijven ontdekte ik hoe traditioneel juridisch advies vaak botst met de realiteit van tech. Ik leerde de taal van developers en ondernemers.',
    },
    {
      id: 'step-2',
      timeframe: 'Specialisatie',
      title: 'Focus op ICT- en softwarerecht',
      description:
        'Jarenlange ervaring opgebouwd in de juridische uitdagingen van ICT- en softwarebedrijven. Van contracten tot privacy, van intellectueel eigendom tot commerciële overeenkomsten.',
    },
    {
      id: 'step-3',
      timeframe: 'Heden',
      title: 'VirtualCounsel: gespecialiseerd juridisch advies',
      description:
        'Met VirtualCounsel bied ik gespecialiseerd juridisch advies voor ICT- en softwarebedrijven. Een expert die hun taal spreekt en hun uitdagingen begrijpt.',
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
      type: 'Achtergrond',
      title: 'ICT-jurist',
      issuer: 'Gespecialiseerd in ICT- en softwarerecht',
      year: '',
      description:
        'Jarenlange ervaring met het juridisch bijstaan van verschillende ICT- en softwarebedrijven. Gespecialiseerd, effectief en duidelijk juridisch advies.',
      icon: 'award',
    },
    {
      id: 'credential-2',
      type: 'Expertise',
      title: 'ICT-contracten en privacy',
      issuer: 'Diverse ICT- en softwarebedrijven',
      year: '',
      description:
        'Ervaring met contracten, algemene voorwaarden, privacy compliance en alle juridische aspecten die ICT- en softwarebedrijven tegenkomen.',
      icon: 'book',
    },
    {
      id: 'credential-3',
      type: 'Aanpak',
      title: 'Praktisch en commercieel gericht',
      issuer: 'VirtualCounsel',
      year: '',
      description:
        'Een expert die de taal van ICT- en softwarebedrijven spreekt en begrijpt wat er speelt in de sector. Flexibel, betaalbaar en altijd klaar om juridische zaken efficiënt te regelen.',
      icon: 'star',
    },
  ],
  cta: {
    text: 'Bekijk mijn diensten',
    href: '/services',
  },
};

// Filosofie en aanpak
export const aboutPhilosophySectionData = {
  badgeText: 'Mijn aanpak',
  heading: 'Juridisch advies dat innovatie mogelijk maakt',
  subtitle: 'Hoe ik complexe juridische vraagstukken vertaal naar praktische oplossingen',
  philosophyPoints: [
    {
      id: 'philosophy-1',
      title: 'Business-first benadering',
      description:
        'Ik begin met uw businessmodel en doelen. Juridische oplossingen moeten uw groei ondersteunen, niet belemmeren. Daarom denk ik eerst commercieel, dan pas juridisch.',
      icon: 'heart',
    },
    {
      id: 'philosophy-2',
      title: 'Preventief in plaats van reactief',
      description:
        "Voorkomen is beter dan genezen. Ik help u juridische risico's vroegtijdig te identificeren en aan te pakken, voordat ze kostbare problemen worden.",
      icon: 'compass',
    },
    {
      id: 'philosophy-3',
      title: 'Kennis delen maakt sterker',
      description:
        'Ik geloof in empowerment door educatie. Daarom leg ik niet alleen uit wát ik adviseer, maar ook waarom. Zo bouwt u intern juridische kennis op.',
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
