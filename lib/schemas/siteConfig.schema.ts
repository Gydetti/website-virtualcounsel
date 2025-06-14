import { z } from 'zod';

import { imageSchema, linkSchema, seoSchema } from './common.schema';
import { themeSchema } from './theme.schema';
/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any */
// We will import specific schemas from common.schema.ts later
// import { imageSchema, linkSchema } from "./common.schema";

// This file defines the Zod schema for the site configuration.
// The actual configuration object is loaded from site.config.local.ts and validated against this schema elsewhere.

// --- Sub-schemas for better organization ---
const siteMetaSchema = z.object({
  title: z.string().min(1, 'Site title cannot be empty'),
  description: z.string().min(1, 'Site description cannot be empty'),
  url: z.string().url({ message: 'Invalid site URL' }),
  name: z.string().min(1, 'Site name cannot be empty'),
  openGraph: z.object({
    image: imageSchema
      .extend({
        url: imageSchema.shape.src,
        width: z.number().positive(), // OG images should have width/height
        height: z.number().positive(),
      })
      .omit({ src: true }), // Use url from common imageSchema's src field
  }),
  twitterImage: imageSchema.shape.src, // Allow just a URL string for twitter image
});

const themeColorsSchema = z
  .object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    background: z.string().optional(),
    header: z.string().optional(),
    body: z.string().optional(),
    lightGrey: z.string().optional(),
  })
  .catchall(z.string());

const themeSchemaDefinition = z.object({
  colors: themeColorsSchema,
  // Support optional subtitle for the logo
  logo: imageSchema.extend({ subtitle: z.string().optional() }),
  favicon: z.string().min(1, 'Favicon path cannot be empty'),
});

const socialLinksSchema = z.object({
  facebook: z.string().url({ message: 'Invalid Facebook URL' }).or(z.literal('')).optional(),
  twitter: z.string().url({ message: 'Invalid Twitter URL' }).or(z.literal('')).optional(),
  instagram: z.string().url({ message: 'Invalid Instagram URL' }).or(z.literal('')).optional(),
  linkedin: z.string().url({ message: 'Invalid LinkedIn URL' }).or(z.literal('')).optional(),
});

const cookieConsentSchema = z.object({
  cookiebotId: z.string().optional(),
});

const trackingSchema = z.object({
  gtmId: z.string().optional(),
  ga4Id: z.string().optional(),
  fbPixelId: z.string().optional(),
  linkedinId: z.string().optional(),
  hubspotId: z.string().optional(),
  googleAdsId: z.string().optional(),
});

const newsletterSchemaDefinition = z
  .object({
    provider: z.enum(['mailchimp', 'hubspot', 'activecampaign', '']).optional(),
    hubspot: z.object({ portalId: z.string().min(1), formId: z.string().min(1) }).optional(),
    mailchimp: z.object({ apiKey: z.string().min(1), listId: z.string().min(1) }).optional(),
    activeCampaign: z.object({ apiUrl: z.string().url(), token: z.string().min(1) }).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.provider === 'hubspot' && !data.hubspot) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'HubSpot details are required when provider is HubSpot.',
        path: ['hubspot'],
      });
    }
    if (data.provider === 'mailchimp' && !data.mailchimp) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Mailchimp details are required when provider is Mailchimp.',
        path: ['mailchimp'],
      });
    }
    if (data.provider === 'activecampaign' && !data.activeCampaign) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'ActiveCampaign details are required when provider is ActiveCampaign.',
        path: ['activeCampaign'],
      });
    }
  });

