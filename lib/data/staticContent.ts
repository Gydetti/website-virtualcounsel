import { z } from 'zod';

import staticContentJson from '@/lib/content/staticContent.json';
import type { StaticContent } from '@/types/generated/staticContent.d';

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

// Bridge module: import JSON content and use generated types
export const staticContent: StaticContent = staticContentJson;

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
  totalPages: "45 Pagina's",
  readingTime: '30 Minuten',
  yearsExperience: 'Jarenlange ervaring',
  methodologyType: 'Praktijkgericht',
  approachType: 'Direct toepasbaar',
  // Testimonial
  testimonialQuote:
    "Deze gids gaf mij exact de handvatten die ik nodig had om mijn SaaS-contracten professioneel in te richten. De templates bespaarden mij duizenden euro's aan juridische kosten.",
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
