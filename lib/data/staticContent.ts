import { z } from 'zod';

import type {
  blogPageDataSchema,
  errorPageDataSchema,
  notFoundPageDataSchema,
  resourceDetailSectionDataSchema,
  resourcesPageDataSchema,
} from '../schemas/sections.schema';

// Cookie Policy schema and data
export const cookiePolicySchema = z.object({
  lastUpdated: z.string(),
  introduction: z.string(),
  whatAreCookies: z.string(),
  cookieTypes: z.string(),
  essentialCookies: z.string(),
  performanceCookies: z.string(),
  functionalityCookies: z.string(),
  targetingCookies: z.string(),
  thirdPartyCookies: z.string(),
  management: z.string(),
  changes: z.string(),
  contactInfo: z.string(),
});
export type CookiePolicy = z.infer<typeof cookiePolicySchema>;

// Privacy Policy schema and data
export const privacyPolicySchema = z.object({
  lastUpdated: z.string(),
  introduction: z.string(),
  informationCollected: z.string(),
  personalInformation: z.string(),
  usageData: z.string(),
  howWeUse: z.string(),
  usageListItem1: z.string(),
  usageListItem2: z.string(),
  usageListItem3: z.string(),
  usageListItem4: z.string(),
  dataSharing: z.string(),
  dataSecurity: z.string(),
  userRights: z.string(),
  cookiesPolicy: z.string(),
  policyChanges: z.string(),
  contactInfo: z.string(),
});
export type PrivacyPolicy = z.infer<typeof privacyPolicySchema>;

// Terms of Service schema and data
export const termsOfServiceSchema = z.object({
  lastUpdated: z.string(),
  introduction: z.string(),
  acceptance: z.string(),
  services: z.string(),
  userAccounts: z.string(),
  intellectualProperty: z.string(),
  userContent: z.string(),
  prohibitedActivities: z.string(),
  limitationOfLiability: z.string(),
  indemnification: z.string(),
  termination: z.string(),
  governingLaw: z.string(),
  changes: z.string(),
  contactInfo: z.string(),
});
export type TermsOfService = z.infer<typeof termsOfServiceSchema>;

// FAQ schemas
export const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});
export type FaqItem = z.infer<typeof faqItemSchema>;

export const faqCategorySchema = z.object({
  category: z.string(),
  questions: faqItemSchema.array(),
});
export type FaqCategory = z.infer<typeof faqCategorySchema>;

