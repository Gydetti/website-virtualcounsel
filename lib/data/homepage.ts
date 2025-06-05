import { z } from 'zod';

import {
  aboutSectionDataSchema,
  blogSectionDataSchema,
  clientsSectionDataSchema,
  contactSectionDataSchema,
  ctaSectionDataSchema,
  featuresSectionDataSchema,
  heroSectionDataSchema,
  homepageFaqSectionDataSchema,
  kpiSectionDataSchema,
  pricingSectionDataSchema,
  problemPainSectionDataSchema,
  processSectionDataSchema,
  servicesSectionDataSchema,
  solutionVisionSectionDataSchema,
  testimonialsSectionDataSchema,
  valuePropSectionDataSchema,
  // Import other section schemas as needed
} from '../schemas/sections.schema';

// Note: The old PropType imports are removed as we'll use Zod inferred types.

export const heroSectionData: z.infer<typeof heroSectionDataSchema> = {
  badgeText: 'Juridisch advies voor de tech industrie',
  headline: 'De juridische partner voor ICT- & softwarebedrijven',
  subheadline:
    'We nemen het juridische werk uit handen zodat u zich kunt focussen op uw onderneming. Geen standaard contracten, maar maatwerk dat past bij uw specifieke situatie.',
  primaryCta: { text: 'Maak een afspraak', href: '/contact' },
  secondaryCta: { text: 'Bekijk onze diensten', href: '/services' },
  showSecondaryCta: true,
  typingWords: ['SaaS leveranciers', 'IT dienstverleners', 'Software ontwikkelaars'],
  stats: [
    { value: 5, suffix: '+', label: 'Jaar ervaring in ICT-recht' },
    { value: 50, suffix: '+', label: 'Tevreden klanten' },
    { value: 100, suffix: '%', label: 'Focus op tech' },
    { value: 2, suffix: ' weken', label: 'Gemiddelde levertijd' },
  ],
  image: {
    src: '/images/hero/hero-main.webp',
    alt: 'Maarten van Beek - VirtualCounsel juridisch advies',
  },
  showHelpedStats: false,
  showOverlayStat: false,
  overlayTitle: '',
  overlayValue: '',
};

export const featuresSectionData: z.infer<typeof featuresSectionDataSchema> = {
  badgeText: 'Features',
  heading: 'Features comparison',
  description: 'Features comparison description',
  comparison: {
    without: {
      title: 'Without our solution',
      items: [],
    },
    with: {
      title: 'With our solution',
      items: [],
    },
  },
  cta: { text: 'Learn more', href: '/services' },
};

export const clientsSectionData: z.infer<typeof clientsSectionDataSchema> = {
  badgeText: 'Vertrouwd door',
  heading: 'Bedrijven die op ons vertrouwen',
  clients: [
    {
      name: 'NN Group',
      logo: {
        src: '/images/placeholders/logo-nn.svg',
        alt: 'NN Group Logo',
      },
    },
    {
      name: 'Deloitte',
      logo: {
        src: '/images/placeholders/logo-deloitte.svg',
        alt: 'Deloitte Logo',
      },
    },
    {
      name: 'ICT Waarborg',
      logo: {
        src: '/images/placeholders/logo-ict-waarborg.svg',
        alt: 'ICT Waarborg Logo',
      },
    },
    {
      name: 'ISOPlanner',
      logo: {
        src: '/images/placeholders/logo-isoplanner.svg',
        alt: 'ISOPlanner Logo',
      },
    },
    {
      name: 'Blendle',
      logo: {
        src: '/images/placeholders/logo-blendle.svg',
        alt: 'Blendle Logo',
      },
    },
    {
      name: 'Sanoma',
      logo: {
        src: '/images/placeholders/logo-sanoma.svg',
        alt: 'Sanoma Logo',
      },
    },
  ],
};

