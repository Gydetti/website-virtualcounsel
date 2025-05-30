// Placeholder for section-specific Zod schemas
import { z } from 'zod';

import { ctaSchema, imageSchema } from './common.schema';

const heroStatSchema = z.object({
  value: z.number(),
  suffix: z.string().optional(),
  label: z.string().min(1),
});

export const heroSectionDataSchema = z.object({
  badgeText: z.string().optional(),
  headline: z.string().optional(),
  subheadline: z.string().optional(),
  primaryCta: ctaSchema.optional(), // Replacing primaryCtaText and primaryCtaLink
  secondaryCta: ctaSchema.optional(), // Replacing secondaryCtaText and secondaryCtaLink
  showSecondaryCta: z.boolean().optional().default(true),
  typingWords: z.array(z.string()).min(1).optional(), // Renamed from 'words' for clarity
  stats: z.array(heroStatSchema).optional(),
  image: imageSchema.optional(), // Replacing imageSrc and imageAlt
  showHelpedStats: z.boolean().optional().default(true),
  showOverlayStat: z.boolean().optional().default(false),
  overlayTitle: z.string().optional(),
  overlayValue: z.string().optional(),
  // Optional per-section background pattern overrides
  patternStyle: z
    .enum(['none', 'dots', 'grid', 'waves', 'noise', 'triangles', 'hexagons', 'crosshatch'])
    .optional(),
  patternOpacity: z.number().min(0).max(1).optional(),
  patternFade: z.enum(['none', 'edges', 'top', 'bottom']).optional(),
  // Optional per-section pattern color override (any valid CSS color string)
  patternColor: z.string().optional(),
});

export const serviceItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(), // Icon name (e.g., from lucide-react)
  features: z.array(z.string()).optional(),
  popular: z.boolean().optional(),
  slug: z.string(),
  // image: imageSchema.optional(), // If services can have images
  // cta: ctaSchema.optional(), // If services have a dedicated CTA
});

export const servicesSectionDataSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  description: z.string().optional(),
  services: z.array(serviceItemSchema),
  displayType: z.enum(['grid', 'list', 'carousel']).optional().default('grid'),
  viewAllCta: ctaSchema.optional(),
  // Button and UI text
  learnMoreText: z.string().optional(),
  popularBadgeText: z.string().optional(),
  // Optional per-section background pattern overrides
  patternStyle: z
    .enum(['none', 'dots', 'grid', 'waves', 'noise', 'triangles', 'hexagons', 'crosshatch'])
    .optional(),
  patternOpacity: z.number().min(0).max(1).optional(),
  patternFade: z.enum(['none', 'edges', 'top', 'bottom']).optional(),
  patternColor: z.string().optional(),
});

export const testimonialItemSchema = z.object({
  id: z.string().min(1, 'Testimonial ID cannot be empty'),
  quote: z.string().min(1, 'Testimonial quote cannot be empty'),
  name: z.string().min(1, 'Testimonial author name cannot be empty'),
  title: z.string().min(1, 'Testimonial author title/role cannot be empty'),
  image: imageSchema, // Using common imageSchema
  rating: z.number().min(1).max(5).optional(), // Optional rating (1-5 stars)
});

export const testimonialsSectionDataSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  subtitle: z.string().optional(),
  testimonials: z.array(testimonialItemSchema).min(1, 'Must provide at least one testimonial'),
});

export const blogPostPreviewSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  date: z.string().min(1), // Or z.date() if we ensure Date objects are passed
  category: z.string().min(1),
  image: imageSchema, // Using common imageSchema (src will be post.image, alt can be post.title)
  slug: z.string().min(1),
  featured: z.boolean().optional(),
});

export const blogSectionDataSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  subtitle: z.string().optional(),
  readMoreText: z.string().optional(),
  posts: z
    .array(blogPostPreviewSchema)
    .min(1, 'Must provide at least one blog post for the preview'),
  viewAllCta: ctaSchema.optional(),
});

