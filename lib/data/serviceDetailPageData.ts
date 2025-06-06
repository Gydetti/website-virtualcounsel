import type { z } from 'zod';

import { serviceDetailPageDataSchema } from '@/lib/schemas/sections.schema';

/**
 * Virtual Counsel Service Detail Page Data
 *
 * This file contains structured content for service detail pages.
 * Content is in Dutch and focused on legal services for ICT/Software companies.
 * Each service has unique, detailed content based on CSV data and scraped content.
 */

// Type for better TypeScript support
type ServiceDetailData = z.infer<typeof serviceDetailPageDataSchema>;

// Default/fallback service detail data
export const serviceDetailPageData: ServiceDetailData = {
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
          'Documenten binnen 1-2 weken geleverd. Voor spoedgevallen kan ik nog sneller schakelen. U weet altijd waar u aan toe bent.',
        icon: '✓',
      },
      {
        id: 'benefit-fixed-price',
        title: 'Vaste prijzen',
        description:
          'Geen uurtje-factuurtje maar heldere afspraken vooraf. U weet exact wat het kost voordat ik begin.',
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
          'De meeste documenten lever ik binnen 5-10 werkdagen. Voor complexere projecten maak ik vooraf een realistische planning. Spoed? Dat kan tegen een toeslag - ik lever dan binnen 2-3 werkdagen.',
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
        question: 'Zijn jouw documenten up-to-date?',
        answer:
          'Absoluut. Ik volg alle relevante wetgeving op de voet - van AVG updates tot de nieuwe AI Act. Uw documenten voldoen altijd aan de laatste wettelijke vereisten en best practices in de tech-industrie.',
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
      'Boek een gratis kennismakingsgesprek en ontdek hoe ik uw specifieke situatie kan aanpakken. Binnen 30 minuten weet u precies wat mogelijk is.',
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

// Service-specific content mapping for all 8 services
export const servicesDetailData: Record<string, ServiceDetailData> = {
  'intellectuele-eigendom-software': {
    targetAudience: [
      'Softwarebedrijven die hun code willen beschermen',
      'Ontwikkelteams met externe developers',
      'SaaS-leveranciers die investeerders zoeken',
      'Startups die hun IP willen veiligstellen',
    ],
    problemSection: {
      heading: 'De gevaren van onbeschermde intellectuele eigendom',
      mainProblemStatement:
        'Veel bedrijven denken dat ze automatisch eigenaar zijn van hun software, maar zonder juridische overdracht blijven rechten vaak bij ontwikkelaars. Dit kan desastreuze gevolgen hebben bij investeringen, exits of geschillen.',
      problems: [
        {
          title: 'Geen echte eigendom',
          description:
            'Zonder schriftelijke overdracht bent u geen juridisch eigenaar, ook niet als u ervoor betaalt.',
          impact: 'Verlies van controle bij conflict',
        },
        {
          title: "Open source risico's",
          description: 'GPL-licenties kunnen uw hele codebase "besmetten" en dwingen tot vrijgave.',
          impact: 'Gedwongen openbaarmaking code',
        },
        {
          title: 'Due diligence falen',
          description: 'Investeerders eisen bewijs van eigendom - zonder dit geen funding.',
          impact: 'Gemiste investeringskansen',
        },
      ],
    },
    features: [
      {
        id: 'feature-ownership-transfer',
        title: 'Sluitende IE-overdracht',
        description:
          'Juridisch waterdichte overdrachtsovereenkomsten voor alle betrokken partijen - werknemers, freelancers en bureaus.',
        icon: 'FileCheck',
      },
      {
        id: 'feature-opensource-safety',
        title: 'Open source compliance',
        description:
          "Volledige licentie-audit en beleid om veilig open source componenten te gebruiken zonder commerciële risico's.",
        icon: 'Shield',
      },
      {
        id: 'feature-structure-advice',
        title: 'Optimale bedrijfsstructuur',
        description:
          'Advies over holding/IE B.V. constructies voor maximale bescherming en flexibiliteit bij exits of licentiedeals.',
        icon: 'Building',
      },
      {
        id: 'feature-investment-ready',
        title: 'Investeringsklaar',
        description:
          'Alle documentatie op orde voor soepele due diligence processen en snellere funding rondes.',
        icon: 'TrendingUp',
      },
    ],
    processSteps: [
      {
        id: 'step-1',
        title: 'IE-audit',
        description:
          'We inventariseren alle betrokken ontwikkelaars, bestaande afspraken en gebruikte componenten.',
        duration: '1-2 dagen',
        icon: 'Search',
      },
      {
        id: 'step-2',
        title: 'Risicoanalyse',
        description:
          "Identificatie van juridische gaten, licentierisico's en ontbrekende overdrachten.",
        duration: '1 dag',
        icon: 'AlertCircle',
      },
      {
        id: 'step-3',
        title: 'Documentatie',
        description: 'Opstellen van alle benodigde overdrachtsovereenkomsten en beleidsregels.',
        duration: '3-5 dagen',
        icon: 'FileText',
      },
      {
        id: 'step-4',
        title: 'Implementatie',
        description:
          'Begeleiding bij ondertekening en inrichting van de optimale bedrijfsstructuur.',
        duration: '1-2 weken',
        icon: 'CheckCircle',
      },
    ],
    uniqueValue: {
      heading: 'Waarom VirtualCounsel voor IE-bescherming?',
      statement:
        'Ik combineer juridische expertise met technisch inzicht. Ik begrijp hoe software ontwikkeld wordt, ken de valkuilen van open source en spreek de taal van developers én investeerders.',
      differentiators: [
        {
          title: 'Tech-achtergrond',
          description:
            'Ik begrijp Git, dependencies, en licentiemodellen - geen uitleg nodig over uw tech stack.',
        },
        {
          title: 'Praktische aanpak',
          description:
            'Geen theoretische modellen maar werkbare oplossingen die passen bij uw development workflow.',
        },
      ],
      highlight: 'Specialist in software IE sinds 2017',
    },
    benefitsSection: {
      heading: 'Waarom is IE-bescherming cruciaal voor uw software?',
      benefits: [
        {
          id: 'benefit-ownership',
          title: 'Echte eigendom van uw creatie',
          description:
            'Veel bedrijven denken dat ze automatisch eigenaar zijn van hun software, maar zonder juridische overdracht blijven rechten vaak bij ontwikkelaars. Ik zorg voor sluitende afspraken.',
          icon: '🔐',
        },
        {
          id: 'benefit-investment',
          title: 'Investeringsklaar vanaf dag één',
          description:
            'Investeerders eisen bewijs van eigendom. Met een goede IE-structuur (holding/IE B.V.) staat u sterker bij funding rondes en voorkomt u kostbare vertragingen.',
          icon: '💎',
        },
        {
          id: 'benefit-opensource',
          title: 'Veilig gebruik van open source',
          description:
            'Open source componenten kunnen juridische tijdbommen zijn. Ik analyseer licenties en voorkom dat u gedwongen wordt broncode vrij te geven.',
          icon: '🛡️',
        },
      ],
    },
    faqSection: {
      heading: 'Veelgestelde vragen over IE bij software',
      items: [
        {
          question: 'Waarom ben ik niet automatisch eigenaar van software die ik laat bouwen?',
          answer:
            'Zonder expliciete schriftelijke overdracht blijven auteursrechten bij de maker - ook als u ervoor betaalt. Dit geldt voor werknemers zonder goede arbeidsovereenkomst, freelancers en externe bureaus. Ik zorg voor juridische overdrachtsovereenkomsten die uw eigendom waarborgen.',
        },
        {
          question: 'Hoe werkt een IE-overdracht bij bestaande software?',
          answer:
            'We inventariseren eerst alle betrokken ontwikkelaars en bestaande afspraken. Vervolgens stel ik retroactieve overdrachtsovereenkomsten op. Bij complexe situaties met veel partijen werk ik met een gefaseerde aanpak om alle rechten veilig te stellen.',
        },
        {
          question: 'Wanneer is een aparte IE B.V. verstandig?',
          answer:
            "Een IE B.V. binnen uw holding beschermt intellectueel eigendom tegen operationele risico's en maakt toekomstige licentiedeals of exits eenvoudiger. Dit is vooral zinvol bij waardevolle software, meerdere producten of investeringsplannen.",
        },
        {
          question: 'Hoe voorkom ik problemen met open source licenties?',
          answer:
            'Ik voer een licentie-audit uit van alle gebruikte componenten. GPL-licenties kunnen bijvoorbeeld uw hele codebase "besmetten". We maken een open source policy en zorgen voor compliance zonder uw commerciële belangen te schaden.',
        },
      ],
    },
    testimonialsSection: {
      heading: 'Ervaringen met IE-trajecten',
      testimonials: [
        {
          id: 'testimonial-saas',
          quote:
            'Voor onze Series A hadden we alle IE-rechten binnen twee weken op orde. De investeerders waren onder de indruk van de grondige documentatie. Zonder Maarten hadden we deze ronde niet gehaald.',
          author: 'Thomas de Groot',
          company: 'SaaS Scale-up Amsterdam',
        },
        {
          id: 'testimonial-opensource',
          quote:
            'We gebruikten onbewust GPL-code in ons commerciële product. Maarten vond een praktische oplossing waarbij we compliant werden zonder onze hele architectuur om te gooien.',
          author: 'Lisa Chen',
          company: 'AI Software Company',
        },
      ],
    },
    readyToStartCta: {
      heading: 'Bescherm uw software vandaag nog',
      description:
        "Voorkom kostbare IE-problemen bij investeringen of exits. In een gratis gesprek breng ik uw risico's in kaart en geef ik concrete aanbevelingen.",
      buttonText: 'Plan IE-adviesgesprek',
      buttonLink: '/contact',
    },
    buttonLabels: {
      consultation: 'Vraag IE-scan aan',
      scheduleConsultation: 'Plan uw IE-gesprek',
      getStarted: 'Start IE-bescherming',
    },
  },

  'contracten-algemene-voorwaarden': {
    targetAudience: [
      'IT-dienstverleners met complexe projecten',
      'Softwarebouwers die agile werken',
      'SaaS-leveranciers met diverse klanten',
      'Tech-bedrijven die willen opschalen',
    ],
    problemSection: {
      heading: 'Waarom standaard contracten niet werken voor software',
      mainProblemStatement:
        "Templates houden geen rekening met moderne ontwikkelmethoden, SaaS-modellen of de specifieke risico's van software. Dit leidt tot conflicten, onduidelijkheid en ongedekte aansprakelijkheid.",
      problems: [
        {
          title: 'Agile vs Waterval mismatch',
          description:
            'Standaard contracten gaan uit van vaste specs, niet van iteratieve development.',
          impact: 'Constant gedoe over scopewijzigingen',
        },
        {
          title: 'Geen tech-specifieke clausules',
          description: "Missen essentiële bepalingen over bugs, updates, SLA's en data-eigendom.",
          impact: 'Juridische gaten bij incidenten',
        },
        {
          title: 'Te complex of te simpel',
          description:
            'Of juridisch jargon dat klanten afschrikt, of te simpel waardoor u onbeschermd bent.',
          impact: "Verlies van deals of risico's",
        },
      ],
    },
    features: [
      {
        id: 'feature-agile-contracts',
        title: 'Agile-proof contracten',
        description:
          'Flexibele raamcontracten met sprint-afspraken, user stories en change requests ingebouwd.',
        icon: 'Zap',
      },
      {
        id: 'feature-saas-terms',
        title: 'SaaS algemene voorwaarden',
        description:
          'Complete voorwaarden voor SaaS met uptime, data-eigendom, privacy en betalingsmodellen.',
        icon: 'Cloud',
      },
      {
        id: 'feature-clear-liability',
        title: 'Heldere aansprakelijkheid',
        description:
          "Duidelijke afspraken over bugs, downtime, datalekken en andere software-specifieke risico's.",
        icon: 'ShieldCheck',
      },
      {
        id: 'feature-modular-setup',
        title: 'Modulaire opzet',
        description:
          'Basiscontract met modules voor verschillende diensten - van development tot support.',
        icon: 'Layers',
      },
    ],
    processSteps: [
      {
        id: 'step-1',
        title: 'Intake gesprek',
        description: 'We bespreken uw diensten, werkwijze, klanttypen en huidige knelpunten.',
        duration: '30-45 minuten',
        icon: 'MessageSquare',
      },
      {
        id: 'step-2',
        title: 'Document analyse',
        description: 'Review van bestaande contracten en identificatie van verbeterpunten.',
        duration: '1-2 dagen',
        icon: 'FileSearch',
      },
      {
        id: 'step-3',
        title: 'Opstellen documenten',
        description: 'Maatwerk contracten en voorwaarden afgestemd op uw specifieke situatie.',
        duration: '3-5 dagen',
        icon: 'Edit',
      },
      {
        id: 'step-4',
        title: 'Review & training',
        description: 'Doorloop van documenten en praktische tips voor gebruik in sales.',
        duration: '1 uur',
        icon: 'GraduationCap',
      },
    ],
    uniqueValue: {
      heading: 'Contracten die écht werken voor tech-bedrijven',
      statement:
        'Ik ken de praktijk van software development, begrijp agile werkwijzen en weet wat enterprise klanten verwachten. Mijn contracten zijn juridisch sterk én commercieel werkbaar.',
      differentiators: [
        {
          title: 'Sector expertise',
          description:
            '7+ jaar exclusief bezig met ICT-contracten. Ik ken alle valkuilen en best practices.',
        },
        {
          title: 'Sales-enablement',
          description:
            'Contracten die deals versnellen in plaats van vertragen. Met uitleg voor uw salesteam.',
        },
      ],
      highlight: '500+ ICT-contracten opgesteld',
    },
    benefitsSection: {
      heading: 'Waarom maatwerk contracten essentieel zijn',
      benefits: [
        {
          id: 'benefit-agile',
          title: 'Afgestemd op moderne werkwijzen',
          description:
            'Agile development, continuous deployment, SaaS-modellen - uw contracten moeten deze realiteit weerspiegelen. Geen waterval-contracten voor agile teams.',
          icon: '🚀',
        },
        {
          id: 'benefit-protection',
          title: 'Bescherming zonder bureaucratie',
          description:
            'Heldere afspraken over aansprakelijkheid, updates en support die uw business beschermen zonder klanten af te schrikken met juridisch jargon.',
          icon: '⚖️',
        },
        {
          id: 'benefit-growth',
          title: 'Schaalbaar met uw groei',
          description:
            'Contracten die meegroeien - van eerste klant tot enterprise deals. Modulair opgezet zodat u snel kunt schakelen zonder telkens nieuwe documenten nodig te hebben.',
          icon: '📈',
        },
      ],
    },
    faqSection: {
      heading: 'Vragen over contracten voor software',
      items: [
        {
          question: 'Waarom kan ik geen standaard template gebruiken?',
          answer:
            "Templates houden geen rekening met uw specifieke diensten, verdienmodel of werkwijze. Een SaaS-bedrijf heeft andere clausules nodig dan een maatwerkontwikkelaar. Bovendien missen templates vaak essentiële bescherming voor software-specifieke risico's zoals bugs, downtime of data-incidenten.",
        },
        {
          question: 'Hoe werken contracten bij agile development?',
          answer:
            'Ik maak flexibele raamcontracten met duidelijke sprint-afspraken. In plaats van vaste specificaties werken we met user stories en acceptance criteria. De juridische structuur ondersteunt iteratief werken zonder dat u bij elke wijziging een nieuw contract nodig heeft.',
        },
        {
          question: 'Wat moet er in algemene voorwaarden voor SaaS?',
          answer:
            'Essentieel zijn: gebruiksrechten, uptime-garanties, data-eigendom, privacy, aansprakelijkheidsbeperking, betalingsvoorwaarden en beëindigingsafspraken. Ik zorg dat alle elementen kloppen en aansluiten bij uw specifieke SaaS-model - of u nu B2B of B2C werkt.',
        },
        {
          question: 'Kan je ook internationale contracten maken?',
          answer:
            'Jazeker. Ik maak Engelstalige contracten voor internationale klanten, rekening houdend met verschillende rechtssystemen. Voor complexe internationale deals werk ik samen met lokale specialisten om volledige dekking te garanderen.',
        },
      ],
    },
    testimonialsSection: {
      heading: 'Wat klanten zeggen over onze contracten',
      testimonials: [
        {
          id: 'testimonial-agency',
          quote:
            'Eindelijk algemene voorwaarden die passen bij hoe wij werken. Geen gedoe meer met klanten over agile vs waterval - alles staat helder op papier.',
          author: 'Mark Jansen',
          company: 'Digital Agency Rotterdam',
        },
        {
          id: 'testimonial-saas',
          quote:
            'Onze enterprise klanten zijn onder de indruk van de professionaliteit van onze contracten. Het geeft vertrouwen en versnelt het salesproces enorm.',
          author: 'Sophie van Dam',
          company: 'B2B SaaS Platform',
        },
      ],
    },
    readyToStartCta: {
      heading: 'Tijd voor contracten die écht werken',
      description:
        'Stop met aanmodderen met templates. Krijg juridische documenten die uw werkwijze ondersteunen en uw business beschermen.',
      buttonText: 'Vraag contractscan aan',
      buttonLink: '/contact',
    },
    buttonLabels: {
      consultation: 'Bespreek uw situatie',
      scheduleConsultation: 'Plan contractadvies',
      getStarted: 'Start met betere contracten',
    },
  },

  'beperking-aansprakelijkheid': {
    targetAudience: [
      'Softwarebedrijven met complexe producten',
      'IT-leveranciers met kritieke systemen',
      'SaaS-providers met enterprise klanten',
      "Techbedrijven die risico's willen beheersen",
    ],
    problemSection: {
      heading: 'De gevaren van onbeperkte aansprakelijkheid',
      mainProblemStatement:
        'Zonder duidelijke beperking van aansprakelijkheid kunt u als softwareleverancier geconfronteerd worden met vernietigende claims bij bugs, uitval of datalekken. Één incident kan uw hele bedrijf kosten.',
      problems: [
        {
          title: 'Disproportionele claims',
          description:
            'Een kleine bug kan theoretisch miljoenen schade veroorzaken zonder goede beperking.',
          impact: 'Faillissement bij eerste claim',
        },
        {
          title: 'Geen onderscheid directe/indirecte schade',
          description:
            'Veel contracten maken geen onderscheid tussen soorten schade, waardoor alles claimbaar is.',
          impact: "Onbeheersbare risico's",
        },
        {
          title: 'Te strenge of te soepele clausules',
          description: 'Of klanten accepteren het niet, of u bent onvoldoende beschermd.',
          impact: "Verlies deals of risico's",
        },
      ],
    },
    features: [
      {
        id: 'feature-balanced-limitation',
        title: 'Evenwichtige beperking',
        description:
          'Juridisch verdedigbare beperkingen die commercieel acceptabel zijn voor professionele klanten.',
        icon: 'Shield',
      },
      {
        id: 'feature-damage-types',
        title: 'Heldere schadecategorieën',
        description:
          'Duidelijk onderscheid tussen directe en indirecte schade, met passende uitsluitingen.',
        icon: 'FileText',
      },
      {
        id: 'feature-insurance-aligned',
        title: 'Verzekering afgestemd',
        description: 'Aansprakelijkheidsbeperking die naadloos aansluit op uw verzekeringsdekking.',
        icon: 'ShieldCheck',
      },
      {
        id: 'feature-risk-exclusions',
        title: 'Slimme uitsluitingen',
        description: 'Marktconforme uitsluitingen voor DDoS, hackers, force majeure en dergelijke.',
        icon: 'AlertOff',
      },
    ],
    processSteps: [
      {
        id: 'step-1',
        title: 'Risicoanalyse',
        description:
          "We inventariseren uw diensten, klanttypen en huidige aansprakelijkheidsrisico's.",
        duration: '1-2 uur',
        icon: 'Search',
      },
      {
        id: 'step-2',
        title: 'Contract review',
        description: 'Analyse van bestaande contracten en identificatie van juridische gaten.',
        duration: '1-2 dagen',
        icon: 'FileSearch',
      },
      {
        id: 'step-3',
        title: 'Clausules opstellen',
        description: 'Formuleren van evenwichtige aansprakelijkheidsbeperkingen op maat.',
        duration: '2-3 dagen',
        icon: 'Edit',
      },
      {
        id: 'step-4',
        title: 'Implementatie',
        description: 'Integratie in contracten en praktische tips voor onderhandelingen.',
        duration: '1 dag',
        icon: 'CheckCircle',
      },
    ],
    uniqueValue: {
      heading: 'Waarom VirtualCounsel voor aansprakelijkheidsbeperking?',
      statement:
        'Ik ken de balans tussen juridische bescherming en commerciële haalbaarheid. Mijn clausules zijn streng genoeg om u te beschermen, maar redelijk genoeg om door klanten geaccepteerd te worden.',
      differentiators: [
        {
          title: 'Sector expertise',
          description:
            "Ik weet wat werkt voor software: van bugs tot data-incidenten, ik ken alle risico's.",
        },
        {
          title: 'Onderhandelingservaring',
          description:
            'Ik weet hoe enterprise klanten denken en help je tot win-win oplossingen te komen.',
        },
      ],
      highlight: 'Specialist in tech aansprakelijkheid',
    },
    benefitsSection: {
      heading: 'Waarom aansprakelijkheidsbeperking essentieel is',
      benefits: [
        {
          id: 'benefit-protection',
          title: 'Bescherming tegen disproportionele claims',
          description:
            'Een kleine bug kan theoretisch miljoenen schade veroorzaken. Zonder goede beperking bent u uw bedrijf kwijt bij de eerste serieuze claim.',
          icon: '🛡️',
        },
        {
          id: 'benefit-balance',
          title: 'Commercieel acceptabel voor klanten',
          description:
            'Te strenge beperkingen schrikken klanten af. Ik vind de balans tussen bescherming voor u en acceptabele voorwaarden voor professionele opdrachtgevers.',
          icon: '⚖️',
        },
        {
          id: 'benefit-insurance',
          title: 'Afgestemd op uw verzekering',
          description:
            'Aansprakelijkheidsbeperking en verzekering moeten naadloos aansluiten. Ik zorg dat uw contractuele afspraken binnen uw verzekeringsdekking vallen.',
          icon: '🔒',
        },
      ],
    },
    faqSection: {
      heading: 'Vragen over aansprakelijkheidsbeperking',
      items: [
        {
          question: 'Welke aansprakelijkheidsbeperking is realistisch?',
          answer:
            'Voor software is beperking tot 12 maanden factuurwaarde gebruikelijk en verdedigbaar. Bij kritische systemen kan dit oplopen tot 24 maanden. Directe schade wordt meestal gedekt, gevolgschade uitgesloten. De exacte balans hangt af van uw diensten en klanttype.',
        },
        {
          question: 'Wat zijn typische uitsluitingen voor software?',
          answer:
            'Standaard sluit ik uit: dataverlies door externe oorzaken, DDoS-aanvallen, hackers (mits u redelijke beveiliging had), bugs in third-party software, en schade door verkeerd gebruik. Deze uitsluitingen zijn marktconform en worden geaccepteerd door professionele klanten.',
        },
        {
          question: 'Hoe zit het met opzet en grove schuld?',
          answer:
            "Opzet kunt u nooit uitsluiten - dat is wettelijk verboden. Grove schuld is complexer: veel klanten eisen dat dit gedekt blijft. Ik formuleer clausules die grove schuld beperkt definiëren, zodat normale bedrijfsrisico's nog steeds beperkt blijven.",
        },
        {
          question: 'Werkt aansprakelijkheidsbeperking ook internationaal?',
          answer:
            'Elke jurisdictie heeft eigen regels. Nederlandse beperkingen werken goed in de EU. Voor de VS of UK pas ik formuleringen aan om lokaal afdwingbaar te zijn. Bij internationale contracten adviseer ik altijd over rechtskeuze en de impact daarvan.',
        },
      ],
    },
    testimonialsSection: {
      heading: 'Hoe beperking in de praktijk werkt',
      testimonials: [
        {
          id: 'testimonial-saved',
          quote:
            'Een klant claimde €2 miljoen schade door een storing. Dankzij de clausules van Maarten bleef onze aansprakelijkheid beperkt tot €50k - precies wat onze verzekering dekte.',
          author: 'Robert Koning',
          company: 'Cloud Platform Provider',
        },
        {
          id: 'testimonial-enterprise',
          quote:
            'We dachten dat enterprise klanten nooit aansprakelijkheidsbeperking zouden accepteren. Maarten formuleerde het zo dat zelfs Fortune 500 bedrijven akkoord gingen.',
          author: 'Anna Visser',
          company: 'Enterprise SaaS',
        },
      ],
    },
    readyToStartCta: {
      heading: 'Bescherm uw bedrijf tegen onevenredige claims',
      description:
        "Voorkom dat één incident uw levenswerk kost. Laat mij uw aansprakelijkheidsrisico's analyseren en effectief beperken.",
      buttonText: 'Vraag risicoanalyse aan',
      buttonLink: '/contact',
    },
    buttonLabels: {
      consultation: "Bespreek uw risico's",
      scheduleConsultation: 'Plan risicogesprek',
      getStarted: 'Start risicobeperking',
    },
  },

  'privacy-avg-compliance': {
    targetAudience: [
      'SaaS-bedrijven die klantdata verwerken',
      'Software met persoonsgegevens',
      'IT-dienstverleners als verwerker',
      'Platforms met internationale gebruikers',
    ],
    problemSection: {
      heading: 'Privacy compliance is complexer dan u denkt',
      mainProblemStatement:
        "Verouderde verwerkersovereenkomsten, onduidelijke rolverdeling en ontbrekende procedures leiden tot AVG-risico's. De Autoriteit Persoonsgegevens deelt steeds vaker boetes uit.",
      problems: [
        {
          title: "Verouderde DPA's",
          description:
            'Veel verwerkersovereenkomsten stammen uit 2018 en missen actuele vereisten.',
          impact: 'Non-compliance bij audits',
        },
        {
          title: 'Onduidelijke rolverdeling',
          description: 'Bent u verwerker of verwerkingsverantwoordelijke? Vaak is het beide.',
          impact: 'Verkeerde verantwoordelijkheden',
        },
        {
          title: 'Internationale datatransfers',
          description:
            'Sinds Schrems II zijn US-transfers complex, zonder goede waarborgen bent u in overtreding.',
          impact: 'Boetes tot 4% omzet',
        },
      ],
    },
    features: [
      {
        id: 'feature-current-dpas',
        title: "Actuele DPA's",
        description: 'Verwerkersovereenkomsten die voldoen aan de laatste eisen en rechtspraak.',
        icon: 'FileCheck',
      },
      {
        id: 'feature-role-clarity',
        title: 'Heldere rolverdeling',
        description: 'Duidelijkheid over wanneer u verwerker of verwerkingsverantwoordelijke bent.',
        icon: 'Users',
      },
      {
        id: 'feature-international',
        title: 'Internationale compliance',
        description: 'Juiste contractuele waarborgen voor datatransfers buiten de EU.',
        icon: 'Globe',
      },
      {
        id: 'feature-practical-procedures',
        title: 'Praktische procedures',
        description: 'Werkbare processen voor datalekken, verzoeken en sub-verwerkers.',
        icon: 'ClipboardCheck',
      },
    ],
    processSteps: [
      {
        id: 'step-1',
        title: 'Privacy scan',
        description: 'We analyseren uw datastromen, huidige documentatie en compliance gaps.',
        duration: '2-3 uur',
        icon: 'Search',
      },
      {
        id: 'step-2',
        title: 'Documentatie review',
        description: "Beoordeling van bestaande DPA's, privacy policies en procedures.",
        duration: '1-2 dagen',
        icon: 'FileSearch',
      },
      {
        id: 'step-3',
        title: 'Compliance pakket',
        description: 'Opstellen nieuwe documenten of updaten bestaande naar huidige standaarden.',
        duration: '3-5 dagen',
        icon: 'Package',
      },
      {
        id: 'step-4',
        title: 'Implementatie',
        description: 'Praktische begeleiding bij uitrol en training van uw team.',
        duration: '1 dag',
        icon: 'Rocket',
      },
    ],
    uniqueValue: {
      heading: 'Privacy compliance zonder hoofdpijn',
      statement:
        'Ik vertaal complexe AVG-regels naar praktische oplossingen voor tech-bedrijven. Geen theoretische colleges maar concrete documenten die werken.',
      differentiators: [
        {
          title: 'Tech-specifieke kennis',
          description:
            'Ik begrijp hoe SaaS en software data verwerken en wat praktisch haalbaar is.',
        },
        {
          title: 'Internationale ervaring',
          description: "Van US-transfers tot API's: ik ken de uitdagingen van moderne tech.",
        },
      ],
      highlight: 'AVG-specialist voor techbedrijven',
    },
    benefitsSection: {
      heading: 'AVG-compliance zonder hoofdpijn',
      benefits: [
        {
          id: 'benefit-practical',
          title: 'Praktisch toepasbaar advies',
          description:
            'Geen theoretische AVG-colleges maar concrete documenten en procedures die werken voor software- en SaaS-bedrijven. Direct implementeerbaar.',
          icon: '✅',
        },
        {
          id: 'benefit-trust',
          title: 'Vertrouwen bij klanten',
          description:
            'Professionele privacy-documentatie geeft klanten vertrouwen. Vooral enterprise klanten eisen waterdichte verwerkersovereenkomsten en privacy policies.',
          icon: '🤝',
        },
        {
          id: 'benefit-risk',
          title: 'Vermijd boetes en imagoschade',
          description:
            'De AP deelt steeds vaker boetes uit. Met goede compliance voorkomt u niet alleen boetes maar ook de imagoschade van een datalek-melding.',
          icon: '🚨',
        },
      ],
    },
    faqSection: {
      heading: 'AVG-vragen voor software bedrijven',
      items: [
        {
          question: 'Ben ik verwerker of verwerkingsverantwoordelijke?',
          answer:
            'Als SaaS-leverancier bent u meestal verwerker: u verwerkt data namens uw klanten. Maar voor eigen klantdata (accounts, facturatie) bent u verwerkingsverantwoordelijke. Deze dubbele rol vereist verschillende documenten en procedures - ik help het onderscheid helder te maken.',
        },
        {
          question: 'Wat moet er in een verwerkersovereenkomst?',
          answer:
            'Essentieel zijn: doel en instructies voor verwerking, beveiligingsmaatregelen, sub-verwerkers beleid, datalek procedures, audit rechten en teruglevering/verwijdering. Ik zorg dat alles erin staat én dat het werkbaar blijft voor uw operatie.',
        },
        {
          question: 'Hoe regel ik sub-verwerkers zoals AWS of Google Cloud?',
          answer:
            "U moet klanten informeren over sub-verwerkers en vaak toestemming vragen voor wijzigingen. Ik maak een sub-verwerker register en procedures voor updates. Ook check ik of uw eigen DPA's met cloud providers op orde zijn.",
        },
        {
          question: 'Wat als ik data buiten de EU verwerk?',
          answer:
            'Sinds Schrems II is dit complex. Voor de VS zijn nieuwe afspraken (Data Privacy Framework), maar andere landen vereisen extra maatregelen. Ik analyseer uw datastromen en zorg voor de juiste contractuele waarborgen zoals SCCs.',
        },
      ],
    },
    testimonialsSection: {
      heading: 'AVG-successen van klanten',
      testimonials: [
        {
          id: 'testimonial-audit',
          quote:
            'We doorstonden een strenge privacy-audit van een Fortune 500 klant met vlag en wimpel. De auditors waren onder de indruk van onze documentatie.',
          author: 'Erik van der Berg',
          company: 'Data Analytics Platform',
        },
        {
          id: 'testimonial-international',
          quote:
            'Dankzij Maarten konden we probleemloos Amerikaanse klanten bedienen. Hij regelde alle internationale data transfer documentatie perfect.',
          author: 'Maria Santos',
          company: 'HR Tech Startup',
        },
      ],
    },
    readyToStartCta: {
      heading: 'Word AVG-compliant zonder gedoe',
      description:
        'Stop met piekeren over privacy regels. Ik maak praktische compliance mogelijk zodat u zich kunt richten op uw product.',
      buttonText: 'Start privacy check',
      buttonLink: '/contact',
    },
    buttonLabels: {
      consultation: 'Vraag AVG-scan aan',
      scheduleConsultation: 'Plan privacy advies',
      getStarted: 'Word compliant',
    },
  },

  'distributeur-reseller-overeenkomsten': {
    targetAudience: [
      'Software vendors met indirecte verkoop',
      'SaaS met partner channel',
      'White label software aanbieders',
      'Bedrijven die willen opschalen via partners',
    ],
    problemSection: {
      heading: 'Partner conflicten kunnen uw groei saboteren',
      mainProblemStatement:
        'Zonder goede partner agreements krijgt u conflicten over klanten, prijzen, support en merkgebruik. Partners kunnen uw reputatie schaden of zelfs concurrenten worden.',
      problems: [
        {
          title: 'Channel conflicten',
          description:
            'Partners beconcurreren elkaar of u zelf zonder duidelijke territorium afspraken.',
          impact: 'Prijserosie en relatieschade',
        },
        {
          title: 'Onduidelijke verantwoordelijkheden',
          description:
            'Wie doet support? Wie heeft klantcontact? Onduidelijkheid leidt tot frustratie.',
          impact: 'Slechte klantervaring',
        },
        {
          title: "IP en merkrisico's",
          description: 'Partners kunnen uw merk schaden of IP misbruiken zonder goede afspraken.',
          impact: 'Reputatieschade',
        },
      ],
    },
    features: [
      {
        id: 'feature-channel-protection',
        title: 'Channel bescherming',
        description:
          'Duidelijke territorium-, prijs- en klantsegmentatie om conflicten te voorkomen.',
        icon: 'Shield',
      },
      {
        id: 'feature-brand-control',
        title: 'Merkcontrole',
        description: 'Strikte richtlijnen voor merkgebruik, marketing en kwaliteitsstandaarden.',
        icon: 'Award',
      },
      {
        id: 'feature-support-matrix',
        title: 'Support matrix',
        description: 'Heldere afspraken over support levels, escalatie en verantwoordelijkheden.',
        icon: 'Headphones',
      },
      {
        id: 'feature-scalable-model',
        title: 'Schaalbaar model',
        description: 'Standaard agreements die werken van eerste reseller tot wereldwijd netwerk.',
        icon: 'TrendingUp',
      },
    ],
    processSteps: [
      {
        id: 'step-1',
        title: 'Partner strategie',
        description: 'We bepalen uw channel strategie, partnertypen en commerciële doelen.',
        duration: '2 uur',
        icon: 'Target',
      },
      {
        id: 'step-2',
        title: 'Model ontwikkeling',
        description: 'Ontwerp van partner programma met tiers, marges en voorwaarden.',
        duration: '2-3 dagen',
        icon: 'Layers',
      },
      {
        id: 'step-3',
        title: 'Contracten opstellen',
        description: 'Juridische documenten voor verschillende partnertypen en situaties.',
        duration: '3-5 dagen',
        icon: 'FileText',
      },
      {
        id: 'step-4',
        title: 'Onboarding pakket',
        description: 'Complete documentatie en proces voor nieuwe partners.',
        duration: '1-2 dagen',
        icon: 'Package',
      },
    ],
    uniqueValue: {
      heading: 'Veilig opschalen via het partner kanaal',
      statement:
        'Ik help softwarebedrijven een sterk partnernetwerk bouwen zonder controle te verliezen. Mijn agreements beschermen uw belangen én stimuleren partners tot succes.',
      differentiators: [
        {
          title: 'Channel expertise',
          description: 'Ik ken de dynamiek van software distributie en wat partners nodig hebben.',
        },
        {
          title: 'Groei-focus',
          description: 'Agreements die meeschalen van startup tot enterprise vendor.',
        },
      ],
      highlight: 'Partner channel specialist',
    },
    benefitsSection: {
      heading: 'Veilig opschalen via partners',
      benefits: [
        {
          id: 'benefit-control',
          title: 'Behoud controle over uw product',
          description:
            'Partners verkopen uw software, maar u houdt de touwtjes in handen. Van merkgebruik tot prijsstelling - alles juridisch geborgd.',
          icon: '🎯',
        },
        {
          id: 'benefit-scale',
          title: 'Schaalbaar partnernetwerk',
          description:
            'Standaard partner agreements die werken van uw eerste reseller tot een wereldwijd netwerk. Geen nieuwe onderhandelingen voor elke partner.',
          icon: '🚀',
        },
        {
          id: 'benefit-protection',
          title: 'Bescherming tegen channel conflict',
          description:
            'Duidelijke territorium afspraken, prijsafspraken en leadregistratie voorkomen dat partners elkaar of u beconcurreren.',
          icon: '🛡️',
        },
      ],
    },
    faqSection: {
      heading: 'Partner & reseller vraagstukken',
      items: [
        {
          question: 'Wat is het verschil tussen een reseller en distributeur?',
          answer:
            'Een reseller verkoopt direct aan eindklanten, vaak met eigen marge. Een distributeur levert aan andere resellers en verzorgt vaak ook support/training. De juridische afspraken verschillen sterk - distributeurs krijgen meestal meer rechten maar ook meer verplichtingen.',
        },
        {
          question: 'Hoe bescherm ik mijn merk bij white label partners?',
          answer:
            'White label vereist strikte merkrichtlijnen en kwaliteitscontrole. Ik maak afspraken over UI/UX consistentie, support kwaliteit en escalatieprocedures. Ook regel ik dat u bij wanprestatie het white label recht kunt intrekken zonder de hele overeenkomst te beëindigen.',
        },
        {
          question: 'Hoe regel ik support verantwoordelijkheden?',
          answer:
            "Heldere support level afspraken zijn cruciaal. Wie doet 1st line, wie 2nd/3rd line? Hoe escaleren partners? Wat zijn SLA's naar eindklanten? Ik maak een support matrix die precies vastlegt wie wat doet, inclusief training en documentatie verplichtingen.",
        },
        {
          question: 'Wat doe ik met intellectueel eigendom van customizations?',
          answer:
            'Partners willen vaak aanpassingen maken. Ik regel dat basis IP bij u blijft, maar partners rechten krijgen op hun toevoegingen. Via grant-back licenties krijgt u rechten om goede innovaties in uw hoofdproduct op te nemen.',
        },
      ],
    },
    testimonialsSection: {
      heading: 'Succesvol opgeschaald via partners',
      testimonials: [
        {
          id: 'testimonial-global',
          quote:
            'Van 2 naar 50 resellers in 18 maanden. De juridische structuur van Maarten schaalde moeiteloos mee zonder gedoe of conflicten.',
          author: 'Peter van Dijk',
          company: 'Business Software Suite',
        },
        {
          id: 'testimonial-whitelabel',
          quote:
            'Onze white label partners voelen zich beschermd maar wij behouden controle. Perfect uitgebalanceerde overeenkomsten die echt werken.',
          author: 'Linda Bakker',
          company: 'Marketing Automation Platform',
        },
      ],
    },
    readyToStartCta: {
      heading: 'Klaar om veilig op te schalen?',
      description:
        'Bouw een sterk partnernetwerk zonder controle te verliezen. Ik help u met partner agreements die groei stimuleren én uw belangen beschermen.',
      buttonText: 'Start partnertraject',
      buttonLink: '/contact',
    },
    buttonLabels: {
      consultation: 'Bespreek partnerstrategie',
      scheduleConsultation: 'Plan partner advies',
      getStarted: 'Bouw uw netwerk',
    },
  },

  'investeringsklaar-worden': {
    targetAudience: [
      'Startups die funding zoeken',
      'Scale-ups voor Series A/B',
      'Software bedrijven pre-exit',
      'Founders die waarde willen maximaliseren',
    ],
    problemSection: {
      heading: 'Due diligence kan uw deal killen',
      mainProblemStatement:
        "Juridische problemen tijdens due diligence leiden tot lagere waarderingen, slechtere voorwaarden of zelfs afgeblazen deals. IP-issues, contractuele risico's en structuurproblemen kosten u miljoenen.",
      problems: [
        {
          title: 'IP niet op orde',
          description: 'Auteursrechten nog bij developers, geen overdrachten van founders.',
          impact: 'Deal breaker voor investeerders',
        },
        {
          title: 'Contractuele tijdbommen',
          description:
            'Onbeperkte aansprakelijkheid, slechte klantcontracten, geen exit clausules.',
          impact: 'Waarderingskorting',
        },
        {
          title: 'Structuur chaos',
          description: 'Aandelen, IP en operatie door elkaar, geen clean cap table.',
          impact: 'Maanden vertraging',
        },
      ],
    },
    features: [
      {
        id: 'feature-dd-readiness',
        title: 'DD readiness scan',
        description:
          'Complete juridische audit volgens VC/PE standaarden om alle issues te identificeren.',
        icon: 'Scan',
      },
      {
        id: 'feature-ip-cleanup',
        title: 'IP clean-up',
        description: 'Alle intellectuele eigendom netjes overgedragen en in de juiste entiteit.',
        icon: 'Package',
      },
      {
        id: 'feature-contract-optimization',
        title: 'Contract optimalisatie',
        description: 'Key contracts investor-ready maken met juiste bepalingen en exit rechten.',
        icon: 'FileCheck',
      },
      {
        id: 'feature-data-room',
        title: 'Data room ready',
        description: 'Alle documenten georganiseerd en klaar voor investeerder review.',
        icon: 'Folder',
      },
    ],
    processSteps: [
      {
        id: 'step-1',
        title: 'Legal audit',
        description: 'Grondige analyse van alle juridische documenten en structuren.',
        duration: '3-5 dagen',
        icon: 'Search',
      },
      {
        id: 'step-2',
        title: 'Gap analyse',
        description: 'Identificatie van red flags en prioritering van op te lossen issues.',
        duration: '1 dag',
        icon: 'AlertTriangle',
      },
      {
        id: 'step-3',
        title: 'Remediatie',
        description: 'Systematisch oplossen van alle geïdentificeerde problemen.',
        duration: '2-4 weken',
        icon: 'Wrench',
      },
      {
        id: 'step-4',
        title: 'DD simulatie',
        description: 'Mock due diligence om te verifiëren dat alles investor-ready is.',
        duration: '1-2 dagen',
        icon: 'CheckCircle',
      },
    ],
    uniqueValue: {
      heading: 'Van juridische chaos naar funding succes',
      statement:
        'Ik weet wat investeerders verwachten en zorg dat u daar aan voldoet. Met mijn aanpak voorkomt u verrassingen tijdens DD en maximaliseert u uw waardering.',
      differentiators: [
        {
          title: 'VC/PE ervaring',
          description: 'Ik ken het DD proces van binnenuit en weet wat dealbreakers zijn.',
        },
        {
          title: 'Snelle executie',
          description: 'Time kills deals - ik werk snel om uw momentum te behouden.',
        },
      ],
      highlight: 'Investment readiness expert',
    },
    benefitsSection: {
      heading: 'Due diligence zonder verrassingen',
      benefits: [
        {
          id: 'benefit-ready',
          title: 'Direct klaar voor investeerders',
          description:
            'Alle juridische documenten op orde in een data room. Geen paniek of nachten doorwerken als een investeerder interesse toont.',
          icon: '📊',
        },
        {
          id: 'benefit-value',
          title: 'Hogere waardering',
          description:
            'Een schone juridische structuur betekent minder risico voor investeerders. Dit vertaalt zich direct in betere voorwaarden en hogere waardering.',
          icon: '💰',
        },
        {
          id: 'benefit-speed',
          title: 'Sneller deal sluiten',
          description:
            'Due diligence die weken duurt omdat documenten missen? Niet bij mijn klanten. Alles staat klaar, dus deals sluiten sneller.',
          icon: '⚡',
        },
      ],
    },
    faqSection: {
      heading: 'Due diligence voorbereiding',
      items: [
        {
          question: 'Welke documenten willen investeerders zien?',
          answer:
            'Essentieel zijn: alle IP-overdrachten, belangrijke klantcontracten, werknemersovereenkomsten met IP-clausules, leverancierscontracten (vooral cloud/hosting), overzicht van open source gebruik, privacy compliance, en eventuele claims of geschillen. Ik maak een complete DD checklist op maat.',
        },
        {
          question: 'Hoe lang duurt juridische voorbereiding?',
          answer:
            'Een basis cleanup duurt 2-4 weken, afhankelijk van de huidige staat. Complexe situaties met veel legacy of internationale structuren kunnen 6-8 weken duren. Ik begin altijd met een scan om een realistische planning te maken.',
        },
        {
          question: 'Wat zijn typische red flags voor investeerders?',
          answer:
            'IP-rechten niet op orde, geen goede contracten met key employees/freelancers, te brede aansprakelijkheid in klantcontracten, privacy non-compliance, of belangrijke klanten die elk moment kunnen vertrekken. Ik identificeer en fix deze issues preventief.',
        },
        {
          question: 'Moet alles perfect zijn voor een investeringsronde?',
          answer:
            'Nee, maar alle materiële risico\'s moeten bekend en beheersbaar zijn. Kleine issues kunnen na closing opgelost worden. Ik help onderscheiden wat dealbreakers zijn en wat in een "post-closing covenant" kan.',
        },
      ],
    },
    testimonialsSection: {
      heading: 'Succesvolle funding rondes',
      testimonials: [
        {
          id: 'testimonial-series-a',
          quote:
            "De VC's waren verbaasd hoe goed onze juridische zaken op orde waren voor een startup. Het scheelde weken in het DD-proces en gaf ons een sterkere onderhandelingspositie.",
          author: 'Tom Hendriks',
          company: 'FinTech Scale-up',
        },
        {
          id: 'testimonial-acquisition',
          quote:
            'Bij onze exit bleek de juridische voorbereiding goud waard. Geen enkele onverwachte kwestie tijdens DD. De koper had binnen 3 weken comfort voor signing.',
          author: 'Sandra Mol',
          company: 'Acquired SaaS Company',
        },
      ],
    },
    readyToStartCta: {
      heading: 'Bereid u voor op investeerders',
      description:
        'Start vandaag met het investeringsklaar maken van uw bedrijf. Hoe eerder u begint, hoe sterker uw positie straks.',
      buttonText: 'Start DD voorbereiding',
      buttonLink: '/contact',
    },
    buttonLabels: {
      consultation: 'Vraag DD scan aan',
      scheduleConsultation: 'Plan investment readiness',
      getStarted: 'Word investeringsklaar',
    },
  },

  'service-level-agreements': {
    targetAudience: [
      'IT-dienstverleners met support',
      'Managed service providers',
      'SaaS platforms met uptime garanties',
      'Software vendors met maintenance',
    ],
    problemSection: {
      heading: 'Vage service beloftes leiden tot conflicten',
      mainProblemStatement:
        "Zonder duidelijke SLA's ontstaan discussies over responstijden, uptime en support kwaliteit. Klanten hebben onrealistische verwachtingen, uw team brandt op.",
      problems: [
        {
          title: 'Onrealistische verwachtingen',
          description:
            'Klanten verwachten 24/7 support en 100% uptime zonder dat dit is afgesproken.',
          impact: 'Ontevreden klanten',
        },
        {
          title: 'Geen meetbare afspraken',
          description:
            'Vage termen zoals "snel" of "best effort" leiden tot interpretatieverschillen.',
          impact: 'Escalaties en claims',
        },
        {
          title: 'Team burnout',
          description:
            'Zonder grenzen werkt uw team zich kapot om alle klanten tevreden te houden.',
          impact: 'Personeelsverloop',
        },
      ],
    },
    features: [
      {
        id: 'feature-clear-metrics',
        title: 'Heldere metrics',
        description: "Meetbare KPI's voor responstijd, uptime, resolutie en andere service levels.",
        icon: 'BarChart',
      },
      {
        id: 'feature-realistic-targets',
        title: 'Realistische targets',
        description: 'Service levels die u kunt waarmaken zonder uw team op te branden.',
        icon: 'Target',
      },
      {
        id: 'feature-escalation-paths',
        title: 'Escalatie procedures',
        description: 'Duidelijke processen voor prioriteiten, escalatie en communicatie.',
        icon: 'GitBranch',
      },
      {
        id: 'feature-credit-schemas',
        title: 'Service credits',
        description: 'Faire compensatie regeling bij SLA breaches zonder u te ruïneren.',
        icon: 'CreditCard',
      },
    ],
    processSteps: [
      {
        id: 'step-1',
        title: 'Service analyse',
        description: 'We analyseren uw huidige service delivery en teamcapaciteit.',
        duration: '2-3 uur',
        icon: 'Activity',
      },
      {
        id: 'step-2',
        title: 'SLA ontwerp',
        description: 'Ontwikkeling van service tiers, metrics en target levels.',
        duration: '1-2 dagen',
        icon: 'Layers',
      },
      {
        id: 'step-3',
        title: 'Documentatie',
        description: 'Opstellen van professionele SLA documenten en procedures.',
        duration: '2-3 dagen',
        icon: 'FileText',
      },
      {
        id: 'step-4',
        title: 'Implementatie',
        description: 'Training van team en uitrol naar bestaande en nieuwe klanten.',
        duration: '1 week',
        icon: 'Rocket',
      },
    ],
    uniqueValue: {
      heading: "SLA's die werken voor iedereen",
      statement:
        'Ik creëer service agreements die klanten zekerheid geven én voor uw team haalbaar zijn. Geen onmogelijke beloftes maar professionele, meetbare service.',
      differentiators: [
        {
          title: 'Operationele ervaring',
          description: 'Ik begrijp de praktijk van service delivery en wat realistisch is.',
        },
        {
          title: 'Win-win benadering',
          description: "SLA's die klanten tevreden houden zonder uw team uit te putten.",
        },
      ],
      highlight: 'SLA specialist voor tech',
    },
    benefitsSection: {
      heading: "SLA's die werken voor beide partijen",
      benefits: [
        {
          id: 'benefit-clarity',
          title: 'Glashelder voor klanten',
          description:
            'Geen vage beloftes maar concrete afspraken over responstijden, uptime en support. Klanten weten exact wat ze kunnen verwachten.',
          icon: '📋',
        },
        {
          id: 'benefit-realistic',
          title: 'Realistisch en haalbaar',
          description:
            "SLA's die u kunt waarmaken zonder uw team op te branden. Ik vind de balans tussen klantbelang en operationele haalbaarheid.",
          icon: '⚖️',
        },
        {
          id: 'benefit-professional',
          title: 'Professionele uitstraling',
          description:
            'Een goede SLA onderscheidt u van cowboys in de markt. Het toont dat u service serieus neemt en geeft enterprise klanten vertrouwen.',
          icon: '🏆',
        },
      ],
    },
    faqSection: {
      heading: 'SLA vraagstukken uitgelegd',
      items: [
        {
          question: 'Welke uptime garantie is realistisch?',
          answer:
            '99.9% (8.76 uur downtime/jaar) is voor de meeste SaaS haalbaar. 99.99% vereist serieuze investeringen in redundantie. Ik help bepalen wat bij uw architectuur past en hoe u gefaseerd kunt groeien naar hogere garanties.',
        },
        {
          question: 'Hoe regel ik credits bij SLA breaches?',
          answer:
            "Service credits zijn gebruikelijk - vaak 5-25% van de maandprijs per breach. Ik formuleer faire credit schema's die klanten compenseren zonder u te ruïneren. Ook regel ik dat credits de enige remedie zijn (geen extra schadeclaims).",
        },
        {
          question: 'Wat zijn redelijke responstijden voor support?',
          answer:
            'Dit hangt af van uw service level tiers. Typisch: Critical P1: <1 uur, High P2: <4 uur, Medium P3: <1 werkdag, Low P4: <3 werkdagen. Ik help realistische tijden definiëren gebaseerd op uw teamcapaciteit.',
        },
        {
          question: 'Hoe ga ik om met planned maintenance?',
          answer:
            'Planned maintenance telt meestal niet mee voor uptime, mits u klanten tijdig informeert. Ik regel maintenance windows, aankondigingstermijnen en wat er gebeurt bij emergency patches. Alles transparant maar met ruimte voor uw operatie.',
        },
      ],
    },
    testimonialsSection: {
      heading: "SLA's in de praktijk",
      testimonials: [
        {
          id: 'testimonial-enterprise',
          quote:
            "Onze enterprise klanten waren gewend aan IBM-achtige SLA's. Maarten maakte documenten die net zo professioneel ogen maar veel praktischer zijn voor ons als scale-up.",
          author: 'Dennis Smit',
          company: 'Cloud Infrastructure Provider',
        },
        {
          id: 'testimonial-support',
          quote:
            "Eindelijk SLA's die ons support team niet gek maken. Realistische targets die we consistent halen, en klanten zijn tevreden.",
          author: 'Rachel de Vries',
          company: 'B2B SaaS Platform',
        },
      ],
    },
    readyToStartCta: {
      heading: 'Professionaliseer uw service levels',
      description:
        "Laat zien dat u service serieus neemt. Ik maak SLA's die vertrouwen geven zonder onhaalbare beloftes.",
      buttonText: 'Vraag SLA advies aan',
      buttonLink: '/contact',
    },
    buttonLabels: {
      consultation: 'Bespreek service levels',
      scheduleConsultation: 'Plan SLA gesprek',
      getStarted: "Maak professionele SLA's",
    },
  },

  'ai-act-compliance': {
    targetAudience: [
      'Bedrijven met AI componenten',
      'Machine learning platforms',
      'Automated decision systems',
      'AI-powered software tools',
    ],
    problemSection: {
      heading: 'De AI Act komt eraan - bent u klaar?',
      mainProblemStatement:
        'De EU AI Act stelt strenge eisen aan AI-systemen. Zonder tijdige voorbereiding riskeert u boetes tot 6% van de wereldwijde omzet of een verbod op uw AI in Europa.',
      problems: [
        {
          title: 'Onduidelijke classificatie',
          description:
            'Is uw AI high-risk, limited-risk of minimal-risk? Verkeerde inschatting is fataal.',
          impact: 'Non-compliance vanaf dag 1',
        },
        {
          title: 'Ontbrekende documentatie',
          description: 'De AI Act vereist uitgebreide technische documentatie en risk assessments.',
          impact: 'Boetes tot €30 miljoen',
        },
        {
          title: 'Geen compliance proces',
          description: 'AI ontwikkelt snel, compliance moet meebewegen. Eenmalig is niet genoeg.',
          impact: 'Innovatie stilgelegd',
        },
      ],
    },
    features: [
      {
        id: 'feature-risk-classification',
        title: 'Risico classificatie',
        description:
          'Bepaling of uw AI high-risk, limited-risk of minimal-risk is volgens EU criteria.',
        icon: 'AlertTriangle',
      },
      {
        id: 'feature-documentation',
        title: 'Technische documentatie',
        description: 'Complete documentatie set die voldoet aan alle AI Act vereisten.',
        icon: 'FileText',
      },
      {
        id: 'feature-compliance-framework',
        title: 'Compliance framework',
        description: 'Processen en procedures voor continue AI Act compliance.',
        icon: 'Shield',
      },
      {
        id: 'feature-practical-implementation',
        title: 'Praktische implementatie',
        description: 'Werkbare oplossingen die innovatie niet remmen maar faciliteren.',
        icon: 'Zap',
      },
    ],
    processSteps: [
      {
        id: 'step-1',
        title: 'AI inventory',
        description: 'Identificatie en documentatie van alle AI componenten in uw producten.',
        duration: '1-2 dagen',
        icon: 'List',
      },
      {
        id: 'step-2',
        title: 'Risico assessment',
        description: 'Classificatie volgens AI Act categorieën en impact analyse.',
        duration: '2-3 dagen',
        icon: 'AlertTriangle',
      },
      {
        id: 'step-3',
        title: 'Compliance plan',
        description: 'Ontwikkeling van documentatie, processen en governance structuur.',
        duration: '1 week',
        icon: 'Map',
      },
      {
        id: 'step-4',
        title: 'Implementatie',
        description: 'Uitrol van compliance maatregelen en training van teams.',
        duration: '2-3 weken',
        icon: 'Rocket',
      },
    ],
    uniqueValue: {
      heading: 'AI compliance zonder innovatie te remmen',
      statement:
        'Ik help tech bedrijven navigeren door de AI Act zonder hun innovatiekracht te verliezen. Praktische compliance die past bij agile AI development.',
      differentiators: [
        {
          title: 'Tech & juridisch',
          description: 'Ik begrijp AI technologie én de juridische implicaties.',
        },
        {
          title: 'Pragmatische aanpak',
          description: 'Geen overdreven compliance maar wat echt nodig en werkbaar is.',
        },
      ],
      highlight: 'AI Act compliance expert',
    },
    benefitsSection: {
      heading: 'AI Act: van bedreiging naar kans',
      benefits: [
        {
          id: 'benefit-compliance',
          title: 'Tijdig compliant zonder paniek',
          description:
            'De AI Act is complex maar niet onmogelijk. Met een goede aanpak bent u op tijd klaar zonder uw innovatie te remmen.',
          icon: '✅',
        },
        {
          id: 'benefit-competitive',
          title: 'Concurrentievoordeel',
          description:
            'Terwijl concurrenten worstelen met compliance, gebruikt u het als USP. "AI Act compliant" opent deuren bij risk-averse enterprise klanten.',
          icon: '🏅',
        },
        {
          id: 'benefit-futureproof',
          title: 'Klaar voor de toekomst',
          description:
            'AI-regelgeving wordt alleen maar strenger. Met een goede compliance-basis nu, bent u voorbereid op toekomstige updates.',
          icon: '🔮',
        },
      ],
    },
    faqSection: {
      heading: 'AI Act vragen beantwoord',
      items: [
        {
          question: 'Valt mijn AI-toepassing onder de AI Act?',
          answer:
            'Waarschijnlijk wel. De AI Act heeft een brede definitie van AI-systemen. Zelfs eenvoudige recommendation engines of automated decision systems vallen eronder. Ik doe een quick scan om zekerheid te geven en bepaal in welke risicocategorie u valt.',
        },
        {
          question: 'Wat is het verschil tussen high-risk en limited-risk AI?',
          answer:
            'High-risk AI (zoals CV-screening, kredietscoring, medische diagnose) heeft zware compliance eisen: conformiteitsbeoordeling, technische documentatie, menselijk toezicht. Limited-risk (chatbots, content generatie) heeft vooral transparantieverplichtingen. Ik help classificeren en de juiste maatregelen nemen.',
        },
        {
          question: 'Welke documentatie is verplicht?',
          answer:
            'Voor high-risk: technische documentatie, risicobeoordeling, data governance, accuracy metrics, menselijk toezicht procedures. Voor limited-risk vooral transparantie naar gebruikers. Ik maak templates en help deze efficiënt in te vullen zonder uw development te vertragen.',
        },
        {
          question: 'Wat gebeurt er bij non-compliance?',
          answer:
            'Boetes kunnen oplopen tot 6% van wereldwijde jaaromzet of €30 miljoen. Maar belangrijker: u kunt verboden worden uw AI in de EU aan te bieden. Daarom is preventieve compliance essentieel. Ik zorg dat u veilig innoveert binnen de regels.',
        },
      ],
    },
    testimonialsSection: {
      heading: 'AI compliance succesverhalen',
      testimonials: [
        {
          id: 'testimonial-hr-tech',
          quote:
            'Onze AI recruitment tool werd geclassificeerd als high-risk. Maarten hielp ons compliant worden zonder core features te verliezen. Nu gebruiken we compliance als selling point.',
          author: 'Michael Chen',
          company: 'HR Tech Innovator',
        },
        {
          id: 'testimonial-genai',
          quote:
            "We dachten dat onze generative AI features een compliance nightmare zouden worden. Met Maarten's aanpak was het verrassend straightforward en praktisch.",
          author: 'Julia Petersen',
          company: 'Content Generation Platform',
        },
      ],
    },
    readyToStartCta: {
      heading: 'Navigeer de AI Act met vertrouwen',
      description:
        'Laat de AI Act geen blokkade zijn voor innovatie. Ik help u compliant worden op een praktische, werkbare manier.',
      buttonText: 'Start AI Act assessment',
      buttonLink: '/contact',
    },
    buttonLabels: {
      consultation: 'Vraag AI scan aan',
      scheduleConsultation: 'Plan AI compliance gesprek',
      getStarted: 'Word AI Act ready',
    },
  },
};

// Helper function to get service-specific data with fallback
export const getServiceDetailData = (slug: string): ServiceDetailData => {
  return servicesDetailData[slug] || serviceDetailPageData;
};

// Validate data at module load
try {
  serviceDetailPageDataSchema.parse(serviceDetailPageData);

  // Also validate each service-specific data
  for (const key of Object.keys(servicesDetailData)) {
    serviceDetailPageDataSchema.parse(servicesDetailData[key]);
  }
} catch (error) {
  console.error(
    'Error validating service detail data:',
    error instanceof Error ? error.message : error
  );
}
