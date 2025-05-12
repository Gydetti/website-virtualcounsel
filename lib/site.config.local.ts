import type { SiteConfigSchema } from "./schemas/siteConfig.schema";

/**
 * @file site.config.local.ts
 * @description Single source of truth for client-specific public data.
 * This file is part of the repository and used at build time.
 * For a new client, open this file and replace placeholder values.
 * No need to copy or rename it.
 */

// MAIN CONFIGURATION OBJECT: All site settings are defined here.
export const siteConfig: SiteConfigSchema = {
	// SITE METADATA: Basic info for SEO, social sharing, and browser tabs.
	site: {
		title: "Placeholder Title", // <--- Browser tab title, default SEO title
		description: "Placeholder description for the site.", // <--- Default SEO description
		url: "https://placeholder.com", // <--- Production URL of the client's site
		name: "Placeholder Site Name", // <--- Used in OpenGraph, general site identification
		// OPENGRAPH SETTINGS: For social media link previews (Facebook, LinkedIn, etc.)
		openGraph: {
			image: {
				url: "/images/og-placeholder.png", // <--- Path to OpenGraph image (e.g., 1200x630px)
				width: 1200,
				height: 630,
				alt: "OpenGraph Placeholder", // <--- Alt text for OG image
			},
		},
		twitterImage: "/images/twitter-placeholder.png", // <--- Path to Twitter card image (e.g., 800x418px)
	},
	// THEME & BRANDING: Colors, logo, favicon.
	theme: {
		colors: {
			primary: "#1E3A8A", // <--- Main brand color
			secondary: "#60A5FA", // <--- Secondary brand color
			accent: "#3B82F6", // <--- Accent color for highlights, CTAs etc.
		},
		logo: {
			src: "/images/placeholders/placeholder-logo4.svg", // <--- Path to site logo
			alt: "Placeholder Logo", // <--- Alt text for logo
		},
		favicon: "/favicon-placeholder.ico", // <--- Path to site favicon
	},
	// NAVIGATION LINKS: Main site navigation (header).
	navLinks: [
		{ text: "Home", href: "/" }, // <--- Example nav link
		{ text: "Services", href: "/services" },
		{ text: "About", href: "/about" },
		{ text: "Blog", href: "/blog" },
		{ text: "Resources", href: "/resources" },
		{ text: "FAQ", href: "/faq" },
		{ text: "Contact", href: "/contact" },
	],
	// FOOTER LINKS: Links appearing in the site footer (e.g., legal pages).
	footerLinks: [
		{ text: "Privacy Policy", href: "/privacy-policy" },
		{ text: "Terms of Service", href: "/terms-of-service" },
		{ text: "Cookie Policy", href: "/cookie-policy" },
	],
	// SOCIAL MEDIA LINKS: URLs for social media profiles.
	social: {
		facebook: "", // <--- Facebook page URL
		twitter: "", // <--- Twitter profile URL
		instagram: "", // <--- Instagram profile URL
		linkedin: "", // <--- LinkedIn profile URL
	},
	// COOKIE CONSENT: Configuration for cookie consent banner.
	cookieConsent: {
		cookiebotId: "", // <--- Cookiebot ID, if using Cookiebot service
	},
	// TRACKING IDS: IDs for analytics and marketing platforms.
	tracking: {
		gtmId: "", // <--- Google Tag Manager ID
		ga4Id: "", // <--- Google Analytics 4 ID
		fbPixelId: "", // <--- Facebook Pixel ID
		linkedinId: "", // <--- LinkedIn Insight Tag ID
		hubspotId: "", // <--- HubSpot Tracking ID
		googleAdsId: "", // <--- Google Ads Conversion ID
	},
	// NEWSLETTER INTEGRATION: Configuration for newsletter subscription form.
	newsletter: {
		provider: "mailchimp", // <--- mailchimp | hubspot | activecampaign | "" (disabled)
		// HubSpot specific settings (only if provider is "hubspot")
		hubspot: { portalId: "hs-placeholder", formId: "hs-form-placeholder" },
		// Mailchimp specific settings (only if provider is "mailchimp")
		mailchimp: {
			apiKey: "mc-apikey-placeholder",
			listId: "mc-listid-placeholder",
		},
		// ActiveCampaign specific settings (only if provider is "activecampaign")
		activeCampaign: {
			apiUrl: "https://placeholder.api-us1.com",
			token: "ac-token-placeholder",
		},
	},
	// FEATURE FLAGS: Toggle sections/features on or off site-wide.
	features: {
		enableHeroSection: true, // <--- Toggle Hero section display
		enableBlog: true, // <--- Toggle Blog feature (includes pages & sections)
		enableServices: true, // <--- Toggle Services feature
		enableContactForm: true, // <--- Toggle Contact Form functionality
		enableTestimonials: true, // <--- Toggle Testimonials section display
		enablePricing: false, // <--- Toggle Pricing section display
		enableClientsSection: true, // <--- Toggle Clients/logo section display
		enableFeaturesSection: false, // <--- Toggle Features/comparison section display
		enableCtaSection: true, // <--- Toggle general Call-to-Action sections
		enableAboutSection: true, // <--- Toggle About section display (e.g., on homepage)
		enableProblemPainSection: true, // <--- Toggle Problem/Pain section display
		enableSolutionVisionSection: true, // <--- Toggle Solution/Vision section display
		enableProcessSection: true, // <--- Toggle Process/how-it-works section display
		enableFaqSection: true, // <--- Toggle FAQ section display (e.g., on homepage)
		enableValuePropSection: true, // <--- Toggle Value Proposition section display

		enableLandingPages: true, // <--- Toggle dedicated Landing Page functionality
		enableCustomCookieBanner: false, // <--- Use custom banner instead of Cookiebot (if ID not set)
		enableFooterServices: true, // <--- Toggle services list in footer
	},
	// ENABLED PAGES: Defines which page routes are active and included in sitemap.
	enabledPages: [
		"/", // <--- Homepage always enabled usually
		"/services",
		"/about",
		"/blog",
		"/faq",
		"/resources",
		"/contact",
		"/terms-of-service", // <--- Example legal page
	],
	// CONTACT FORM SETTINGS: Configuration for the contact form.
	contactForm: {
		provider: "smtp", // <--- smtp | sendgrid | postmark | etc. | "" (disabled)
		fields: [
			// <--- Define fields for the contact form
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
		recaptchaSiteKey: "recaptcha-placeholder-sitekey", // <--- Google reCAPTCHA v2 Site Key
		honeypotFieldName: "honeypot", // <--- Name for anti-spam honeypot field
	},
	// CONTACT DETAILS: General contact information for the business.
	contact: {
		email: "contact@placeholder.com", // <--- Main contact email
		phone: "+1-555-123-4567", // <--- Main contact phone number
		address: {
			// <--- Physical address (optional)
			line1: "123 Placeholder St",
			line2: "Suite 4B",
			city: "Placeholder City",
			zip: "90210",
			country: "Placeholder Country",
		},
		hours: {
			// <--- Business hours (optional)
			monFri: "9am - 5pm",
			sat: "10am - 2pm",
			sun: "Closed",
		},
	},
	// SECTIONS DATA KEYS: Configuration for specific data aspects of sections (e.g., limits).
	sectionsDataKeys: {
		blog: { limit: 3 }, // <--- Number of posts to show in blog previews
	},
	// PAGE STRUCTURES: Defines the layout (sections and their order) for each page.
	pageStructures: [
		{
			path: "/", // <--- HOMEPAGE STRUCTURE
			seo: undefined, // <--- SEO overrides for homepage (title, description, etc.)
			sections: [
				// <--- Sections on the homepage, IN ORDER OF APPEARANCE
				{ id: "home-hero", sectionType: "HeroSection" }, // <--- ID is unique key for React, sectionType maps to component
				{ id: "home-value-prop", sectionType: "ValuePropSection" },
				{ id: "home-clients", sectionType: "ClientsSection" },
				{ id: "home-problem-pain", sectionType: "ProblemPainSection" },
				{ id: "home-solution-vision", sectionType: "SolutionVisionSection" },
				{ id: "home-features", sectionType: "FeaturesSection" },
				{ id: "home-testimonials", sectionType: "TestimonialsSection" },
				{ id: "home-cta", sectionType: "CtaSection" },
				{ id: "home-about", sectionType: "AboutSection" },
				{ id: "home-services", sectionType: "ServicesSection" }, // <--- Or use ServicesPreviewSection for a summary
				{ id: "home-process", sectionType: "ProcessSection" },
				{ id: "home-blog", sectionType: "BlogSection" }, // <--- Or use BlogPreviewSection for a summary
				{ id: "home-faq", sectionType: "HomepageFaqSection" }, // <--- FAQ specifically for homepage
				{ id: "home-contact", sectionType: "ContactSection" },
			],
		},
		{
			path: "/resources/:slug", // <--- DYNAMIC PAGE STRUCTURE (e.g., individual resource page)
			sections: [
				{ id: "resource-main-content", sectionType: "ResourceDetailSection" },
			],
		},
		{
			path: "/resources", // <--- RESOURCES INDEX PAGE STRUCTURE
			seo: {
				title: "Helpful Resources",
				description: "Explore our collection of e-books, guides, and tools.",
			},
			sections: [
				{ id: "resources-list-main", sectionType: "ResourceListSection" },
			],
		},
		{
			path: "/about", // <--- ABOUT US PAGE STRUCTURE
			seo: {
				title: "About Our Company",
				description:
					"Learn more about our company, our mission, and our values.",
			},
			sections: [
				{ id: "about-main-content", sectionType: "AboutSection" }, // <--- Main content for the About page
				{ id: "about-testimonials", sectionType: "TestimonialsSection" },
				{ id: "about-cta", sectionType: "CtaSection" },
			],
		},
	],
};