export const ctaSectionDataSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  description: z.string().optional(),
  primaryCta: ctaSchema.optional(),
  secondaryCta: ctaSchema.optional(),
  // Optional per-section background pattern overrides
  patternStyle: z
    .enum(['none', 'dots', 'grid', 'waves', 'noise', 'triangles', 'hexagons', 'crosshatch'])
    .optional(),
  patternOpacity: z.number().min(0).max(1).optional(),
  patternFade: z.enum(['none', 'edges', 'top', 'bottom']).optional(),
  // Optional per-section pattern color override (any valid CSS color string)
  patternColor: z.string().optional(),
});

const aboutStatItemSchema = z.object({
  id: z.string().min(1, 'Stat ID cannot be empty'),
  value: z.string(), // Stats here seem to be string values like "50+"
  label: z.string().min(1),
});

export const aboutSectionDataSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  paragraphs: z.array(z.string()).optional(),
  image: imageSchema.optional(), // Using standard imageSchema instead of separate fields
  variant: z
    .enum(['default', 'imageLeft', 'imageRight', 'centered', 'classic'])
    .optional()
    .default('default'),
  cta: ctaSchema.optional(),
  stats: z.array(aboutStatItemSchema).optional(),
  philosophy: z.object({ title: z.string(), text: z.string() }).optional(),
  featureCards: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        icon: z.string(),
        iconBg: z.string(),
        iconColor: z.string(),
      })
    )
    .optional(),
  featuresList: z.array(z.string()).optional(),
  learnMoreText: z.string().optional(),
  // Optional per-section background pattern overrides
  patternStyle: z
    .enum(['none', 'dots', 'grid', 'waves', 'noise', 'triangles', 'hexagons', 'crosshatch'])
    .optional(),
  patternOpacity: z.number().min(0).max(1).optional(),
  patternFade: z.enum(['none', 'edges', 'top', 'bottom']).optional(),
  // Optional per-section pattern color override (any valid CSS color string)
  patternColor: z.string().optional(),
});

export const processStepSchema = z.object({
  id: z.string().min(1, 'Step ID cannot be empty'),
  number: z
    .string()
    .min(1)
    .regex(/^\d{2}$/, 'Step number must be two digits (e.g., 01)')
    .optional(), // Making number optional, can be derived from index
  title: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().min(1),
  details: z.array(z.string().min(1)).optional(),
  // icon: z.string().optional(), // If steps can have icons
});

export const processSectionDataSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  subtitle: z.string().optional(),
  steps: z.array(processStepSchema).min(1, 'Must provide at least one process step'),
});

export const clientSchema = z.object({
  name: z.string(),
  logo: imageSchema,
});

export const clientsSectionDataSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  clients: z.array(clientSchema).optional(),
});

export const featuresSectionDataSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  description: z.string().optional(),
  comparison: z
    .object({
      without: z
        .object({
          title: z.string().optional(),
          items: z.array(z.string().min(1)).optional(),
        })
        .optional(),
      with: z
        .object({
          title: z.string().optional(),
          items: z.array(z.string().min(1)).optional(),
        })
        .optional(),
    })
    .optional(),
  // The CTA is commented out in the component, but we can include it in the schema
  cta: ctaSchema.optional(),
  // Optional per-section background pattern overrides
  patternStyle: z
    .enum(['none', 'dots', 'grid', 'waves', 'noise', 'triangles', 'hexagons', 'crosshatch'])
    .optional(),
  patternOpacity: z.number().min(0).max(1).optional(),
  patternFade: z.enum(['none', 'edges', 'top', 'bottom']).optional(),
  // Optional per-section pattern color override (any valid CSS color string)
  patternColor: z.string().optional(),
});

export const valuePropBenefitSchema = z.object({
  id: z.string().min(1, 'Benefit ID cannot be empty'),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1), // Icon name, maps to a component
});

export const valuePropSectionDataSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  subheading: z.string().optional(),
  benefits: z.array(valuePropBenefitSchema).min(1, 'Must provide at least one benefit'),
});

export const problemPainCardSchema = z.object({
  id: z.string().min(1, 'Card ID cannot be empty'),
  title: z.string().min(1),
  description: z.string().min(1),
  // icon: z.string().optional(), // If cards can have icons
});