// Central static content
export const staticContent = {
  cookiePolicy: cookiePolicySchema.parse({
    lastUpdated: '1 januari 2025',
    introduction:
      'VirtualCounsel gebruikt cookies om uw ervaring op mijn website te verbeteren. Dit cookiebeleid legt uit wat cookies zijn en hoe ik ze gebruik.',
    whatAreCookies:
      'Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen wanneer u mijn website bezoekt. Ze helpen mij om uw voorkeuren te onthouden en de werking van mijn website te verbeteren.',
    cookieTypes: 'Ik gebruik verschillende soorten cookies op mijn website:',
    essentialCookies:
      'Essentiële cookies zijn noodzakelijk voor het functioneren van de website. Zonder deze cookies kunnen bepaalde diensten niet worden geleverd.',
    performanceCookies:
      'Analytische cookies helpen mij te begrijpen hoe bezoekers mijn website gebruiken door anoniem informatie te verzamelen en te rapporteren.',
    functionalityCookies:
      'Functionele cookies stellen de website in staat om verbeterde functionaliteit en personalisatie te bieden.',
    targetingCookies:
      'Marketing cookies worden gebruikt om bezoekers op verschillende websites te volgen. Ik gebruik deze momenteel niet.',
    thirdPartyCookies:
      "Sommige cookies worden geplaatst door diensten van derden die op mijn pagina\'s verschijnen, zoals Google Analytics.",
    management:
      'U kunt uw cookievoorkeuren op elk moment wijzigen via uw browserinstellingen. Het blokkeren van cookies kan echter de functionaliteit van de website beïnvloeden.',
    changes:
      'Ik kan dit cookiebeleid van tijd tot tijd bijwerken. Wijzigingen worden op deze pagina gepubliceerd.',
    contactInfo:
      'Voor vragen over mijn cookiebeleid kunt u contact opnemen via info@virtualcounsel.nl',
  }),
  privacyPolicy: privacyPolicySchema.parse({
    lastUpdated: '1 januari 2025',
    introduction: `VirtualCounsel - Maarten van Beek ("ik," "mij," of "mijn"), gevestigd te Wibautstraat 131D, 1091 GL Amsterdam, ingeschreven bij de Kamer van Koophandel onder nummer 81070411, ben verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring. Contact: Maarten van Beek, Website: www.virtualcounsel.nl, E-mail: info@virtualcounsel.nl, Telefoonnummer: +31 6 11718358`,
    informationCollected:
      'Ik verwerk uw persoonsgegevens doordat u gebruik maakt van mijn diensten en/of omdat u deze zelf aan mij verstrekt. Hieronder vindt u een overzicht van de persoonsgegevens die ik (mogelijk) verwerk, afhankelijk van de dienst die u afneemt of de interactie die u met mij heeft:',
    personalInformation:
      '- Voor- en achternaam\n- E-mailadres\n- Telefoonnummer\n- Adresgegevens (indien nodig voor dienstverlening of facturatie)\n- Bedrijfsnaam en functie\n- Gegevens die u verstrekt tijdens intakegesprekken\n- Inhoud van e-mails of contactformulieren\n- Gegevens over uw activiteiten op mijn website (via cookies)\n- IP-adres (geanonimiseerd indien mogelijk)\n- Internetbrowser en apparaat type (via cookies)\n- Bankrekeningnummer (indien u betalingen aan mij doet)',
    usageData: '',
    howWeUse: 'Ik verwerk uw persoonsgegevens voor de volgende doelen:',
    usageListItem1:
      'Uitvoeren van juridische dienstverlening (grondslag: uitvoering van een overeenkomst)',
    usageListItem2:
      'Contact met u opnemen voor mijn dienstverlening (grondslag: uitvoering van een overeenkomst/gerechtvaardigd belang)',
    usageListItem3: 'Verzenden van nieuwsbrieven met juridische updates (grondslag: toestemming)',
    usageListItem4:
      'Afhandelen van uw betaling en voldoen aan wettelijke verplichtingen (grondslag: uitvoering van een overeenkomst/wettelijke verplichting)',
    dataSharing:
      'Ik verkoop uw gegevens niet aan derden en verstrek deze uitsluitend indien dit nodig is voor de uitvoering van mijn overeenkomst met u, om te voldoen aan een wettelijke verplichting, of met uw expliciete toestemming. Met bedrijven die uw gegevens verwerken in mijn opdracht (verwerkers), sluit ik een verwerkersovereenkomst om te zorgen voor eenzelfde niveau van beveiliging en vertrouwelijkheid van uw gegevens. Voorbeelden van derden waarmee ik (mogelijk) gegevens deel: Hostingprovider (Vercel), E-mailmarketing software (Laposta), Boekhoudsoftware, Online agendatool (Calendly). Doorgifte buiten de EER: Indien persoonsgegevens worden doorgegeven aan partijen buiten de EER, zorg ik ervoor dat dit gebeurt in overeenstemming met de geldende privacywetgeving.',
    dataSecurity:
      'Ik neem de bescherming van uw gegevens serieus en neem passende technische en organisatorische maatregelen om misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan. Maatregelen die ik heb genomen zijn onder andere: Beveiligde internetverbinding (TLS/SSL), Toegangsbeveiliging met sterke wachtwoorden, Regelmatige software updates, Verwerkersovereenkomsten met alle dienstverleners.',
    userRights:
      'U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. Daarnaast heeft u het recht om uw eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van uw persoonsgegevens door mij en heeft u het recht op gegevensoverdraagbaarheid (dataportabiliteit). U kunt een verzoek tot inzage, correctie, verwijdering, gegevensoverdraging van uw persoonsgegevens of verzoek tot intrekking van uw toestemming of bezwaar op de verwerking van uw persoonsgegevens sturen naar info@virtualcounsel.nl.',
    cookiesPolicy:
      'Ik gebruik functionele en analytische cookies. Functionele cookies zijn nodig voor de goede werking van de website. Analytische cookies (Google Analytics, geanonimiseerd) helpen mij te begrijpen hoe bezoekers de website gebruiken. Voor het plaatsen van analytische cookies vraag ik uw toestemming. U kunt zich afmelden voor cookies door uw internetbrowser zo in te stellen dat deze geen cookies meer opslaat.',
    policyChanges:
      'Ik kan deze privacyverklaring van tijd tot tijd wijzigen. Wijzigingen zullen op mijn website worden gepubliceerd. Het is raadzaam om deze privacyverklaring regelmatig te raadplegen, zodat u van eventuele wijzigingen op de hoogte bent.',
    contactInfo:
      'Voor privacygerelateerde vragen: info@virtualcounsel.nl. Indien u een klacht heeft over de verwerking van uw persoonsgegevens, vraag ik u hierover direct contact met mij op te nemen. U heeft altijd het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens: https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons',
  }),
  termsOfService: termsOfServiceSchema.parse({
    lastUpdated: '1 januari 2025',
    introduction:
      'In deze algemene voorwaarden worden de volgende definities gebruikt en zijn deze voorwaarden van toepassing op alle aanbiedingen en overeenkomsten tussen VirtualCounsel - Maarten van Beek en klanten.',
    acceptance:
      'Door gebruik te maken van mijn diensten of door het aangaan van een overeenkomst, gaat de klant akkoord met deze algemene voorwaarden.',
    services:
      'Alle door VirtualCounsel aan de klant geleverde juridische diensten, waaronder advies, contracten opstellen, compliance begeleiding en juridische ondersteuning voor ICT- en softwarebedrijven, zoals gespecificeerd in de overeenkomst.',
    userAccounts:
      'Indien van toepassing, is de klant verantwoordelijk voor het vertrouwelijk houden van zijn accountgegevens en voor alle activiteiten die onder zijn account plaatsvinden.',
    intellectualProperty:
      'Alle intellectuele eigendomsrechten op standaard documenten en methoden die in het kader van de overeenkomst zijn gebruikt, berusten bij VirtualCounsel. Op maat gemaakte documenten worden eigendom van de klant na volledige betaling.',
    userContent:
      'Informatie verstrekt door de klant blijft eigendom van de klant. De klant verleent VirtualCounsel een licentie om deze informatie te gebruiken voor de uitvoering van de overeenkomst.',
    prohibitedActivities:
      'De klant mag de diensten niet gebruiken voor illegale activiteiten of activiteiten die inbreuk maken op de rechten van derden.',
    limitationOfLiability:
      'VirtualCounsel is niet aansprakelijk voor indirecte schade, gevolgschade of gederfde winst. De totale aansprakelijkheid is beperkt tot het factuurbedrag van de betreffende opdracht.',
    indemnification:
      'De klant vrijwaart VirtualCounsel tegen alle aanspraken van derden die voortvloeien uit het gebruik van de geleverde diensten.',
    termination:
      'VirtualCounsel kan de overeenkomst beëindigen in geval van wanprestatie door de klant of faillissement van de klant. Reeds geleverde diensten blijven verschuldigd.',
    governingLaw:
      'Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Amsterdam.',
    changes:
      'Ik behoud mij het recht voor deze voorwaarden te wijzigen. Wijzigingen worden op de website gepubliceerd en gelden voor nieuwe overeenkomsten.',
    contactInfo:
      'Voor vragen over deze voorwaarden kunt u contact opnemen via info@virtualcounsel.nl.',
  }),
  faqCategories: faqCategorySchema.array().parse([
    {
      category: 'Algemeen',
      questions: [
        {
          question: 'Voor welke bedrijven is VirtualCounsel geschikt?',
          answer:
            'Ik ben gespecialiseerd in juridisch advies voor ICT- en softwarebedrijven, waaronder SaaS providers, software ontwikkelaars, IT dienstverleners, managed service providers en tech startups. Als u software ontwikkelt, IT-diensten levert of een online platform exploiteert, dan kan ik u helpen.',
        },
        {
          question: 'Wat maakt VirtualCounsel anders dan andere juristen?',
          answer:
            'Ik heb diepgaande kennis van de tech-industrie. Ik begrijp wat een API is, hoe SaaS-modellen werken en welke specifieke juridische uitdagingen u tegenkomt. Daarnaast werk ik met vaste prijzen, lever binnen 1-2 weken en heeft u direct contact met mij als ervaren specialist.',
        },
        {
          question: "In welke regio\'s ben ik actief?",
          answer:
            'Ik werk volledig digitaal en bedien klanten door heel Nederland. Voor internationale contracten heb ik ervaring met Engels recht en internationale tech-deals. Videogesprekken voer ik via Teams, Zoom of uw voorkeurplatform.',
        },
      ],
    },
    {
      category: 'Werkwijze',
      questions: [
        {
          question: 'Hoe werkt het traject?',
          answer:
            'Ik start met een gratis kennismakingsgesprek van 30 minuten via Calendly. Daarna volgt een intake waar ik uw situatie analyseer. Vervolgens stel ik een aanpak voor met vaste prijs en levertijd. Na akkoord ga ik direct aan de slag en lever binnen de afgesproken termijn.',
        },
        {
          question: 'Hoe snel kan ik documenten verwachten?',
          answer:
            'De meeste documenten lever ik binnen 1-2 weken. Voor eenvoudige contracten vaak binnen een week, voor complexere projecten maak ik vooraf een realistische planning met u. Spoedopdrachten zijn mogelijk tegen een toeslag.',
        },
        {
          question: 'Bied ik ook doorlopend juridisch advies?',
          answer:
            'Ja, veel klanten kiezen voor een strippenkaart of abonnement voor doorlopende juridische ondersteuning. Dit is ideaal voor bedrijven die regelmatig juridische vragen hebben. De mogelijkheden bespreek ik graag tijdens het kennismakingsgesprek.',
        },
        {
          question: 'Hoe verloopt de communicatie?',
          answer:
            'U heeft rechtstreeks contact met mij, Maarten van Beek, geen juniors of assistenten. Communicatie verloopt via e-mail, telefoon of videobellen. Voor dringende zaken ben ik ook via WhatsApp bereikbaar tijdens kantooruren.',
        },
      ],
    },
    {
      category: 'Tarieven',
      questions: [
        {
          question: 'Wat zijn de tarieven?',
          answer:
            'Ik werk met vaste prijzen per project, zodat u vooraf weet waar u aan toe bent. De prijs is afhankelijk van de complexiteit en omvang. Een standaard SaaS-overeenkomst kost bijvoorbeeld tussen €1.500 en €3.000. Geen uurtje-factuurtje of nacalculaties.',
        },
        {
          question: 'Zijn er opstartkosten?',
          answer:
            'Nee, het kennismakingsgesprek is gratis en vrijblijvend. U betaalt pas wanneer ik een concrete opdracht overeenkom. Ik vraag wel 50% aanbetaling bij opdrachten boven €2.000.',
        },
        {
          question: 'Kan ik ook per uur afnemen?',
          answer:
            'Voor ad-hoc vragen is dat mogelijk tegen €275 per uur (ex BTW). De meeste klanten kiezen echter voor projectprijzen of een strippenkaart omdat dat meer zekerheid biedt over de kosten.',
        },
        {
          question: 'Bied ik betalingsregelingen?',
          answer:
            'Voor grotere projecten kan ik een betalingsregeling treffen. Standaard werk ik met 50% bij start en 50% bij oplevering. Voor vaste klanten zijn maandelijkse termijnen mogelijk.',
        },
      ],
    },
    {
      category: 'Specialisaties',
      questions: [
        {
          question: 'Welke contracten kan ik opstellen?',
          answer:
            "Ik ben gespecialiseerd in: SaaS overeenkomsten, software licentieovereenkomsten, verwerkersovereenkomsten (DPA\'s), algemene voorwaarden voor online platforms, API licenties, reseller/partner agreements, NDA\'s, service level agreements (SLA\'s) en development overeenkomsten.",
        },
        {
          question: 'Heb ik ervaring met privacy wetgeving?',
          answer:
            'Ja, ik help dagelijks ICT-bedrijven met AVG/GDPR compliance. Van privacy policies tot verwerkersovereenkomsten en data breach procedures. Ik begrijp de specifieke privacy uitdagingen van software- en SaaS-bedrijven.',
        },
        {
          question: 'Kan ik helpen met open source vraagstukken?',
          answer:
            'Absoluut. Ik adviseer over open source licenties, GPL compliance, en het veilig gebruiken van open source componenten in commerciële software. Ook help ik bij het opstellen van eigen open source licenties.',
        },
        {
          question: 'Wat weet ik van AI regelgeving?',
          answer:
            'Ik volg de AI Act ontwikkelingen op de voet en help bedrijven met AI-componenten in hun software om compliant te zijn. Van risico-assessments tot transparantie documentatie.',
        },
      ],
    },
  ]),
  cookieSection: { badge: 'Cookiebeleid', title: 'Cookiebeleid' },
  privacySection: { badge: 'Privacyverklaring', title: 'Privacyverklaring' },
  termsSection: { badge: 'Algemene Voorwaarden', title: 'Algemene Voorwaarden' },
  faqSection: {
    badge: 'Veelgestelde vragen',
    title: 'Veelgestelde vragen',
    subtitle:
      'Hier vindt u antwoorden op veel gestelde vragen over mijn dienstverlening en werkwijze.',
    searchPlaceholder: 'Zoek naar antwoorden...',
    assistance: {
      heading: 'Staat uw vraag er niet bij?',
      prompt: 'Neem gerust contact met mij op voor een persoonlijk antwoord.',
      buttonLabel: 'Neem contact op',
    },
  },
} as const;