export const testimonialsSectionData: z.infer<typeof testimonialsSectionDataSchema> = {
  badgeText: 'Succesverhalen',
  heading: 'Wat onze klanten zeggen',
  subtitle:
    'Ontdek hoe we ICT- en softwarebedrijven hebben geholpen met praktisch juridisch advies.',
  testimonials: [
    {
      id: 'testimonial-1',
      quote:
        'Hij doet pragmatische reviews waarbij hij rekening houdt met de commerciële context, zodat er geen overbodige obstakels worden opgeworpen. Hij denkt mee, stelt goede alternatieven voor, en komt snel tot de kern.',
      name: 'Tim van Dalen',
      title: 'CEO, Tech Startup',
      image: {
        src: '/images/placeholders/testimonial-1.jpg',
        alt: 'Tim van Dalen',
      },
      rating: 5,
    },
    {
      id: 'testimonial-2',
      quote:
        'VirtualCounsel begrijpt echt wat er speelt in onze industrie. Geen juridisch jargon, maar concrete oplossingen die werken. De vaste prijzen geven ons zekerheid en de snelle levertijden zijn een verademing.',
      name: 'Sarah Janssen',
      title: 'Legal Manager, SaaS Provider',
      image: {
        src: '/images/placeholders/testimonial-2.jpg',
        alt: 'Sarah Janssen',
      },
      rating: 5,
    },
    {
      id: 'testimonial-3',
      quote:
        'Eindelijk een jurist die onze taal spreekt! Maarten kent de ins en outs van software development en dat merk je in zijn adviezen. Hij is een echte partner, geen externe adviseur.',
      name: 'Erik Vermeer',
      title: 'CTO, Software Bureau',
      image: {
        src: '/images/placeholders/testimonial-3.jpg',
        alt: 'Erik Vermeer',
      },
      rating: 5,
    },
  ],
};

export const problemPainSectionData: z.infer<typeof problemPainSectionDataSchema> = {
  badgeText: 'De uitdaging',
  heading: 'De kosten van standaard contracten',
  description:
    'ICT- en softwarebedrijven lopen tegen specifieke juridische uitdagingen aan die generieke juristen vaak niet begrijpen.',
  calloutText: 'Elke dag zonder goede juridische bescherming is een risico voor uw bedrijf.',
  cards: [
    {
      id: 'pain-card-1',
      title: 'Generieke contracten',
      description:
        'Standaard templates die niet passen bij SaaS modellen, agile development of managed services.',
    },
    {
      id: 'pain-card-2',
      title: 'Onbegrip voor tech',
      description:
        "Juristen die API's, SLA's en open source niet begrijpen en daarom verkeerde adviezen geven.",
    },
    {
      id: 'pain-card-3',
      title: 'Trage levering',
      description:
        'Weken wachten op contracten terwijl uw deal on hold staat of de ontwikkeling vertraagt.',
    },
    {
      id: 'pain-card-4',
      title: 'Onvoorspelbare kosten',
      description: 'Nacalculaties en verrassingen op de factuur maken budgetteren onmogelijk.',
    },
  ],
};

export const solutionVisionSectionData: z.infer<typeof solutionVisionSectionDataSchema> = {
  badgeText: 'De oplossing',
  heading: 'Concrete juridische bescherming in 4 stappen',
  description:
    'Met VirtualCounsel krijgt u een juridische partner die uw business begrijpt en met u meedenkt.',
  imagineTitle: 'Stel u voor:',
  benefits: [
    'Contracten die perfect aansluiten bij uw businessmodel',
    'Een jurist die uw technische taal spreekt',
    'Documenten binnen 1-2 weken geleverd',
    'Vaste prijzen zonder verrassingen achteraf',
    'Direct toegang tot een specialist, geen juniors',
  ],
  calloutText: 'Van juridisch obstakel naar strategisch voordeel.',
  calloutCta: { text: 'Ontdek onze aanpak', href: '/about' },
};

export const ctaSectionData: z.infer<typeof ctaSectionDataSchema> = {
  badgeText: 'Klaar om te starten?',
  heading: 'Laten we uw juridische zaken regelen',
  description:
    'Boek een gratis kennismakingsgesprek en ontdek hoe we uw ICT-bedrijf kunnen beschermen en laten groeien.',
  primaryCta: { text: 'Plan een kennismaking', href: '/contact' },
  secondaryCta: { text: 'Download gratis SaaS gids', href: '/resources' },
};

