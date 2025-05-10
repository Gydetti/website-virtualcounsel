import { z } from "zod";
import {
	blogSectionDataSchema,
	clientsSectionDataSchema,
	ctaSectionDataSchema,
	featuresSectionDataSchema,
	heroSectionDataSchema,
	homepageFaqSectionDataSchema,
	pricingSectionDataSchema,
	problemPainSectionDataSchema,
	servicesSectionDataSchema,
	solutionVisionSectionDataSchema,
	testimonialsSectionDataSchema,
	valuePropSectionDataSchema,
	// Import other section schemas as needed
} from "../schemas/sections.schema";

// Note: The old PropType imports are removed as we'll use Zod inferred types.

export const heroSectionData: z.infer<typeof heroSectionDataSchema> = {
	badgeText: "Short, attention-grabbing badge",
	headline: "Headline stating your core value",
	subheadline:
		"Supportive subtitle: what you do, for whom, and the primary result",
	primaryCta: { text: "Main CTA button", href: "/contact" },
	secondaryCta: { text: "Secondary CTA button", href: "/about" },
	showSecondaryCta: true,
	typingWords: ["Unique value prop", "Key benefit", "Target audience"],
	stats: [
		{ value: 7, suffix: "+", label: "Years of Experience" },
		{ value: 98, suffix: "%", label: "Client Satisfaction Rate" },
		{ value: 40, suffix: "+", label: "Successful Projects Delivered" },
		{ value: 300, suffix: "+", label: "Happy Clients" },
	],
	image: {
		src: "/placeholder.svg",
		alt: "Descriptive alt text for hero image",
	},
	showHelpedStats: true,
	showOverlayStat: true,
	overlayTitle: "Overlay Stat Title",
	overlayValue: "+150%",
};

export const featuresSectionData: z.infer<typeof featuresSectionDataSchema> = {
	badgeText: "See the clear difference",
	heading: "From problem state to solution state",
	description: "Contrast typical challenges versus ideal outcomes",
	comparison: {
		without: {
			title: "Current state",
			items: [
				"Pain point placeholder one",
				"Pain point placeholder two",
				"Pain point placeholder three",
				"Pain point placeholder four",
				"Pain point placeholder five",
			],
		},
		with: {
			title: "Future state",
			items: [
				"Solution placeholder one",
				"Solution placeholder two",
				"Solution placeholder three",
				"Solution placeholder four",
				"Solution placeholder five",
			],
		},
	},
	cta: { text: "Discover our method", href: "/services" },
};

export const clientsSectionData: z.infer<typeof clientsSectionDataSchema> = {
	badgeText: "Trusted by leading brands",
	heading: "Client logos showcasing credibility and partnerships", // Schema allows it, component might not use it
	clients: [
		{
			name: "TechCorp",
			logo: {
				src: "/placeholder.svg?height=60&width=120",
				alt: "TechCorp Logo",
			},
		},
		{
			name: "InnovateLabs",
			logo: {
				src: "/placeholder.svg?height=60&width=120",
				alt: "InnovateLabs Logo",
			},
		},
		{
			name: "GrowthPartners",
			logo: {
				src: "/placeholder.svg?height=60&width=120",
				alt: "GrowthPartners Logo",
			},
		},
		{
			name: "FutureVision",
			logo: {
				src: "/placeholder.svg?height=60&width=120",
				alt: "FutureVision Logo",
			},
		},
		{
			name: "NextLevel",
			logo: {
				src: "/placeholder.svg?height=60&width=120",
				alt: "NextLevel Logo",
			},
		},
		{
			name: "PeakPerformance",
			logo: {
				src: "/placeholder.svg?height=60&width=120",
				alt: "PeakPerformance Logo",
			},
		},
		{
			name: "EliteServices",
			logo: {
				src: "/placeholder.svg?height=60&width=120",
				alt: "EliteServices Logo",
			},
		},
		{
			name: "PrimeConsulting",
			logo: {
				src: "/placeholder.svg?height=60&width=120",
				alt: "PrimeConsulting Logo",
			},
		},
	],
};

export const testimonialsSectionData: z.infer<
	typeof testimonialsSectionDataSchema
