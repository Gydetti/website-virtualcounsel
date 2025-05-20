import { z } from 'zod';

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
    lastUpdated: 'January 1, 2025',
    introduction: 'Explain purpose of cookie policy',
    whatAreCookies: 'Explain what cookies are and how they work',
    cookieTypes: 'Explain different types of cookies used',
    essentialCookies: 'Explain essential cookies required for functionality',
    performanceCookies: 'Explain cookies used to analyze performance',
    functionalityCookies: 'Explain cookies that remember preferences',
    targetingCookies: 'Explain cookies used for advertising',
    thirdPartyCookies: 'Explain third-party cookies used on site',
    management: 'Explain how users can manage or disable cookies',
    changes: 'Explain how updates to policy will be communicated',
    contactInfo: 'Provide contact details for cookie policy inquiries',
  }),
  privacyPolicy: privacyPolicySchema.parse({
    lastUpdated: '{{Datum laatste bijwerking}}',
    introduction: `{{Naam van jouw onderneming/praktijk}} ("wij," "ons," of "onze"), gevestigd te {{Straat en huisnummer}}, {{Postcode en Plaats}}, ingeschreven bij de Kamer van Koophandel onder nummer {{KvK-nummer}}, is verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring. Contact: {{Jouw volledige naam of naam contactpersoon privacy}}, Website: {{URL van jouw website}}, E-mail: {{E-mailadres voor privacygerelateerde vragen}}, Telefoonnummer: {{Telefoonnummer (optioneel)}}`,
    informationCollected:
      'Wij verwerken uw persoonsgegevens doordat u gebruik maakt van onze diensten en/of omdat u deze zelf aan ons verstrekt. Hieronder vindt u een overzicht van de persoonsgegevens die wij (mogelijk) verwerken, afhankelijk van de dienst die u afneemt of de interactie die u met ons heeft:',
    personalInformation:
      '- Voor- en achternaam\n- E-mailadres\n- Telefoonnummer\n- Adresgegevens (indien nodig voor dienstverlening of facturatie)\n- {{Eventuele andere gegevens die direct worden verzameld, bijv. bedrijfsnaam, functie, gegevens die u verstrekt tijdens intakegesprekken, coachingsessies, inhoud van e-mails of contactformulieren}}\n- Gegevens over uw activiteiten op onze website (bijv. via cookies, zie punt 5)\n- IP-adres (geanonimiseerd indien mogelijk)\n- Internetbrowser en apparaat type (via cookies)\n- Bankrekeningnummer (indien u betalingen aan ons doet)',
    usageData: '',
    howWeUse: 'Wij verwerken uw persoonsgegevens voor de volgende doelen:',
    usageListItem1: 'Uitvoeren van onze diensten (grondslag: uitvoering van een overeenkomst)',
    usageListItem2:
      'Contact met u opnemen (grondslag: uitvoering van een overeenkomst/gerechtvaardigd belang)',
    usageListItem3: 'Verzenden van nieuwsbrieven en/of marketingmateriaal (grondslag: toestemming)',
    usageListItem4:
      'Afhandelen van uw betaling en voldoen aan wettelijke verplichtingen (grondslag: uitvoering van een overeenkomst/wettelijke verplichting)',
    dataSharing:
      'Wij verkopen uw gegevens niet aan derden en verstrekken deze uitsluitend indien dit nodig is voor de uitvoering van onze overeenkomst met u, om te voldoen aan een wettelijke verplichting, of met uw expliciete toestemming. Met bedrijven die uw gegevens verwerken in onze opdracht (verwerkers), sluiten wij een verwerkersovereenkomst om te zorgen voor eenzelfde niveau van beveiliging en vertrouwelijkheid van uw gegevens. Voorbeelden van derden waarmee wij (mogelijk) gegevens delen: {{Hostingprovider, E-mailmarketing software, Boekhoudsoftware, Betalingsverwerker, Online agendatool, Andere tools}}. Doorgifte buiten de EER: Indien persoonsgegevens worden doorgegeven aan partijen buiten de EER, zorgen wij ervoor dat dit gebeurt in overeenstemming met de geldende privacywetgeving.',
    dataSecurity:
      'Wij nemen de bescherming van uw gegevens serieus en nemen passende technische en organisatorische maatregelen om misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan. Maatregelen die wij (onder andere) hebben genomen zijn: {{Voorbeeld: Beveiligde internetverbinding (TLS/SSL), Toegangsbeveiliging, Regelmatige updates, Fysieke beveiliging, Verwerkersovereenkomsten}}.',
    userRights:
      'U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. Daarnaast heeft u het recht om uw eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van uw persoonsgegevens door ons en heeft u het recht op gegevensoverdraagbaarheid (dataportabiliteit). U kunt een verzoek tot inzage, correctie, verwijdering, gegevensoverdraging van uw persoonsgegevens of verzoek tot intrekking van uw toestemming of bezwaar op de verwerking van uw persoonsgegevens sturen naar {{E-mailadres voor privacygerelateerde vragen}}.',
    cookiesPolicy:
      'Wij gebruiken {{Functionele, Analytische, Tracking – wees specifiek}} cookies. Functionele cookies zijn nodig voor de goede werking van de website. Analytische cookies (bijv. Google Analytics, geanonimiseerd) helpen ons te begrijpen hoe bezoekers de website gebruiken. Tracking cookies/Marketing cookies worden gebruikt om bezoekers over verschillende websites heen te volgen. Voor het plaatsen van deze cookies vragen wij uw expliciete toestemming. U kunt zich afmelden voor cookies door uw internetbrowser zo in te stellen dat deze geen cookies meer opslaat. Zie voor een toelichting: {{Link naar uitleg over cookiebeheer}}. Indien u een cookiebanner of consent management tool gebruikt, verwijs hiernaar.',
    policyChanges:
      'Wij kunnen deze privacyverklaring van tijd tot tijd wijzigen. Wijzigingen zullen op onze website worden gepubliceerd. Het is raadzaam om deze privacyverklaring regelmatig te raadplegen, zodat u van eventuele wijzigingen op de hoogte bent.',
    contactInfo:
      'Voor privacygerelateerde vragen: {{E-mailadres voor privacygerelateerde vragen}}. Indien u een klacht heeft over de verwerking van uw persoonsgegevens, vragen wij u hierover direct contact met ons op te nemen. U heeft altijd het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens: https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons',
  }),
  termsOfService: termsOfServiceSchema.parse({
    lastUpdated: '{{Datum laatste bijwerking}}',
    introduction:
      'In deze algemene voorwaarden worden de volgende definities gebruikt en zijn deze voorwaarden van toepassing op alle aanbiedingen en overeenkomsten tussen {{businessName}} en klanten.',
    acceptance:
      'Door gebruik te maken van onze diensten of door het aangaan van een overeenkomst, gaat de klant akkoord met deze algemene voorwaarden.',
    services:
      'Alle door {{businessName}} aan de klant geleverde producten en diensten, waaronder {{korte generieke omschrijving van diensten (bijv. advies, coaching, ontwerp, training)}}, zoals gespecificeerd in de overeenkomst.',
    userAccounts:
      'De klant is verantwoordelijk voor het vertrouwelijk houden van zijn accountgegevens en voor alle activiteiten die onder zijn account plaatsvinden.',
    intellectualProperty:
      'Alle intellectuele eigendomsrechten op materialen die in het kader van de overeenkomst zijn ontwikkeld, berusten uitsluitend bij {{businessName}}.',
    userContent:
      'Gebruikersinhoud verstrekt door de klant blijft eigendom van de klant, maar de klant verleent {{businessName}} een wereldwijde, niet-exclusieve licentie om deze te gebruiken voor de uitvoering van de overeenkomst.',
    prohibitedActivities:
      'De klant mag de diensten niet gebruiken voor illegale activiteiten of activiteiten die inbreuk maken op de rechten van derden.',
    limitationOfLiability:
      '{{businessName}} is niet aansprakelijk voor indirecte schade, gevolgschade of gederfde winst.',
    indemnification:
      'De klant vrijwaart {{businessName}} tegen alle aanspraken van derden die voortvloeien uit het gebruik van de diensten.',
    termination:
      '{{businessName}} kan de overeenkomst beëindigen in geval van wanprestatie door de klant of faillissement van de klant.',
    governingLaw:
      'Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland.',
    changes:
      'Wij behouden ons het recht voor deze voorwaarden te wijzigen. Wijzigingen worden op de website gepubliceerd.',
    contactInfo:
      'Voor vragen over deze voorwaarden kunt u contact opnemen via {{privacyContactEmail}}.',
  }),
  faqCategories: faqCategorySchema.array().parse([
    {
      category: 'General Questions',
      questions: [
        {
          question: 'How do I get started?',
          answer: 'Brief answer explaining how to get started',
        },
        {
          question: 'What services do you offer?',
          answer: 'Brief answer placeholder: concise response to the question',
        },
        {
          question: 'How can I contact support?',
          answer: 'Brief answer placeholder: concise response to the question',
        },
      ],
    },
    {
      category: 'Services',
      questions: [
        {
          question: 'What is your pricing model?',
          answer: 'Brief answer placeholder: concise response to the question',
        },
        {
          question: 'How long does implementation take?',
          answer: 'Brief answer placeholder: concise response to the question',
        },
        {
          question: 'Do you offer custom solutions?',
          answer: 'Brief answer placeholder: concise response to the question',
        },
        {
          question: 'How do I request a quote?',
          answer: 'Brief answer placeholder: concise response to the question',
        },
      ],
    },
    {
      category: 'Pricing & Billing',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'Brief answer placeholder: concise response to the question',
        },
        {
          question: 'Do you offer refunds?',
          answer: 'Brief answer placeholder: concise response to the question',
        },
        {
          question: 'Can I change my plan later?',
          answer: 'Brief answer placeholder: concise response to the question',
        },
      ],
    },
  ]),
  cookieSection: { badge: 'Cookie Policy', title: 'Cookie Policy' },
  privacySection: { badge: 'Privacy Policy', title: 'Privacy Policy' },
  termsSection: { badge: 'Terms of Service', title: 'Terms of Service' },
  faqSection: {
    badge: 'Frequently Asked Questions',
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers to frequently asked questions about our services and how we work.',
    searchPlaceholder: 'Search for answers...',
    assistance: {
      heading: 'Need more help?',
      prompt: "If you don't find what you're looking for, please contact us.",
      buttonLabel: 'Contact Us',
    },
  },
} as const;