const featureFlagsSchema = z.object({
  enableBlog: z.boolean().optional().default(true),
  enableServices: z.boolean().optional().default(false),
  enableContactForm: z.boolean().optional().default(true),
  enableTestimonials: z.boolean().optional().default(true),
  enablePricing: z.boolean().optional().default(false),
  enableHeroSection: z.boolean().optional().default(true),
  enableHeroStats: z.boolean().optional().default(true),
  enableCustomCookieBanner: z.boolean().optional().default(false),
  enableClientsSection: z.boolean().optional().default(true),
  enableFeaturesSection: z.boolean().optional().default(false),
  enableCtaSection: z.boolean().optional().default(true),
  enableAboutSection: z.boolean().optional().default(true),
  enableProblemPainSection: z.boolean().optional().default(true),
  enableSolutionVisionSection: z.boolean().optional().default(true),
  enableProcessSection: z.boolean().optional().default(true),
  enableFaqSection: z.boolean().optional().default(false),
  enableLandingPages: z.boolean().optional().default(false),
  enableValuePropSection: z.boolean().optional().default(true),
  enableStaggeredAnimations: z.boolean().optional().default(true),
  enablePageTransitions: z.boolean().optional().default(false),
  pageTransitionVariant: z.enum(['fade', 'slide', 'cover']).optional().default('fade'),
  enableAdvancedBackgrounds: z.boolean().optional().default(false),
  animatedBackgroundType: z
    .enum(['none', 'gradient', 'particles', 'parallax', 'noise', 'wave', 'image'])
    .optional()
    .default('gradient'),
  // Optional image URL for the 'image' background type
  backgroundImageUrl: z.string().optional(),
  enableMicroInteractions: z.boolean().optional().default(false),
  enableFooterServices: z.boolean().optional().default(true),
  enableAboutHeroCta: z.boolean().optional().default(false),
  enableAboutLearnMoreCta: z.boolean().optional().default(true),
  enableKpiSection: z.boolean().optional().default(false),
  enableAboutKpiSection: z.boolean().optional().default(false),
  enableHomepageFaqCta: z.boolean().optional().default(false),
});

const contactFormFieldSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['text', 'email', 'tel', 'textarea']),
  label: z.string().min(1),
  placeholder: z.string(), // Placeholder can be empty
  required: z.boolean(),
});

const contactFormSchemaDefinition = z
  .object({
    provider: z
      .enum([
        'smtp',
        'sendgrid',
        'postmark',
        'mailchimp',
        'activeCampaign',
        'hubspot',
        '', // Empty string for no provider / disabled
      ])
      .optional(),
    fields: z.array(contactFormFieldSchema).optional().default([]),
    recaptchaSiteKey: z.string().optional(),
    honeypotFieldName: z.string().default('honeypot'),
  })
  .optional(); // Entire contactForm can be optional

const contactDetailsSchema = z.object({
  email: z.string().email({ message: 'Invalid contact email' }).or(z.literal('')).optional(),
  phone: z.string().optional(), // Phone can be optional and empty
  address: z
    .object({
      line1: z.string().min(1),
      line2: z.string().optional(),
      city: z.string().min(1),
      zip: z.string().min(1),
      country: z.string().min(1),
    })
    .optional(),
  hours: z
    .object({
      monFri: z.string(),
      sat: z.string(),
      sun: z.string(),
    })
    .optional(),
});

const navigationTextSchema = z.object({
  viewAllText: z.string().optional(),
  contactUsText: z.string().optional(),
});

const landingHeaderTextSchema = z.object({
  defaultCtaText: z.string().optional(),
});

const cookieConsentTextSchema = z.object({
  // Banner texts
  cookieSettingsTitle: z.string().optional(),
  cookiePreferencesTitle: z.string().optional(),
  cookieDescription: z.string().optional(),

  // Button labels
  acceptAllText: z.string().optional(),
  rejectAllText: z.string().optional(),
  customizeText: z.string().optional(),
  backText: z.string().optional(),
  savePreferencesText: z.string().optional(),

  // Tab labels
  essentialTabText: z.string().optional(),
  analyticsTabText: z.string().optional(),
  marketingTabText: z.string().optional(),
  preferencesTabText: z.string().optional(),

  // Cookie type descriptions
  essentialTitle: z.string().optional(),
  essentialDescription: z.string().optional(),
  analyticsTitle: z.string().optional(),
  analyticsDescription: z.string().optional(),
  marketingTitle: z.string().optional(),
  marketingDescription: z.string().optional(),
  preferenceCookiesTitle: z.string().optional(),
  preferenceCookiesDescription: z.string().optional(),
});

