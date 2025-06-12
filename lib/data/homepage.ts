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
  badgeText: 'Juridische partner voor ICT',
  headline: 'De juridische partner voor <span class="text-primary">ICT- & softwarebedrijven</span>',
  subheadline:
    'ICT-jurist Maarten van Beek helpt tech-bedrijven met praktisch juridisch advies. Gespecialiseerd in SaaS-contracten, IP-bescherming en compliance. Vaste prijzen, snelle levering en een partner die uw technologie begrijpt.',
  primaryCta: { text: 'Maak een afspraak', href: '/contact' },
  secondaryCta: { text: 'Bekijk mijn diensten', href: '/services' },
  showSecondaryCta: true,
  typingWords: ['Tech bedrijven'], // Minimal content to satisfy schema typing words
  stats: [
    { value: 100, suffix: '%', label: 'Focus op tech' },
    { value: 2, suffix: ' weken', label: 'Gemiddelde levertijd' },
    { value: 1, suffix: '', label: 'Specialist' },
    { value: 0, suffix: ' verrassingen', label: 'Vaste prijzen' },
  ],
  image: {
    src: '/images/team/virtual-counsel-maarten-hero-hq.webp',
    alt: 'Maarten van Beek - VirtualCounsel juridisch advies',
  },
  showHelpedStats: true,
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
  cta: { text: 'Lees meer', href: '/services' },
};

export const clientsSectionData: z.infer<typeof clientsSectionDataSchema> = {
  badgeText: 'Zij gingen u voor',
  heading: 'Vertrouwd door toonaangevende bedrijven',
  clients: [
    {
      name: 'NN Group',
      logo: {
        src: 'https://www.virtualcounsel.nl/images/nn.png',
        alt: 'NN Group Logo',
      },
    },
    {
      name: 'Deloitte',
      logo: {
        src: 'https://www.virtualcounsel.nl/images/deloitte.png',
        alt: 'Deloitte Logo',
      },
    },
    {
      name: 'Unravel',
      logo: {
        src: 'https://www.virtualcounsel.nl/images/UNRAVEL.png',
        alt: 'Unravel Logo',
      },
    },
    {
      name: 'Fleks',
      logo: {
        src: 'https://www.virtualcounsel.nl/images/FLEKS.png',
        alt: 'Fleks Logo',
      },
    },
    {
      name: 'Griffid',
      logo: {
        src: 'https://www.virtualcounsel.nl/images/GRIFFID.png',
        alt: 'Griffid Logo',
      },
    },
    {
      name: 'Mapiq',
      logo: {
        src: 'https://www.virtualcounsel.nl/images/MAPIQ.png',
        alt: 'Mapiq Logo',
      },
    },
    {
      name: 'TandemDrive',
      logo: {
        src: 'https://www.virtualcounsel.nl/images/logo-tandemdrive.svg',
        alt: 'TandemDrive Logo',
      },
    },
    {
      name: 'Pionative',
      logo: {
        src: 'https://www.virtualcounsel.nl/images/logo-pionative-7-png.png',
        alt: 'Pionative Logo',
      },
    },
    {
      name: 'Passionfruit',
      logo: {
        src: 'https://www.virtualcounsel.nl/images/passionfruit.png',
        alt: 'Passionfruit Logo',
      },
    },
    {
      name: 'DreamSolution',
      logo: {
        src: 'https://www.virtualcounsel.nl/images/dreamsolution.svg',
        alt: 'DreamSolution Logo',
      },
    },
    {
      name: 'ICT Waarborg',
      logo: {
        src: 'https://www.virtualcounsel.nl/images/ictwaarborg.png',
        alt: 'ICT Waarborg Logo',
      },
    },
    {
      name: 'Equip',
      logo: {
        src: 'https://www.virtualcounsel.nl/images/equip.png',
        alt: 'Equip Logo',
      },
    },
  ],
};

