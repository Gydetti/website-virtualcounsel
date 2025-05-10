import type { SiteConfigSchema } from "./schemas/siteConfig.schema";

/**
 * Copy this file to site.config.local.ts and fill in the values.
 * All default settings live here for merging with your local overrides.
 */

export const siteConfig: SiteConfigSchema = {
	site: {
		title: "Placeholder Title",
		description: "Placeholder description for the site.",
		url: "https://placeholder.com",
		name: "Placeholder Site Name",
		openGraph: {
			image: {
				url: "/images/og-placeholder.png",
				width: 1200,
				height: 630,
				alt: "OpenGraph Placeholder",
			},
		},
		twitterImage: "/images/twitter-placeholder.png",
	},
	theme: {
		colors: { primary: "#1E3A8A", secondary: "#60A5FA", accent: "#3B82F6" },
		logo: { src: "/logo-placeholder.svg", alt: "Placeholder Logo" },
		favicon: "/favicon-placeholder.ico",
	},
	navLinks: [
		{ text: "Home", href: "/" },
		{ text: "Services", href: "/services" },
		{ text: "About", href: "/about" },
		{ text: "Blog", href: "/blog" },
		{ text: "Resources", href: "/resources" },
		{ text: "FAQ", href: "/faq" },
		{ text: "Contact", href: "/contact" },
	],
	footerLinks: [
		{ text: "Privacy Policy", href: "/privacy-policy" },
		{ text: "Terms of Service", href: "/terms-of-service" },
		{ text: "Cookie Policy", href: "/cookie-policy" },
	],
	social: { facebook: "", twitter: "", instagram: "", linkedin: "" },
	cookieConsent: { cookiebotId: "" },
	tracking: {
		gtmId: "",
		ga4Id: "",
		fbPixelId: "",
		linkedinId: "",
		hubspotId: "",
		googleAdsId: "",
	},
	newsletter: {
		provider: "mailchimp",
		hubspot: { portalId: "hs-placeholder", formId: "hs-form-placeholder" },
		mailchimp: {
			apiKey: "mc-apikey-placeholder",
			listId: "mc-listid-placeholder",
		},
		activeCampaign: {
			apiUrl: "https://placeholder.api-us1.com",
			token: "ac-token-placeholder",
		},
	},
	features: {
		enableHeroSection: true,
		enableBlog: true,
		enableServices: true,
		enableContactForm: true,
		enableTestimonials: true,
		enablePricing: true,
		enableClientsSection: true,
		enableFeaturesSection: false,
		enableCtaSection: true,
		enableAboutSection: true,
		enableProblemPainSection: true,
		enableSolutionVisionSection: true,
		enableProcessSection: false,
		enableFaqSection: false,
		enableInspirationHeroSection: false,
		enableLandingPages: true,
		enableCustomCookieBanner: false,
		enableValuePropSection: true,
		enableFooterServices: true,
	},
	enabledPages: [
		"/",
		"/services",
		"/about",
		"/blog",
		"/faq",
		"/resources",
		"/contact",
		"/terms-of-service",
	],
	contactForm: {
		provider: "smtp",
		fields: [
			{
				name: "name",
				type: "text",
				label: "Your name",
				placeholder: "Your name",
				required: true,
			},
			{
				name: "email",
				type: "email",
				label: "Your email",
				placeholder: "Your email",
				required: true,
			},
			{
				name: "phone",
				type: "tel",
				label: "Your phone (optional)",
				placeholder: "Your phone (optional)",
				required: false,
			},
			{
				name: "message",
				type: "textarea",
				label: "Message",
				placeholder: "How can we help you?",
				required: true,
			},
		],
		recaptchaSiteKey: "recaptcha-placeholder-sitekey",
		honeypotFieldName: "honeypot",
	},
	contact: {
		email: "contact@placeholder.com",
		phone: "+1-555-123-4567",
		address: {
			line1: "123 Placeholder St",
			line2: "Suite 4B",
			city: "Placeholder City",
			zip: "90210",
			country: "Placeholder Country",
		},
		hours: { monFri: "9am - 5pm", sat: "10am - 2pm", sun: "Closed" },
	},
	sectionsDataKeys: {
		blog: { limit: 3 },
	},
	pageStructures: [
		{
			path: "/",
			seo: undefined,
			sections: [
				{ id: "home-hero", sectionType: "HeroSection" },
				{ id: "home-clients", sectionType: "ClientsSection" },
				{ id: "home-services-preview", sectionType: "ServicesPreviewSection" },
				{ id: "home-testimonials", sectionType: "TestimonialsSection" },
				{ id: "home-blog-preview", sectionType: "BlogPreviewSection" },
				{ id: "home-cta", sectionType: "CtaSection" },
			],
		},
		{
			path: "/resources/:slug",
			sections: [
				{ id: "resource-main-content", sectionType: "ResourceDetailSection" },
			],
		},
		{
			path: "/resources",
			seo: {
				title: "Helpful Resources",
				description: "Explore our collection of e-books, guides, and tools.",
			},
			sections: [
				{ id: "resources-list-main", sectionType: "ResourceListSection" },
			],
		},
		{
			path: "/about",
			seo: {
				title: "About Our Company",
				description:
					"Learn more about our company, our mission, and our values.",
			},
			sections: [
				{ id: "about-main-content", sectionType: "AboutSection" },
				{ id: "about-testimonials", sectionType: "TestimonialsSection" },
				{ id: "about-cta", sectionType: "CtaSection" },
			],
		},
	],
};