export const problemPainSectionDataSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  description: z.string().optional(),
  calloutText: z.string().optional(),
  cards: z.array(problemPainCardSchema).optional(),
});

export const solutionVisionSectionDataSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  description: z.string().optional(),
  imagineTitle: z.string().optional(),
  benefits: z.array(z.string().min(1)).optional(),
  calloutText: z.string().optional(),
  calloutCta: ctaSchema.optional(), // Consolidates calloutLinkText and calloutLinkHref
});

export const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const faqCategorySchema = z.object({
  category: z.string().min(1),
  questions: z.array(faqItemSchema).min(1, 'Category must have at least one question'),
});

export const homepageFaqSectionDataSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  description: z.string().optional(),
  categories: z.array(faqCategorySchema).min(1, 'Must provide at least one FAQ category'),
  cta: ctaSchema.optional(), // Consolidates ctaText and ctaLink
});

export const contactSectionDataSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  subtitle: z.string().optional(),
  // Section-specific copy fields
  formTitle: z.string().optional(),
  infoTitle: z.string().optional(),
  successMessage: z.string().optional(),
  buttonLabels: z
    .object({
      default: z.string().optional(),
      submitting: z.string().optional(),
      success: z.string().optional(),
    })
    .optional(),
  // Form fields and provider details are drawn from siteConfig.contactForm
  // Contact info (email, phone, address) is drawn from siteConfig.contact
});

export const pricingCardSchema = z.object({
  id: z.string().min(1, 'Pricing card ID cannot be empty'),
  title: z.string().min(1),
  price: z.string().min(1), // e.g., "$29/mo" or "Free"
  features: z.array(z.string().min(1)).min(1, 'Must have at least one feature'),
  cta: ctaSchema, // Reusing common ctaSchema for text, href, and optional variant
  popular: z.boolean().optional().default(false), // To mark a card as "Popular"
  // Add any other card-specific fields if needed, e.g., planId, currency
});

export const pricingSectionDataSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  description: z.string().optional(), // Or subtitle, depending on preferred terminology
  cards: z.array(pricingCardSchema).min(1, 'Must provide at least one pricing card'),
  popularBadgeText: z.string().optional(),
  // Add any section-wide options if needed, e.g., disclaimer, currencyToggle
});

// Add schema for About Values & Philosophy section
export const aboutValuesSectionDataSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  values: z.array(z.string().min(1)).min(1, 'Must provide at least one value'),
});

// Add schema for About Social Proof snippet section
const socialProofItemSchema = z.object({
  id: z.string().min(1),
  quote: z.string().min(1),
  name: z.string().min(1),
  title: z.string().optional(),
  image: imageSchema.optional(),
});
export const aboutSocialProofSectionDataSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  socialProof: z.array(socialProofItemSchema).min(1, 'Must provide at least one social proof item'),
});

// Personal Journey Section Schema - for storytelling and trust building
const journeyStepSchema = z.object({
  id: z.string().min(1),
  timeframe: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const aboutPersonalJourneySectionDataSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  subtitle: z.string().optional(),
  journeySteps: z.array(journeyStepSchema).min(1, 'Must provide at least one journey step'),
  image: imageSchema.optional(),
});

// Credentials Section Schema - for building authority and trust
const credentialItemSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1), // e.g., 'Certification', 'Education', 'Experience'
  title: z.string().min(1),
  issuer: z.string().min(1),
  year: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1), // icon name for display
});

export const aboutCredentialsSectionDataSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  subtitle: z.string().optional(),
  credentials: z.array(credentialItemSchema).min(1, 'Must provide at least one credential'),
  cta: ctaSchema.optional(),
});

// Philosophy & Approach Section Schema - for detailed methodology explanation
const philosophyPointSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
});

const quoteSchema = z.object({
  text: z.string().min(1),
  author: z.string().min(1),
});

export const aboutPhilosophySectionDataSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  subtitle: z.string().optional(),
  philosophyPoints: z
    .array(philosophyPointSchema)
    .min(1, 'Must provide at least one philosophy point'),
  quote: quoteSchema.optional(),
  image: imageSchema.optional(),
});