> = {
	badgeText: "Testimonials",
	heading: "Testimonial section",
	subtitle: "Important section to build credibility with real client feedback",
	testimonials: [
		{
			id: "testimonial-1",
			quote:
				"Working with this team transformed our online presence. Within three months, our website traffic increased by 150% and our leads doubled. Their strategic approach and attention to detail made all the difference.",
			name: "Sarah Johnson",
			title: "CEO, Innovate Solutions",
			image: {
				src: "/placeholder.svg?height=60&width=60",
				alt: "Sarah Johnson",
			},
			rating: 5,
		},
		{
			id: "testimonial-2",
			quote:
				"I was skeptical about digital marketing until I started working with this team. They took the time to understand my business and created a strategy that actually works. My ROI has been incredible.",
			name: "Michael Chen",
			title: "Founder, GrowthTech",
			image: {
				src: "/placeholder.svg?height=60&width=60",
				alt: "Michael Chen",
			},
			rating: 5,
		},
		{
			id: "testimonial-3",
			quote:
				"The level of expertise and personalized service is outstanding. They don't just implement tactics; they develop comprehensive strategies tailored to my specific goals. I've seen consistent growth month after month.",
			name: "Emma Rodriguez",
			title: "Marketing Director, Elevate Inc.",
			image: {
				src: "/placeholder.svg?height=60&width=60",
				alt: "Emma Rodriguez",
			},
			rating: 5,
		},
	],
};

export const problemPainSectionData: z.infer<
	typeof problemPainSectionDataSchema
> = {
	badgeText: "Problem section",
	heading: "Understanding client challenges",
	description: "Empathy-driven intro highlighting common client problems",
	calloutText: "Optional: emphasize the cost of inaction",
	cards: [
		{
			id: "pain-card-1",
			title: "Pain Point One",
			description: "Describe how this challenge affects the client",
		},
		{
			id: "pain-card-2",
			title: "Pain Point Two",
			description: "Explain this second common frustration briefly",
		},
		{
			id: "pain-card-3",
			title: "Pain Point Three",
			description: "Outline another key challenge your clients face",
		},
		{
			id: "pain-card-4",
			title: "Pain Point Four",
			description: "Highlight an additional obstacle impacting clients",
		},
	],
};

export const solutionVisionSectionData: z.infer<
	typeof solutionVisionSectionDataSchema
> = {
	badgeText: "Introducing your solution",
	heading: "Your clear path to success",
	description:
		"Explain how this section outlines your approach to solving client challenges",
	benefits: [
		"Consistent, predictable results",
		"More time for core activities",
		"Confidence in your strategy",
		"Optional: additional benefit placeholder",
		"Optional: another key outcome",
	],
	calloutText: "Optional: inspiring statement about expected outcomes",
	calloutCta: { text: "Learn how it works", href: "/about" },
};

export const ctaSectionData: z.infer<typeof ctaSectionDataSchema> = {
	badgeText: "Ready to get started?",
	heading: "Let's build your success story together",
	description: "Persuasive message reinforcing the benefit of acting now",
	primaryCta: { text: "Schedule a consultation", href: "/contact" },
	secondaryCta: { text: "Download a free resource", href: "/services" },
};

export const valuePropSectionData: z.infer<typeof valuePropSectionDataSchema> =
	{
		badgeText: "Why choose us?",
		heading: "How we deliver exceptional results",
		subheading:
			'Highlight key differentiators that answer "What\'s in it for the client?"]',
		benefits: [
			{
				id: "benefit-1",
				title: "Achieve Goals Faster",
				description:
					"Accelerate outcomes with targeted strategies for your business.",
				icon: "check-circle",
			},
			{
				id: "benefit-2",
				title: "Tailored Solutions",
				description: "Receive custom plans crafted to your unique needs.",
				icon: "check-circle",
			},
			{
				id: "benefit-3",
				title: "Measurable Impact",
				description: "Track real results with clear metrics and KPIs.",
				icon: "check-circle",
			},
		],
	};

export const pricingSectionData: z.infer<typeof pricingSectionDataSchema> = {
	badgeText: "Simple & Transparent",
	heading: "Our Pricing Plans",
	description: "Choose the plan that fits your needs.",
	cards: [
		{
			id: "price-basic",
			title: "Basic",
			price: "$99/mo",
			features: ["Feature A", "Feature B", "Feature C"],
			cta: { text: "Choose Basic", href: "/#pricing" },
			popular: false,
		},
		{
			id: "price-pro",
			title: "Pro",
			price: "$199/mo",
			features: ["Feature A", "Feature B", "Feature C", "Feature D"],
			cta: { text: "Choose Pro", href: "/#pricing" },
			popular: true,
		},
		{
			id: "price-enterprise",
			title: "Enterprise",
			price: "$299/mo",
			features: ["All Pro features", "Feature E", "Feature F"],
			cta: { text: "Contact Sales", href: "/contact" },
			popular: false,
		},
	],
};