// ResourceDetailSection default data
export const resourceDetailSectionData: z.infer<typeof resourceDetailSectionDataSchema> = {
  // Section headings and titles
  outcomesTitle: 'Wat levert het u op?',
  overviewTitle: 'Over deze resource',
  whoThisIsForTitle: 'Voor wie is deze resource?',
  designedForTitle: 'Speciaal ontwikkeld voor:',
  considerOthersTitle: 'Mogelijk minder geschikt als:',
  whatsInsideTitle: 'Wat zit erin?',
  bonusMaterialsTitle: 'Extra materialen',
  professionalValidationTitle: 'Vertrouwd door professionals',
  accessFormTitle: 'Download deze resource',
  accessFormSubtitle: 'Vul het formulier in om direct toegang te krijgen',
  // Button/CTA labels
  downloadButtonText: 'Download nu gratis',
  // Content sections
  professionalOutcomes: [
    'Concrete templates die u direct kunt gebruiken',
    'Inzicht in juridische valkuilen voor tech-bedrijven',
    'Checklist voor complete juridische bescherming',
  ],
  overviewParagraphs: [
    'Deze praktische gids is speciaal ontwikkeld voor Nederlandse ICT- en softwarebedrijven die hun juridische zaken professioneel willen regelen.',
    'Op basis van jarenlange ervaring in de tech-industrie deel ik de belangrijkste juridische aandachtspunten, praktische tips en direct toepasbare templates.',
  ],
  designedForPoints: [
    'SaaS providers die hun licentiemodel willen optimaliseren',
    'Software ontwikkelaars die IP-rechten willen beschermen',
    'IT-dienstverleners die aansprakelijkheid willen beperken',
  ],
  considerOthersPoints: [
    'U alleen hardware verkoopt zonder software component',
    'Uw bedrijf geen B2B diensten levert',
    'U actief bent buiten de tech-industrie',
  ],
  chapters: [
    {
      title: 'Hoofdstuk 1: SaaS Contracten',
      description:
        'De belangrijkste clausules voor recurring revenue modellen en subscription-based diensten.',
    },
    {
      title: 'Hoofdstuk 2: Intellectueel Eigendom',
      description: 'Hoe u uw source code, algoritmes en innovaties juridisch beschermt.',
    },
    {
      title: 'Hoofdstuk 3: Privacy & AVG',
      description: 'Praktische compliance voor software die persoonsgegevens verwerkt.',
    },
  ],
  bonusMaterials: [
    'Template SaaS overeenkomst (Word)',
    'Checklist IP-bescherming',
    'Voorbeeld verwerkersovereenkomst',
  ],
  // Stats
  totalPages: "45 Pagina\'s",
  readingTime: '30 Minuten',
  yearsExperience: 'Jarenlange ervaring',
  methodologyType: 'Praktijkgericht',
  approachType: 'Direct toepasbaar',
  // Testimonial
  testimonialQuote:
    "Deze gids gaf mij exact de handvatten die ik nodig had om mijn SaaS-contracten professioneel in te richten. De templates bespaarden mij duizenden euro\'s aan juridische kosten.",
  testimonialAuthor: '— Mark Janssen, CTO, CloudTech Solutions',
  // Field labels
  formFieldLabels: {
    nameLabel: 'Uw naam',
    namePlaceholder: 'Uw volledige naam',
    emailLabel: 'E-mailadres',
    emailPlaceholder: 'uw@email.nl',
  },
};

