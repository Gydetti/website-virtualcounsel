import type { ClientsSectionProps } from "@/components/sections/clients-section";
import type { CtaSectionProps } from "@/components/sections/cta-section";
import type { FeaturesSectionProps } from "@/components/sections/features-section";
import type { HeroSectionProps } from "@/components/sections/hero-section";
import type { ProblemPainSectionProps } from "@/components/sections/problem-pain-section";
import type { SolutionVisionSectionProps } from "@/components/sections/solution-vision-section";
import type { TestimonialsSectionProps } from "@/components/sections/testimonials-section";
import type { ValuePropSectionProps } from "@/components/sections/value-prop-section";
import { CheckCircle } from "lucide-react";

export const heroSectionData: HeroSectionProps = {
	badgeText: "Short, attention-grabbing badge",
	headline: "Headline stating your core value",
	subheadline:
		"Supportive subtitle: what you do, for whom, and the primary result",
	primaryCtaText: "Main CTA button",
	primaryCtaLink: "/contact",
	secondaryCtaText: "Secondary CTA button",
	secondaryCtaLink: "/about",
	words: ["Unique value prop", "Key benefit", "Target audience"],
	stats: [
		{ value: 7, suffix: "+", label: "Years of Experience" },
		{ value: 98, suffix: "%", label: "Client Satisfaction Rate" },
		{ value: 40, suffix: "+", label: "Successful Projects Delivered" },
		{ value: 300, suffix: "+", label: "Happy Clients" },
	],
	imageSrc: "/placeholder.svg",
	imageAlt: "Descriptive alt text for hero image",
	showHelpedStats: true,
	showOverlayStat: true,
	overlayTitle: "Overlay Stat Title",
	overlayValue: "+150%",
};

export const featuresSectionData: FeaturesSectionProps = {
	badgeText: "See the clear difference",
	heading: "From problem state to solution state",
	description: "Contrast typical challenges versus ideal outcomes",
	withoutTitle: "Current state",
	withoutItems: [
		"Pain point placeholder one",
		"Pain point placeholder two",
		"Pain point placeholder three",
		"Pain point placeholder four",
		"Pain point placeholder five",
	],
	withTitle: "Future state",
	withItems: [
		"Solution placeholder one",
		"Solution placeholder two",
		"Solution placeholder three",
		"Solution placeholder four",
		"Solution placeholder five",
	],
	ctaText: "Discover our method",
	ctaLink: "/services",
};

export const clientsSectionData: ClientsSectionProps = {
	badgeText: "Trusted by leading brands",
	heading: "Client logos showcasing credibility and partnerships",
	clients: [
		{ name: "TechCorp", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "InnovateLabs", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "GrowthPartners", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "FutureVision", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "NextLevel", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "PeakPerformance", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "EliteServices", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "PrimeConsulting", logo: "/placeholder.svg?height=60&width=120" },
	],
};

export const testimonialsSectionData: TestimonialsSectionProps = {
	badgeText: "Testimonials",
	heading: "Testimonial section",
	subtitle: "Important section to build credibility with real client feedback",
	testimonials: [
		{
			quote:
				"Working with this team transformed our online presence. Within three months, our website traffic increased by 150% and our leads doubled. Their strategic approach and attention to detail made all the difference.",
			name: "Sarah Johnson",
			title: "CEO, Innovate Solutions",
			image: "/placeholder.svg?height=60&width=60",
		},
		{
			quote:
				"I was skeptical about digital marketing until I started working with this team. They took the time to understand my business and created a strategy that actually works. My ROI has been incredible.",
			name: "Michael Chen",
			title: "Founder, GrowthTech",
			image: "/placeholder.svg?height=60&width=60",
		},
		{
			quote:
				"The level of expertise and personalized service is outstanding. They don't just implement tactics; they develop comprehensive strategies tailored to my specific goals. I've seen consistent growth month after month.",
			name: "Emma Rodriguez",
			title: "Marketing Director, Elevate Inc.",
			image: "/placeholder.svg?height=60&width=60",
		},
	],
};

export const problemPainSectionData: ProblemPainSectionProps = {
	badgeText: "Problem section",
	heading: "Understanding client challenges",
	description: "Empathy-driven intro highlighting common client problems",
	calloutText: "Optional: emphasize the cost of inaction",
	cards: [
		{
			title: "Pain Point One",
			description: "Describe how this challenge affects the client",
		},
		{
			title: "Pain Point Two",
			description: "Explain this second common frustration briefly",
		},
		{
			title: "Pain Point Three",
			description: "Outline another key challenge your clients face",
		},
		{
			title: "Pain Point Four",
			description: "Highlight an additional obstacle impacting clients",
		},
	],
};

export const solutionVisionSectionData: SolutionVisionSectionProps = {
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
	calloutLinkText: "Learn how it works",
	calloutLinkHref: "/about",
};

export const ctaSectionData: CtaSectionProps = {
	badgeText: "Ready to get started?",
	heading: "Let's build your success story together",
	description: "Persuasive message reinforcing the benefit of acting now",
	primaryCtaText: "Schedule a consultation",
	primaryCtaLink: "/contact",
	secondaryCtaText: "Download a free resource",
	secondaryCtaLink: "/services",
};

export const valuePropSectionData: ValuePropSectionProps = {
	badgeText: "Why choose us?",
	heading: "How we deliver exceptional results",
	subheading:
		"Highlight key differentiators that answer 'What's in it for the client?'",
	benefits: [
		{
			title: "Achieve Goals Faster",
			description:
				"Accelerate outcomes with targeted strategies for your business.",
			icon: "check-circle",
		},
		{
			title: "Tailored Solutions",
			description: "Receive custom plans crafted to your unique needs.",
			icon: "check-circle",
		},
		{
			title: "Measurable Impact",
			description: "Track real results with clear metrics and KPIs.",
			icon: "check-circle",
		},
	],
};

// Add homepage FAQ data
export const homepageFaqCategories = [
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
];