export const valuePropSectionData: z.infer<typeof valuePropSectionDataSchema> = {
  badgeText: 'Waarom kiezen voor VirtualCounsel?',
  heading: 'Een juridische partner die uw business begrijpt',
  subheading:
    'Met VirtualCounsel haal je geen standaard jurist in huis, maar een betrokken juridische partner die jouw bedrijf echt begrijpt.',
  benefits: [
    {
      id: 'benefit-1',
      title: 'Diepgaande ICT-kennis',
      description:
        'Jarenlange ervaring in de tech-industrie betekent dat we uw uitdagingen echt begrijpen.',
      icon: 'check-circle',
    },
    {
      id: 'benefit-2',
      title: 'Vaste prijzen',
      description: 'Geen verrassingen achteraf. U weet vooraf exact wat het kost.',
      icon: 'check-circle',
    },
    {
      id: 'benefit-3',
      title: 'Snelle levering',
      description: 'Documenten binnen 1-2 weken, zodat u door kunt met ondernemen.',
      icon: 'check-circle',
    },
  ],
};

export const pricingSectionData: z.infer<typeof pricingSectionDataSchema> = {
  badgeText: 'Pricing',
  heading: 'Pricing plans',
  description: 'Choose the plan that fits your needs',
  popularBadgeText: 'Most popular',
  cards: [
    {
      id: 'basic',
      title: 'Basic',
      price: '0',
      features: ['Basic features'],
      cta: {
        text: 'Get started',
        href: '/contact',
      },
      popular: false,
    },
  ],
};

export const homepageFaqSectionData: z.infer<typeof homepageFaqSectionDataSchema> = {
  badgeText: 'Veelgestelde vragen',
  heading: 'Antwoorden op uw vragen',
  description:
    'Hier vindt u antwoorden op de meest gestelde vragen over onze dienstverlening. Staat uw vraag er niet bij? Neem gerust contact op!',
  categories: [
    {
      category: 'Algemeen',
      questions: [
        {
          question: 'Voor welke bedrijven is VirtualCounsel geschikt?',
          answer:
            'Wij zijn gespecialiseerd in juridisch advies voor ICT- en softwarebedrijven, waaronder SaaS providers, software ontwikkelaars, IT dienstverleners en tech startups.',
        },
        {
          question: 'Wat maakt VirtualCounsel anders dan andere juristen?',
          answer:
            'Wij hebben diepgaande kennis van de tech-industrie, werken met vaste prijzen, leveren binnen 1-2 weken en u heeft direct contact met een specialist - geen juniors of assistenten.',
        },
        {
          question: "In welke regio's bent u actief?",
          answer:
            'Wij werken volledig digitaal en bedienen klanten door heel Nederland. Voor internationale contracten hebben we ervaring met Engels recht en internationale tech-deals.',
        },
      ],
    },
    {
      category: 'Werkwijze',
      questions: [
        {
          question: 'Hoe werkt het traject?',
          answer:
            'We starten met een gratis kennismakingsgesprek, gevolgd door een intake waar we uw situatie analyseren. Daarna stellen we een aanpak voor met vaste prijs en levertijd. Na akkoord gaan we direct aan de slag.',
        },
        {
          question: 'Hoe snel kan ik documenten verwachten?',
          answer:
            'De meeste documenten leveren we binnen 1-2 weken. Voor complexe projecten maken we vooraf een realistische planning met u.',
        },
        {
          question: 'Bieden jullie ook doorlopend juridisch advies?',
          answer:
            'Ja, veel klanten kiezen voor een strippenkaart of abonnement voor doorlopende juridische ondersteuning. Dit bespreken we graag tijdens het kennismakingsgesprek.',
        },
      ],
    },
    {
      category: 'Tarieven',
      questions: [
        {
          question: 'Wat zijn jullie tarieven?',
          answer:
            'Wij werken met vaste prijzen per project, zodat u vooraf weet waar u aan toe bent. De prijs is afhankelijk van de complexiteit en omvang. Geen uurtje-factuurtje of nacalculaties.',
        },
        {
          question: 'Zijn er opstartkosten?',
          answer:
            'Nee, het kennismakingsgesprek is gratis en vrijblijvend. U betaalt pas wanneer we een concrete opdracht overeenkomen.',
        },
        {
          question: 'Kan ik ook per uur afnemen?',
          answer:
            'Voor ad-hoc vragen is dat mogelijk, maar de meeste klanten kiezen voor projectprijzen of een strippenkaart omdat dat meer zekerheid biedt.',
        },
      ],
    },
  ],
  cta: { text: 'Bekijk alle veelgestelde vragen', href: '/faq' },
};