// Error pages data
export const notFoundPageData: z.infer<typeof notFoundPageDataSchema> = {
  statusCode: '404',
  title: 'Pagina niet gevonden',
  description:
    'Sorry, de pagina die u zoekt bestaat niet. Mogelijk is deze verplaatst, verwijderd of heeft u een verkeerde URL ingevoerd.',
  buttonText: 'Terug naar home',
};

export const errorPageData: z.infer<typeof errorPageDataSchema> = {
  statusCode: '500',
  title: 'Er ging iets mis!',
  description:
    'Ik ondervind een onverwachte fout. Probeer de pagina te vernieuwen of neem contact met mij op als het probleem aanhoudt.',
  buttonText: 'Probeer opnieuw',
};

// Page-specific data
export const blogPageData: z.infer<typeof blogPageDataSchema> = {
  badgeText: 'Kennisbank',
  heading: 'Juridische inzichten voor tech',
  description:
    'Praktische artikelen over ICT-recht, contracten, privacy en compliance voor software- en tech-bedrijven.',
  regularPostsHeading: 'Recente artikelen',
  readFeaturedText: 'Lees uitgelicht artikel',
  readMoreText: 'Lees meer',
  noPostsMessage: 'Nog geen artikelen beschikbaar.',
};

export const resourcesPageData: z.infer<typeof resourcesPageDataSchema> = {
  noResourcesMessage: 'Nog geen resources beschikbaar.',
  readMoreText: 'Lees meer',
};

export default staticContent;