export const testimonialsSectionData: z.infer<typeof testimonialsSectionDataSchema> = {
  badgeText: 'Succesverhalen',
  heading: 'Wat mijn klanten zeggen',
  subtitle: 'Ontdek hoe ik ICT- en softwarebedrijven heb geholpen met praktisch juridisch advies.',
  testimonials: [
    {
      id: 'testimonial-1',
      quote:
        'Sinds een aantal maanden werken we samen met Maarten van VirtualCounsel en dat bevalt goed. Hij doet pragmatische reviews van onze juridische documenten, staat ons bij in gesprek met potentiële klanten waar vragen over voorwaarden zijn en heeft een commercieel model waarmee zijn dienst goed betaalbaar is. Aanrader!',
      name: 'Ivar van Duuren',
      title: 'Co-founder ISOPlanner',
      rating: 5,
    },
    {
      id: 'testimonial-2',
      quote:
        'Onze samenwerking met Maarten van Beek van VirtualCounsel was zeer vruchtbaar. Hij heeft ons bijgestaan in het opstellen van algemene voorwaarden, een Service Level Agreement (SLA), en een verwerkersovereenkomst voor meerdere van onze ondernemingen. Zijn expertise in juridische zaken is een waardevolle toevoeging in het succes van deze projecten. De communicatie met Maarten verliep steeds efficiënt en professioneel, wat het proces aanzienlijk vergemakkelijkte. Wij zijn uitermate tevreden over de kwaliteit van de dienstverlening en bevelen Maarten van harte aan als een deskundige en betrouwbare jurist.',
      name: 'Joram van Doorn',
      title: 'Founder SiteOnline',
      rating: 5,
    },
    {
      id: 'testimonial-3',
      quote:
        'Maarten heeft ons uitstekend ondersteund bij het opstellen van een maatwerk SLA en nieuwe algemene voorwaarden. In mijn zoektocht naar de juiste expertise heb ik contact gehad met verschillende partijen, maar Maarten was de enige die daadwerkelijk advies gaf en met ons meedacht. Hij is snel, betrouwbaar en betrokken. Een aanrader voor iedereen die zoekt naar een partner die net dat stapje extra zet!',
      name: 'Joey Deckers',
      title: 'Founder Retrii',
      rating: 5,
    },
  ],
};

export const problemPainSectionData: z.infer<typeof problemPainSectionDataSchema> = {
  badgeText: 'Juridische uitdagingen tech-bedrijven',
  heading: 'Waarom standaard juristen niet werken voor ICT-bedrijven',
  description:
    'ICT- en softwarebedrijven hebben specialistische juridische ondersteuning nodig. Generieke juristen begrijpen SaaS-modellen, API-contracten en intellectueel eigendom van software vaak niet.',
  calloutText:
    "Zonder gespecialiseerd juridisch advies mist u kansen en loopt u onnodige risico's.",
  cards: [
    {
      id: 'pain-card-1',
      title: 'SaaS-contracten die niet kloppen',
      description:
        'Standaard templates passen niet bij Software as a Service, API-integraties of agile development methodieken.',
    },
    {
      id: 'pain-card-2',
      title: 'Geen begrip voor ICT-recht',
      description:
        "Traditionele juristen snappen intellectueel eigendom software, GDPR voor SaaS en SLA's niet.",
    },
    {
      id: 'pain-card-3',
      title: 'Lange wachttijden',
      description:
        'Weken wachten op juridische documenten terwijl uw klanten, investeerders of partners wachten.',
    },
    {
      id: 'pain-card-4',
      title: 'Uurtje-factuurtje mentaliteit',
      description:
        'Nacalculaties en onduidelijke kosten maken budgettering voor juridisch advies onmogelijk.',
    },
  ],
};

export const solutionVisionSectionData: z.infer<typeof solutionVisionSectionDataSchema> = {
  badgeText: 'De oplossing',
  heading: 'Juridische zekerheid voor uw ICT-bedrijf',
  description:
    'Met VirtualCounsel krijgt u een juridische partner die uw business begrijpt en met u meedenkt.',
  imagineTitle: 'Hoe het ook kan zijn:',
  benefits: [
    'Contracten die perfect aansluiten bij uw businessmodel',
    'Een jurist die uw technische taal spreekt',
    'Documenten binnen 1-2 weken geleverd',
    'Vaste prijzen zonder verrassingen achteraf',
    'Direct toegang tot een specialist, geen juniors',
    'Juridische partner die met uw bedrijf meegroeit',
  ],
  calloutText: 'Van juridisch obstakel naar strategisch voordeel.',
  calloutCta: { text: 'Ontdek mijn aanpak', href: '/about' },
};

export const ctaSectionData: z.infer<typeof ctaSectionDataSchema> = {
  badgeText: 'Klaar om te starten?',
  heading: 'Laten we uw juridische zaken regelen',
  description:
    'Boek een gratis kennismakingsgesprek en ontdek hoe ik uw ICT-bedrijf kan beschermen en laten groeien.',
  primaryCta: { text: 'Plan een kennismaking', href: '/contact' },
  secondaryCta: { text: 'Download gratis SaaS gids', href: '/resources' },
};