// Add schema for Services Overview section
export const servicesOverviewSectionDataSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  description: z.string().optional(),
});

// Add KPI stats schema for new KpiSection
export const kpiStatItemSchema = z.object({
  id: z.string().min(1, 'KPI stat ID cannot be empty'),
  value: z.number(),
  suffix: z.string().optional(),
  label: z.string().min(1, 'KPI stat label cannot be empty'),
});
export const kpiSectionDataSchema = z.object({
  stats: z.array(kpiStatItemSchema).min(1, 'Must provide at least one KPI stat'),
  // Optional per-section background pattern overrides
  patternStyle: z
    .enum(['none', 'dots', 'grid', 'waves', 'noise', 'triangles', 'hexagons', 'crosshatch'])
    .optional(),
  patternOpacity: z.number().min(0).max(1).optional(),
  patternFade: z.enum(['none', 'edges', 'top', 'bottom']).optional(),
  // Optional per-section pattern color override (any valid CSS color string)
  patternColor: z.string().optional(),
});

// ResourceDetailSection schema - for dynamic copy in resource detail views
export const resourceDetailSectionDataSchema = z.object({
  // Section headings and titles
  outcomesTitle: z.string().optional(),
  overviewTitle: z.string().optional(),
  whoThisIsForTitle: z.string().optional(),
  designedForTitle: z.string().optional(),
  considerOthersTitle: z.string().optional(),
  whatsInsideTitle: z.string().optional(),
  bonusMaterialsTitle: z.string().optional(),
  professionalValidationTitle: z.string().optional(),
  accessFormTitle: z.string().optional(),
  accessFormSubtitle: z.string().optional(),
  // Button/CTA labels
  downloadButtonText: z.string().optional(),
  // Content sections
  professionalOutcomes: z.array(z.string()).optional(),
  overviewParagraphs: z.array(z.string()).optional(),
  designedForPoints: z.array(z.string()).optional(),
  considerOthersPoints: z.array(z.string()).optional(),
  chapters: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .optional(),
  bonusMaterials: z.array(z.string()).optional(),
  // Stats
  totalPages: z.string().optional(),
  readingTime: z.string().optional(),
  yearsExperience: z.string().optional(),
  methodologyType: z.string().optional(),
  approachType: z.string().optional(),
  // Testimonial
  testimonialQuote: z.string().optional(),
  testimonialAuthor: z.string().optional(),
  // Field labels
  formFieldLabels: z
    .object({
      nameLabel: z.string().optional(),
      namePlaceholder: z.string().optional(),
      emailLabel: z.string().optional(),
      emailPlaceholder: z.string().optional(),
    })
    .optional(),
  // Optional per-section background pattern overrides
  patternStyle: z
    .enum(['none', 'dots', 'grid', 'waves', 'noise', 'triangles', 'hexagons', 'crosshatch'])
    .optional(),
  patternOpacity: z.number().min(0).max(1).optional(),
  patternFade: z.enum(['none', 'edges', 'top', 'bottom']).optional(),
  patternColor: z.string().optional(),
});

// End of section-specific schemas for now.
// The old placeholderSectionsSchema can be removed.

// Error pages schemas
export const notFoundPageDataSchema = z.object({
  statusCode: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  buttonText: z.string().optional(),
});

export const errorPageDataSchema = z.object({
  statusCode: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  buttonText: z.string().optional(),
});

// Page-specific schemas
export const blogPageDataSchema = z.object({
  // Header/hero section
  badgeText: z.string().optional(),
  heading: z.string().optional(),
  description: z.string().optional(),
  // Section titles
  regularPostsHeading: z.string().optional(),
  // Text labels for posts
  readFeaturedText: z.string().optional(),
  readMoreText: z.string().optional(),
  // No posts message
  noPostsMessage: z.string().optional(),
});

export const resourcesPageDataSchema = z.object({
  // No resources fallback
  noResourcesMessage: z.string().optional(),
  // Dynamic text for resource cards
  readMoreText: z.string().optional(),
});

// ============================================================================
