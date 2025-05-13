// Placeholder for section-specific Zod schemas
import { z } from "zod";
import { ctaSchema, imageSchema, linkSchema } from "./common.schema";

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
	displayType: z.enum(["grid", "list", "carousel"]).optional().default("grid"),
	viewAllCta: ctaSchema.optional(),
});

export const testimonialItemSchema = z.object({
	id: z.string().min(1, "Testimonial ID cannot be empty"),
	quote: z.string().min(1, "Testimonial quote cannot be empty"),
	name: z.string().min(1, "Testimonial author name cannot be empty"),
	title: z.string().min(1, "Testimonial author title/role cannot be empty"),
	image: imageSchema, // Using common imageSchema
	rating: z.number().min(1).max(5).optional(), // Optional rating (1-5 stars)
});

export const testimonialsSectionDataSchema = z.object({
	badgeText: z.string().optional(),
	heading: z.string().optional(),
	subtitle: z.string().optional(),
	testimonials: z
		.array(testimonialItemSchema)
		.min(1, "Must provide at least one testimonial"),
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
	posts: z
		.array(blogPostPreviewSchema)
		.min(1, "Must provide at least one blog post for the preview"),
	viewAllCta: ctaSchema.optional(),
});

export const ctaSectionDataSchema = z.object({
	badgeText: z.string().optional(),
	heading: z.string().optional(),
	description: z.string().optional(),
	primaryCta: ctaSchema.optional(),
	secondaryCta: ctaSchema.optional(),
});

const aboutStatItemSchema = z.object({
	id: z.string().min(1, "Stat ID cannot be empty"),
	value: z.string(), // Stats here seem to be string values like "50+"
	label: z.string().min(1),
});

export const aboutSectionDataSchema = z.object({
	badgeText: z.string().optional(),
	heading: z.string().optional(),
	paragraphs: z.array(z.string().min(1)).optional(), // For the multiple text paragraphs
	image: imageSchema.optional(),
	stats: z.array(aboutStatItemSchema).optional(),
	cta: ctaSchema.optional(),
});

export const processStepSchema = z.object({
	id: z.string().min(1, "Step ID cannot be empty"),
	number: z
		.string()
		.min(1)
		.regex(/^\d{2}$/, "Step number must be two digits (e.g., 01)")
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
	steps: z
		.array(processStepSchema)
		.min(1, "Must provide at least one process step"),
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
});

export const valuePropBenefitSchema = z.object({
	id: z.string().min(1, "Benefit ID cannot be empty"),
	title: z.string().min(1),
	description: z.string().min(1),
	icon: z.string().min(1), // Icon name, maps to a component
});

export const valuePropSectionDataSchema = z.object({
	badgeText: z.string().optional(),
	heading: z.string().optional(),
	subheading: z.string().optional(),
	benefits: z
		.array(valuePropBenefitSchema)
		.min(1, "Must provide at least one benefit"),
});

export const problemPainCardSchema = z.object({
	id: z.string().min(1, "Card ID cannot be empty"),
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
	questions: z
		.array(faqItemSchema)
		.min(1, "Category must have at least one question"),
});

export const homepageFaqSectionDataSchema = z.object({
	badgeText: z.string().optional(),
	heading: z.string().optional(),
	description: z.string().optional(),
	categories: z
		.array(faqCategorySchema)
		.min(1, "Must provide at least one FAQ category"),
	cta: ctaSchema.optional(), // Consolidates ctaText and ctaLink
});

export const contactSectionDataSchema = z.object({
	badgeText: z.string().optional(),
	heading: z.string().optional(),
	subtitle: z.string().optional(),
	// Form fields and provider details are drawn from siteConfig.contactForm
	// Contact info (email, phone, address) is drawn from siteConfig.contact
});

export const pricingCardSchema = z.object({
	id: z.string().min(1, "Pricing card ID cannot be empty"),
	title: z.string().min(1),
	price: z.string().min(1), // e.g., "$29/mo" or "Free"
	features: z.array(z.string().min(1)).min(1, "Must have at least one feature"),
	cta: ctaSchema, // Reusing common ctaSchema for text, href, and optional variant
	popular: z.boolean().optional().default(false), // To mark a card as "Popular"
	// Add any other card-specific fields if needed, e.g., planId, currency
});

export const pricingSectionDataSchema = z.object({
	badgeText: z.string().optional(),
	heading: z.string().optional(),
	description: z.string().optional(), // Or subtitle, depending on preferred terminology
	cards: z
		.array(pricingCardSchema)
		.min(1, "Must provide at least one pricing card"),
	// Add any section-wide options if needed, e.g., disclaimer, currencyToggle
});

// Add schema for About Values & Philosophy section
export const aboutValuesSectionDataSchema = z.object({
	badgeText: z.string().optional(),
	heading: z.string().optional(),
	values: z.array(z.string().min(1)).min(1, "Must provide at least one value"),
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
	socialProof: z
		.array(socialProofItemSchema)
		.min(1, "Must provide at least one social proof item"),
});

// Add schema for Services Overview section
export const servicesOverviewSectionDataSchema = z.object({
	badgeText: z.string().optional(),
	heading: z.string().optional(),
	description: z.string().optional(),
});

// End of section-specific schemas for now.
// The old placeholderSectionsSchema can be removed.
