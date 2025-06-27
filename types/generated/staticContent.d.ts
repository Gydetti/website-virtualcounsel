export interface StaticContent {
  cookiePolicy: CookiePolicy;
  privacyPolicy: PrivacyPolicy;
  termsOfService: TermsOfService;
  faqCategories: FAQCategory[];
  cookieSection: Section;
  privacySection: Section;
  termsSection: Section;
  faqSection: FAQSection;
  resourceDetailSection: ResourceDetailSection;
  notFoundPage: Page;
  errorPage: Page;
  blogPage: BlogPage;
  resourcesPage: ResourcesPage;
}

export interface BlogPage {
  badgeText: string;
  heading: string;
  description: string;
  regularPostsHeading: string;
  readFeaturedText: string;
  readMoreText: string;
  noPostsMessage: string;
}

export interface CookiePolicy {
  lastUpdated: string;
  introduction: string;
  whatAreCookies: string;
  cookieTypes: string;
  essentialCookies: string;
  performanceCookies: string;
  functionalityCookies: string;
  targetingCookies: string;
  thirdPartyCookies: string;
  management: string;
  changes: string;
  contactInfo: string;
}

export interface Section {
  badge: string;
  title: string;
}

export interface Page {
  statusCode: string;
  title: string;
  description: string;
  buttonText: string;
}

export interface FAQCategory {
  category: string;
  questions: Question[];
}

export interface Question {
  question: string;
  answer: string;
}

export interface FAQSection {
  badge: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  assistance: Assistance;
}

export interface Assistance {
  heading: string;
  prompt: string;
  buttonLabel: string;
}

export interface PrivacyPolicy {
  lastUpdated: string;
  introduction: string;
  informationCollected: string;
  personalInformation: string;
  usageData: string;
  howWeUse: string;
  usageListItem1: string;
  usageListItem2: string;
  usageListItem3: string;
  usageListItem4: string;
  dataSharing: string;
  dataSecurity: string;
  userRights: string;
  cookiesPolicy: string;
  policyChanges: string;
  contactInfo: string;
}

export interface ResourceDetailSection {
  outcomesTitle: string;
  overviewTitle: string;
  whoThisIsForTitle: string;
  designedForTitle: string;
  considerOthersTitle: string;
  whatsInsideTitle: string;
  bonusMaterialsTitle: string;
  professionalValidationTitle: string;
  accessFormTitle: string;
  accessFormSubtitle: string;
  downloadButtonText: string;
  professionalOutcomes: string[];
  overviewParagraphs: string[];
  designedForPoints: string[];
  considerOthersPoints: string[];
  chapters: Chapter[];
  bonusMaterials: string[];
  totalPages: string;
  readingTime: string;
  yearsExperience: string;
  methodologyType: string;
  approachType: string;
  testimonialQuote: string;
  testimonialAuthor: string;
  formFieldLabels: FormFieldLabels;
}

export interface Chapter {
  title: string;
  description: string;
}

export interface FormFieldLabels {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
}

export interface ResourcesPage {
  noResourcesMessage: string;
  readMoreText: string;
}

export interface TermsOfService {
  lastUpdated: string;
  introduction: string;
  acceptance: string;
  services: string;
  userAccounts: string;
  intellectualProperty: string;
  userContent: string;
  prohibitedActivities: string;
  limitationOfLiability: string;
  indemnification: string;
  termination: string;
  governingLaw: string;
  changes: string;
  contactInfo: string;
}