const sectionsDataKeysSchema = z
  .object({
    hero: z.string().optional(),
    blog: z.object({ limit: z.number().positive().optional() }).optional(),
    pricing: z.string().optional(),
  })
  .optional();

// ++ NEW SCHEMAS FOR DYNAMIC PAGE COMPOSITION ++
export const pageSectionConfigSchema = z.object({
  id: z.string().min(1, 'Section config ID cannot be empty'),
  sectionType: z.string().min(1, 'Section type cannot be empty'),
  variant: z.enum(['imageLeft', 'imageRight', 'centered', 'classic']).optional(),
  // Optional per-section pattern overrides
  patternStyle: z
    .enum(['none', 'dots', 'grid', 'waves', 'noise', 'triangles', 'hexagons', 'crosshatch'])
    .optional(),
  patternOpacity: z.number().min(0).max(1).optional(),
  patternFade: z.enum(['none', 'edges', 'vertical', 'top', 'bottom']).optional(),
  patternColor: z.string().optional(),
  // TODO: Add fields for section-specific data overrides or a generic data object/key
  // e.g., dataKey: z.string().optional(), variant: z.string().optional()
  // For now, we'll assume data is fetched by the section component or a page-level data aggregator
});

export const pageStructureSchema = z.object({
  path: z.string().min(1, 'Page path cannot be empty'), // e.g., "/", "/about"
  seo: seoSchema.optional(),
  sections: z.array(pageSectionConfigSchema).min(1, 'Page must have at least one section'),
});
// ++ END OF NEW SCHEMAS ++

// --- Main siteConfigSchema composition ---
export const siteConfigSchema = z.object({
  // LEGAL & COMPANY DETAILS: used for Privacy Policy rendering
  legal: z
    .object({
      businessName: z.string().min(1),
      kvkNumber: z.string().min(1),
      btwNumber: z.string().optional(),
      address: z
        .object({
          line1: z.string().min(1),
          line2: z.string().optional(),
          city: z.string().min(1),
          zip: z.string().min(1),
          country: z.string().min(1),
        })
        .optional(),
      privacyContactName: z.string().min(1),
      privacyContactEmail: z.string().email(),
      privacyContactPhone: z.string().optional(),
    })
    .optional(),
  site: siteMetaSchema,
  theme: themeSchema,
  navLinks: z.array(linkSchema).min(1, 'Navigation links cannot be empty if defined').optional(),
  footerLinks: z.array(linkSchema).optional(),
  social: socialLinksSchema,
  cookieConsent: cookieConsentSchema,
  tracking: trackingSchema,
  newsletter: newsletterSchemaDefinition,
  features: featureFlagsSchema,
  enabledPages: z.array(z.string()).optional(),
  contactForm: contactFormSchemaDefinition,
  contact: contactDetailsSchema,
  sectionsDataKeys: sectionsDataKeysSchema,
  // SECTION STYLES: Utility classes for special sections (e.g., hero gradients)
  sectionStyles: z
    .object({
      heroGradient: z.string().nonempty(),
    })
    .optional(),
  // ++ ADDING NEW FIELD FOR PAGE STRUCTURES ++
  pageStructures: z.array(pageStructureSchema).optional(),
  navigationText: navigationTextSchema.optional(),
  landingHeaderText: landingHeaderTextSchema.optional(),
  cookieConsentText: cookieConsentTextSchema.optional(),
});

export type SiteConfigSchema = z.infer<typeof siteConfigSchema>;