export const homepageFaqSectionData: z.infer<
	typeof homepageFaqSectionDataSchema
> = {
	badgeText: "Your Questions Answered",
	heading: "Frequently Asked Questions",
	description:
		"Find quick answers to common inquiries about our services and processes. If you don't see your question here, feel free to reach out!",
	categories: [
		{
			category: "General Questions",
			questions: [
				{
					question: "What services do you offer?",
					answer:
						"We provide digital growth strategy, web design, content marketing, and automation to help businesses scale.",
				},
				{
					question: "How do I get started?",
					answer:
						"You can reach out via our contact form or schedule a consultation to discuss your needs and goals.",
				},
				{
					question: "Which industries do you serve?",
					answer:
						"We work with entrepreneurs and small businesses across tech, professional services, e-commerce, and more.",
				},
			],
		},
		{
			category: "Services",
			questions: [
				{
					question: "Can I customize my service package?",
					answer:
						"Absolutely—each package is tailored to your specific goals and budget to ensure the best outcome.",
				},
				{
					question: "How long does a typical project take?",
					answer:
						"Most projects take between 4 to 8 weeks, depending on the scope and complexity.",
				},
				{
					question: "Do you provide ongoing support?",
					answer:
						"Yes, we offer maintenance and optimization services after launch to keep your digital presence at peak performance.",
				},
			],
		},
		{
			category: "Pricing & Billing",
			questions: [
				{
					question: "What are your pricing options?",
					answer:
						"We offer both fixed-price packages and hourly rates, allowing flexibility based on project needs.",
				},
				{
					question: "Do you offer payment plans?",
					answer:
						"Yes, we can structure payments into milestones to fit your budgeting requirements.",
				},
				{
					question: "Is there a refund policy?",
					answer:
						"If you're not satisfied within the first 14 days of service, we offer a full refund.",
				},
			],
		},
	],
	cta: { text: "View All FAQs", href: "/faq" },
};

// ++ Data for Services Preview Section on Homepage (Corrected) ++
export const servicesPreviewSectionData: Omit<
	z.infer<typeof servicesSectionDataSchema>,
	"services"
> = {
	title: "Services We Offer", // Schema has 'title', not 'heading'. No 'badgeText' in schema.
	description:
		"Explore our range of expert services designed to help your business thrive.",
	viewAllCta: { text: "View All Services", href: "/services" },
	displayType: "grid", // Added as per schema, can be overridden if needed by component
};

// ++ Data for Blog Preview Section on Homepage ++
export const blogPreviewSectionData: Omit<
	z.infer<typeof blogSectionDataSchema>,
	"posts"
> = {
	badgeText: "From Our Blog",
	heading: "Latest Articles & Insights",
	subtitle: "Stay updated with our latest news, tips, and industry insights.",
	viewAllCta: { text: "View All Posts", href: "/blog" },
};

// Schema validation for all exported data objects
try {
	heroSectionDataSchema.parse(heroSectionData);
	featuresSectionDataSchema.parse(featuresSectionData);
	clientsSectionDataSchema.parse(clientsSectionData);
	testimonialsSectionDataSchema.parse(testimonialsSectionData);
	pricingSectionDataSchema.parse(pricingSectionData);
	servicesSectionDataSchema.parse({
		...servicesPreviewSectionData,
		services: [],
	});
	blogSectionDataSchema.parse({
		...blogPreviewSectionData,
		posts: [
			{
				id: "mock-post-validation",
				title: "Mock Post for Validation",
				excerpt: "This is a mock excerpt to satisfy Zod validation.",
				date: "2024-01-01",
				category: "Mock Category",
				image: { src: "/placeholder.svg", alt: "Mock Validation Image" },
				slug: "mock-post-slug-validation",
			},
		],
	});
	problemPainSectionDataSchema.parse(problemPainSectionData);
	solutionVisionSectionDataSchema.parse(solutionVisionSectionData);
	ctaSectionDataSchema.parse(ctaSectionData);
	valuePropSectionDataSchema.parse(valuePropSectionData);
	homepageFaqSectionDataSchema.parse(homepageFaqSectionData);
} catch (error) {
	console.error(
		"Error validating homepage data:",
		error instanceof z.ZodError ? error.errors : error,
	);
	// Decide how to handle validation errors: throw, log, etc.
	// For now, logging to console during development is fine.
	// In a build step, you might want to throw to fail the build.
}