export const valuePropSectionData: z.infer<typeof valuePropSectionDataSchema> = {
  badgeText: 'Waarom kiezen voor VirtualCounsel?',
  heading: 'Een juridische partner die uw business begrijpt',
  subheading:
    'Met VirtualCounsel haalt u geen standaard jurist in huis, maar een betrokken juridische partner die uw bedrijf echt begrijpt en met u meegroeit.',
  benefits: [
    {
      id: 'benefit-1',
      title: 'Vaste prijzen - geen nacalculatie',
      description:
        'Transparante prijsstelling zonder verrassingen achteraf. U weet vooraf precies wat het kost.',
      icon: 'check-circle',
    },
    {
      id: 'benefit-2',
      title: 'Direct met gespecialiseerde jurist',
      description:
        'Rechtstreeks contact met mij, geen juniors of tussenpersonen. Persoonlijke expertise.',
      icon: 'check-circle',
    },
    {
      id: 'benefit-3',
      title: 'Praktische adviezen ipv theoretische modellen',
      description:
        'Oplossingen die werken in de praktijk van uw tech-onderneming, geen juridische theorie.',
      icon: 'check-circle',
    },
  ],
};

export const pricingSectionData: z.infer<typeof pricingSectionDataSchema> = {
  badgeText: 'Pricing',
  heading: 'Pricing plans',
  description: 'Choose the plan that fits your needs',
  popularBadgeText: 'Meest populair',
  cards: [
    {
      id: 'basic',
      title: 'Basic',
      price: '0',
      features: ['Basic features'],
      cta: {
        text: 'Begin nu',
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
    'Hier vindt u antwoorden op de meest gestelde vragen over mijn dienstverlening. Staat uw vraag er niet bij? Neem gerust contact op!',
  categories: [
    {
      category: 'Algemeen',
      questions: [
        {
          question: 'Voor welke ICT-bedrijven is VirtualCounsel geschikt?',
          answer:
            'Als ICT-jurist help ik SaaS-leveranciers, software ontwikkelaars, IT-dienstverleners, managed service providers en tech startups. Bedrijven die software bouwen, IT-services leveren of online platforms exploiteren.',
        },
        {
          question: 'Wat maakt een ICT-jurist anders dan een gewone advocaat?',
          answer:
            "Als ICT-jurist begrijp ik technologie zoals API's, SaaS-modellen en intellectueel eigendom software. Ik werk met vaste prijzen, lever binnen 1-2 weken en u heeft direct contact met een gespecialiseerde jurist.",
        },
        {
          question: "Waar is de ICT-jurist gevestigd en welke regio's bedient u?",
          answer:
            'VirtualCounsel is gevestigd in Amsterdam (Wibautstraat 131D). Ik werk volledig digitaal en bedien tech-bedrijven door heel Nederland. Voor internationale SaaS-contracten heb ik ervaring met Engels recht.',
        },
        {
          question: 'Wat kost juridisch advies voor ICT-bedrijven?',
          answer:
            'Ik werk met transparante vaste prijzen per project, zodat u vooraf weet waar u aan toe bent. Geen uurtje-factuurtje of nacalculaties. De prijs is afhankelijk van complexiteit - van eenvoudige algemene voorwaarden tot complexe SaaS-contracten.',
        },
      ],
    },
    {
      category: 'Werkwijze',
      questions: [
        {
          question: 'Hoe werkt samenwerking met een ICT-jurist?',
          answer:
            'Ik start met een gratis kennismakingsgesprek van 30 minuten via Calendly. Daarna analyseer ik uw juridische situatie en stel een aanpak voor met vaste prijs en levertijd. Na akkoord lever ik binnen 1-2 weken uw juridische documenten.',
        },
        {
          question: 'Hoe snel krijg ik mijn SaaS-contracten of algemene voorwaarden?',
          answer:
            'Eenvoudige documenten zoals algemene voorwaarden lever ik binnen 1 week. Complexere SaaS-contracten, IP-overdrachten of verwerkersovereenkomsten binnen 2 weken. Voor spoedopdrachten maak ik andere afspraken.',
        },
        {
          question: 'Biedt u doorlopend juridisch advies voor SaaS-bedrijven?',
          answer:
            'Ja, veel tech-bedrijven kiezen voor een strippenkaart of juridisch abonnement voor doorlopende ondersteuning. Denk aan contractonderhandelingen, compliance-vragen of nieuwe juridische uitdagingen bij groei. Dit bespreek ik tijdens het gratis kennismakingsgesprek.',
        },
      ],
    },
    {
      category: 'Tarieven',
      questions: [
        {
          question: 'Wat kosten juridische diensten voor ICT-bedrijven?',
          answer:
            'Ik werk met transparante vaste prijzen per project - geen uurtje-factuurtje. Eenvoudige algemene voorwaarden vanaf €800, complexere SaaS-contracten en IP-documenten vanaf €1200. Altijd vooraf duidelijkheid over de investering.',
        },
        {
          question: 'Is het kennismakingsgesprek gratis?',
          answer:
            'Ja, het eerste kennismakingsgesprek van 30 minuten is altijd gratis en vrijblijvend. U kunt direct een afspraak inplannen via Calendly. U betaalt pas bij een concrete juridische opdracht.',
        },
        {
          question: 'Kan ik als tech-bedrijf ook per uur juridisch advies inkopen?',
          answer:
            'Voor korte ad-hoc vragen werk ik met een uurtarief van €175. Maar de meeste SaaS-bedrijven en software ontwikkelaars kiezen voor projectprijzen of een strippenkaart omdat dat budgettaire zekerheid biedt.',
        },
      ],
    },
  ],
};

// Services Preview Section on Homepage
export const servicesPreviewSectionData: Omit<
  z.infer<typeof servicesSectionDataSchema>,
  'services'
> = {
  heading: 'Mijn expertise',
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
    'Ik ben Maarten van Beek, ICT-jurist en oprichter van VirtualCounsel. Met mijn achtergrond als Master Informatierecht (UvA) en Master Information Law (Fordham Law School), plus gerichte opleiding ICT-jurist (ICTRecht Academy), begrijp ik de unieke uitdagingen waar ICT- en softwarebedrijven mee te maken hebben.',
    'Met VirtualCounsel haalt u geen standaard jurist in huis, maar een betrokken juridische partner die uw bedrijf echt begrijpt en met u meegroeit. Sinds de start heb ik tientallen IT- en softwarebedrijven geholpen van start-ups tot snelgroeiende scale-ups.',
    'Mijn klanten waarderen vooral de combinatie van diepgaande juridische kennis en begrip voor hun business. Geen eindeloze discussies over technische details, maar direct to-the-point advies dat werkt. Ik ben geregistreerd bij de Kamer van Koophandel onder nummer 81070411.',
  ],
  image: {
    src: '/images/team/virtual-counsel-maarten-about2-hq.webp',
    alt: 'Maarten van Beek - Oprichter VirtualCounsel',
  },
  variant: 'imageLeft',
  stats: [
    { id: 'stat-experience', value: '2018', label: 'ICT-jurist sinds' },
    { id: 'stat-clients', value: 'Tientallen', label: 'Bedrijven geholpen' },
    {
      id: 'stat-delivery',
      value: '1-2 weken',
      label: 'Gemiddelde levertijd',
    },
  ],
  cta: { text: 'Meer over mijn aanpak', href: '/about' },
  philosophy: {
    title: 'Mijn filosofie',
    text: 'Juridisch advies moet uw organisatie vooruit helpen, niet vertragen. Daarom werk ik pragmatisch, snel en altijd met uw commerciële doelen in gedachten. Geen juridisch geneuzel, maar concrete oplossingen.',
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
      description: 'Succesvolle contracten en deals begeleid',
      icon: 'CheckCircle',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
  ],
};

// Process Section - showing 4-step approach based on VirtualCounsel's exact workflow
export const processSectionData: z.infer<typeof processSectionDataSchema> = {
  badgeText: 'Mijn aanpak',
  heading: 'Concrete juridische bescherming in 4 stappen',
  subtitle:
    'Mijn bewezen aanpak zorgt voor heldere, juridisch waterdichte documenten die uw ICT-bedrijf daadwerkelijk beschermen.',
  steps: [
    {
      id: 'step-01',
      number: '01',
      title: 'Kennismaking',
      description:
        'Een 30-minuten videogesprek waarin we uw juridische uitdaging bespreken en bepalen of VirtualCounsel de juiste partner is voor uw ICT-bedrijf. Vrijblijvend en zonder kosten.',
    },
    {
      id: 'step-02',
      number: '02',
      title: 'Offerte',
      description:
        'Binnen 24 uur ontvangt u een heldere offerte met vaste kosten - geen nacalculatie. Inclusief planning, deliverables en transparante aanpak voor uw software- of IT-bedrijf.',
    },
    {
      id: 'step-03',
      number: '03',
      title: 'Oplevering',
      description:
        'Professionele juridische documenten binnen 1-2 weken, volledig afgestemd op uw ICT-bedrijf. Van SaaS-contracten tot privacybeleid - alles op maat zonder kwaliteitsverlies.',
    },
    {
      id: 'step-04',
      number: '04',
      title: 'Feedbackronde',
      description:
        'Eén gratis revisieronde inbegrepen, persoonlijke toelichting van alle documenten en implementatieondersteuning. Uw juridische partner blijft beschikbaar voor vragen.',
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
      id: 'kpi-focus',
      value: 100,
      suffix: '%',
      label: 'Focus op tech',
    },
    {
      id: 'kpi-delivery',
      value: 2,
      suffix: ' weken',
      label: 'Gemiddelde levertijd',
    },
    {
      id: 'kpi-specialist',
      value: 1,
      suffix: '',
      label: 'ICT-recht specialist',
    },
    { id: 'kpi-pricing', value: 0, suffix: ' verrassingen', label: 'Vaste prijzen' },
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
