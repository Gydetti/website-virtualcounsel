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
    lastUpdated: 'January 1, 2025',
    introduction: 'Introduction explaining who you are and purpose of this privacy policy',
    informationCollected: 'Detail types of personal information collected from users',
    personalInformation: 'Specify personal information collected (e.g. names, email addresses)',
    usageData: 'Explain usage data collected (e.g. IP address, browser type)',
    howWeUse: 'Explain how collected information is used',
    usageListItem1: 'Specific purpose for using collected data',
    usageListItem2: 'Specific purpose for using collected data',
    usageListItem3: 'Specific purpose for using collected data',
    usageListItem4: 'Specific purpose for using collected data',
    dataSharing: 'Explain who you share the data with and under what circumstances.',
    dataSecurity: 'Describe the measures you take to protect user data.',
    userRights: 'Explain what rights users have regarding their data.',
    cookiesPolicy: 'Explain your use of cookies and similar technologies.',
    policyChanges: 'Explain how you will notify users of changes to this policy.',
    contactInfo: 'Provide contact information for privacy-related inquiries.',
  }),
  termsOfService: termsOfServiceSchema.parse({
    lastUpdated: 'January 1, 2025',
    introduction: 'Explain purpose of terms and applicable audience',
    acceptance: 'Explain that using the website implies acceptance',
    services: 'General description of services offered',
    userAccounts: 'Rules and responsibilities for user accounts',
    intellectualProperty: 'Explain content ownership and IP rights',
    userContent: 'Rules for user-submitted content',
    prohibitedActivities: 'List activities not allowed on the site',
    limitationOfLiability: 'Explain limits of liability for damages or losses',
    indemnification: 'Explain user indemnification obligations',
    termination: 'Explain terms for terminating user access',
    governingLaw: 'Specify the governing law jurisdiction',
    changes: 'Explain how users will be notified of changes',
    contactInfo: 'Provide contact details for terms inquiries',
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
