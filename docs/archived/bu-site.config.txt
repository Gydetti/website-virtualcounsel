import { z } from "zod";
/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any */
import { siteConfig as rawConfig } from "./site.config.local";

// Zod schema for validating siteConfig structure
const siteConfigSchema = z.object({
	site: z.object({
		title: z.string(),
		description: z.string(),
		url: z.string(),
		name: z.string(),
		openGraph: z.object({
			image: z.object({
				url: z.string(),
				width: z.number(),
				height: z.number(),
				alt: z.string(),
			}),
		}),
		twitterImage: z.string(),
	}),
	theme: z.object({
		colors: z.object({
			primary: z.string(),
			secondary: z.string(),
			accent: z.string(),
		}),
		logo: z.object({ src: z.string(), alt: z.string() }),
		favicon: z.string(),
	}),
	navLinks: z.array(z.any()),
	footerLinks: z.array(z.any()),
	social: z.object({
		facebook: z.string(),
		twitter: z.string(),
		instagram: z.string(),
		linkedin: z.string(),
	}),
	cookieConsent: z.object({ cookiebotId: z.string() }),
	tracking: z.object({
		gtmId: z.string(),
		ga4Id: z.string(),
		fbPixelId: z.string(),
		linkedinId: z.string(),
		hubspotId: z.string(),
		googleAdsId: z.string(),
	}),
	newsletter: z.object({
		provider: z.string(),
		hubspot: z.object({ portalId: z.string(), formId: z.string() }),
		mailchimp: z.object({ apiKey: z.string(), listId: z.string() }),
		activeCampaign: z.object({ apiUrl: z.string(), token: z.string() }),
	}),
	// AI-driven feature flags
	features: z.object({
		enableBlog: z.boolean().optional().default(true),
		enableServices: z.boolean().optional().default(false),
		enableContactForm: z.boolean().optional().default(true),
		enableTestimonials: z.boolean().optional().default(true),
		enablePricing: z.boolean().optional().default(false),
		enableHeroSection: z.boolean().optional().default(true),
		/** Toggle for custom React-based cookie consent banner */
		enableCustomCookieBanner: z.boolean().optional().default(false),
		enableClientsSection: z.boolean().optional().default(true),
		enableFeaturesSection: z.boolean().optional().default(false),
		enableCtaSection: z.boolean().optional().default(true),
		enableAboutSection: z.boolean().optional().default(true),
		enableProblemPainSection: z.boolean().optional().default(true),
		enableSolutionVisionSection: z.boolean().optional().default(true),
		enableProcessSection: z.boolean().optional().default(true),
		enableFaqSection: z.boolean().optional().default(false),
		enableInspirationHeroSection: z.boolean().optional().default(false),
		enableLandingPages: z.boolean().optional().default(false),
		/** Toggle for the 'Why Choose Us' value proposition section */
		enableValuePropSection: z.boolean().optional().default(true),
		/** Toggle for displaying the 'Services' column in the footer */
		enableFooterServices: z.boolean().optional().default(true),
	}),
	// pages that should be enabled (controls nav & sitemap)
	enabledPages: z.array(z.string()).optional(),
	// Contact form & CRM config
	contactForm: z
		.object({
			provider: z.enum([
				"smtp",
				"sendgrid",
				"postmark",
				"mailchimp",
				"activeCampaign",
				"hubspot",
			]),
			fields: z.array(
				z.object({
					name: z.string(),
					type: z.enum(["text", "email", "tel", "textarea"]),
					label: z.string(),
					placeholder: z.string(),
					required: z.boolean(),
				}),
			),
			recaptchaSiteKey: z.string().optional(),
			honeypotFieldName: z.string().default("honeypot"),
		})
		.optional(),
	contact: z.object({
		email: z.string().email().or(z.literal("")),
		phone: z.string(),
		address: z.object({
			line1: z.string(),
			line2: z.string(),
			city: z.string(),
			zip: z.string(),
			country: z.string(),
		}),
		hours: z.object({ monFri: z.string(), sat: z.string(), sun: z.string() }),
	}),
	sections: z.object({
		hero: z.object({
			badge: z.string(),
			preTitle: z.string(),
			words: z.array(z.string()),
			subtitle: z.string(),
			image: z.object({
				src: z.string(),
				alt: z.string(),
				fallback: z.string(),
			}),
			ctaPrimary: z.object({ text: z.string(), href: z.string() }),
			ctaSecondary: z.object({ text: z.string(), href: z.string() }),
			stats: z.array(
				z.object({ value: z.number(), suffix: z.string(), label: z.string() }),
			),
		}),
		blog: z.object({ limit: z.number() }),
		pricing: z
			.object({
				cards: z.array(
					z.object({
						title: z.string(),
						price: z.string(),
						features: z.array(z.string()),
						cta: z.object({ text: z.string(), href: z.string() }),
					}),
				),
			})
			.optional(),
	}),
});

// Validate merged config and export
export const siteConfig = siteConfigSchema.parse(rawConfig);
export type SiteConfig = z.infer<typeof siteConfigSchema>;