// Services Preview Section on Homepage
export const servicesPreviewSectionData: Omit<
  z.infer<typeof servicesSectionDataSchema>,
  'services'
> = {
  heading: 'Onze expertise',
  description:
    'Specialistische juridische diensten voor software- en ICT-bedrijven. Van contracten tot compliance.',
  viewAllCta: { text: 'Bekijk alle diensten', href: '/services' },
  displayType: 'grid',
};

// Blog Preview Section on Homepage
export const blogPreviewSectionData: Omit<z.infer<typeof blogSectionDataSchema>, 'posts'> = {
  badgeText: 'Kennisbank',
  heading: 'Laatste juridische inzichten',
  subtitle:
    'Praktische tips en updates over ICT-recht, contracten en compliance voor tech-bedrijven.',
  readMoreText: 'Lees meer',
  viewAllCta: { text: 'Naar de kennisbank', href: '/blog' },
};

export const aboutSectionData: z.infer<typeof aboutSectionDataSchema> = {
  badgeText: 'Over VirtualCounsel',
  heading: 'De jurist die jullie taal spreekt',
  paragraphs: [
    'Ik ben Maarten van Beek, oprichter van VirtualCounsel. Met jarenlange ervaring in de tech-industrie begrijp ik de unieke uitdagingen waar ICT- en softwarebedrijven mee te maken hebben.',
    'Bij grote kantoren was ik vaak de enige die echt begreep wat een API was of waarom SaaS-modellen andere contracten nodig hebben. Daarom richtte ik VirtualCounsel op: juridisch advies dat aansluit bij de realiteit van tech-bedrijven.',
    'Mijn klanten waarderen vooral de combinatie van diepgaande juridische kennis en begrip voor hun business. Geen eindeloze discussies over technische details, maar direct to-the-point advies dat werkt.',
  ],
  image: {
    src: '/images/placeholders/maarten-van-beek.jpg',
    alt: 'Maarten van Beek - Oprichter VirtualCounsel',
  },
  variant: 'imageRight',
  stats: [
    { id: 'stat-experience', value: '10+ jaar', label: 'Ervaring in ICT-recht' },
    { id: 'stat-clients', value: '50+ bedrijven', label: 'Geholpen' },
    {
      id: 'stat-delivery',
      value: '1-2 weken',
      label: 'Gemiddelde levertijd',
    },
  ],
  cta: { text: 'Meer over mijn aanpak', href: '/about' },
  philosophy: {
    title: 'Mijn filosofie',
    text: 'Juridisch advies moet uw business vooruit helpen, niet vertragen. Daarom werk ik pragmatisch, snel en altijd met uw commerciële doelen in gedachten. Geen juridisch geneuzel, maar concrete oplossingen.',
  },
  learnMoreText: 'Leer mij beter kennen',
  featureCards: [
    {
      id: 'certified',
      title: 'ICT-recht specialist',
      description: 'Gecertificeerd en erkend expert in technologie recht',
      icon: 'Star',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 'proven',
      title: 'Bewezen resultaten',
      description: 'Honderden succesvolle contracten en deals begeleid',
      icon: 'CheckCircle',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
  ],
};

// Process Section - showing 4-step approach
export const processSectionData: z.infer<typeof processSectionDataSchema> = {
  badgeText: 'Onze aanpak',
  heading: 'Van probleem naar oplossing in 4 stappen',
  subtitle:
    'Een transparant proces waarbij u altijd weet waar u aan toe bent. Geen verrassingen, wel resultaat.',
  steps: [
    {
      id: 'step-01',
      number: '01',
      title: 'Gratis kennismaking',
      description: 'We bespreken uw situatie en bepalen of we een match zijn.',
      details: [
        '30 minuten videogesprek via Calendly',
        'Vrijblijvend en zonder kosten',
        'Direct praktisch advies waar mogelijk',
      ],
    },
    {
      id: 'step-02',
      number: '02',
      title: 'Intake & analyse',
      description: 'Diepgaande analyse van uw juridische vraagstuk en businessmodel.',
      details: [
        'Inventarisatie van uw specifieke situatie',
        'Analyse van bestaande contracten',
        "Identificatie van risico's en kansen",
      ],
    },
    {
      id: 'step-03',
      number: '03',
      title: 'Voorstel & prijs',
      description: 'Concrete aanpak met vaste prijs en duidelijke levertijd.',
      details: [
        'Gedetailleerd plan van aanpak',
        'Vaste prijs zonder verrassingen',
        'Realistische planning (meestal 1-2 weken)',
      ],
    },
    {
      id: 'step-04',
      number: '04',
      title: 'Uitvoering & nazorg',
      description: 'Professionele documenten met uitleg en ondersteuning bij implementatie.',
      details: [
        'Documenten op maat voor uw situatie',
        'Persoonlijke toelichting en Q&A',
        'Gratis kleine aanpassingen binnen 30 dagen',
      ],
    },
  ],
};

// Contact Section on Homepage
export const contactSectionData: z.infer<typeof contactSectionDataSchema> = {
  badgeText: 'Neem contact op',
  heading: 'Laten we kennismaken',
  subtitle:
    'Heeft u juridische vragen over uw ICT-bedrijf? Plan een gratis kennismakingsgesprek of stuur een bericht. Ik reageer meestal binnen één werkdag.',
  formTitle: 'Stuur een bericht',
  infoTitle: 'Contactgegevens',
  buttonLabels: {
    default: 'Verstuur bericht',
    submitting: 'Wordt verzonden...',
    success: 'Bericht verzonden!',
  },
};

// ++ Data for KPI Stats Section on Homepage ++
export const kpiSectionData: z.infer<typeof kpiSectionDataSchema> = {
  stats: [
    {
      id: 'kpi-experience',
      value: 10,
      suffix: '+',
      label: 'Years of experience',
    },
    {
      id: 'kpi-satisfaction',
      value: 98,
      suffix: '%',
      label: 'Client satisfaction rate',
    },
    {
      id: 'kpi-projects',
      value: 40,
      suffix: '+',
      label: 'Successful projects delivered',
    },
    { id: 'kpi-clients', value: 300, suffix: '+', label: 'Happy clients' },
  ],
};

// Schema validation for all exported data objects
try {
  heroSectionDataSchema.parse(heroSectionData);
  featuresSectionDataSchema.parse(featuresSectionData);
  clientsSectionDataSchema.parse(clientsSectionData);
  testimonialsSectionDataSchema.parse(testimonialsSectionData);
  pricingSectionDataSchema.parse(pricingSectionData);
  servicesSectionDataSchema.parse({
    ...servicesPreviewSectionData,
    services: [],
  });
  blogSectionDataSchema.parse({
    ...blogPreviewSectionData,
    posts: [
      {
        id: 'mock-post-validation',
        title: 'Mock Post for Validation',
        excerpt: 'This is a mock excerpt to satisfy Zod validation.',
        date: '2024-01-01',
        category: 'Mock Category',
        image: { src: '/placeholder.svg', alt: 'Mock Validation Image' },
        slug: 'mock-post-slug-validation',
      },
    ],
  });
  problemPainSectionDataSchema.parse(problemPainSectionData);
  solutionVisionSectionDataSchema.parse(solutionVisionSectionData);
  ctaSectionDataSchema.parse(ctaSectionData);
  valuePropSectionDataSchema.parse(valuePropSectionData);
  homepageFaqSectionDataSchema.parse(homepageFaqSectionData);
  aboutSectionDataSchema.parse(aboutSectionData);
  processSectionDataSchema.parse(processSectionData);
  contactSectionDataSchema.parse(contactSectionData);
  kpiSectionDataSchema.parse(kpiSectionData);
} catch (error) {
  console.error(
    'Error validating homepage data:',
    error instanceof z.ZodError ? error.errors : error
  );
  // Decide how to handle validation errors: throw, log, etc.
  // For now, logging to console during development is fine.
  // In a build step, you might want to throw to fail the build.
}
