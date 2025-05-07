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
	badgeText: "Digital growth solutions",
	headline: "Grow your business with",
	subheadline:
		"Helping entrepreneurs build their digital presence and grow their business with tailored solutions.",
	primaryCtaText: "Get started",
	primaryCtaLink: "/contact",
	secondaryCtaText: "Learn more about us",
	secondaryCtaLink: "/about",
	words: [
		"more visibility",
		"more clients",
		"more time",
		"more impact",
		"your business",
	],
	stats: [
		{ value: 95, suffix: "%", label: "Client satisfaction" },
		{ value: 120, suffix: "+", label: "Projects completed" },
		{ value: 7, suffix: "+", label: "Years experience" },
		{ value: 50, suffix: "+", label: "Happy clients" },
	],
	imageSrc: "/images/placeholders/placeholder-user.jpg",
	imageAlt: "Professional entrepreneur",
	showHelpedStats: true,
	showOverlayStat: true,
	overlayTitle: "Average Results",
	overlayValue: "+127% Leads",
};

export const featuresSectionData: FeaturesSectionProps = {
	badgeText: "Why choose us",
	heading: "Transform your business",
	description:
		"See the difference our services can make for your business growth and online presence.",
	withoutTitle: "Without our services",
	withoutItems: [
		"Struggling to attract qualified leads online",
		"Wasting time on ineffective marketing strategies",
		"Losing business to more visible competitors",
		"Inconsistent results and unpredictable growth",
		"Feeling overwhelmed by constant digital changes",
	],
	withTitle: "With our services",
	withItems: [
		"Steady flow of qualified leads from your digital presence",
		"Strategic approach that maximizes your time and budget",
		"Stand out from competitors with a distinctive brand",
		"Consistent, measurable growth you can track",
		"Expert guidance keeping you ahead of industry trends",
	],
	ctaText: "Explore our services",
	ctaLink: "/services",
};

export const clientsSectionData: ClientsSectionProps = {
	badgeText: "Trusted by",
	heading: "Companies that trust us",
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
	heading: "What our clients say",
	subtitle:
		"Don't just take our word for it. Here's what our clients have to say about working with us.",
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
	badgeText: "The Reality For Most Realtors",
	heading: "Struggling to stand out in a crowded market?",
	description:
		"Most real estate professionals face the same challenges: inconsistent leads, wasted marketing dollars, and not enough time. Without addressing these issues, your business remains vulnerable.",
	calloutText:
		"\"Without a strategic approach to lead generation, realtors risk stagnation while competitors capture market share. The cost of inaction isn't just lost revenue today—it's diminished growth potential for years to come.\"",
	cards: [
		{
			title: "Wasted Ad Spend",
			description:
				"Without a targeted strategy, you're throwing money at ads that don't convert to quality leads.",
		},
		{
			title: "Time Drain",
			description:
				"Hours spent on ineffective prospecting means less time for closing deals and personal life.",
		},
		{
			title: "Inconsistent Results",
			description:
				"The feast-or-famine cycle creates stress and makes business growth impossible to predict.",
		},
		{
			title: "Competitive Pressure",
			description:
				"As more agents adopt digital strategies, those without effective systems fall further behind.",
		},
	],
};

export const solutionVisionSectionData: SolutionVisionSectionProps = {
	badgeText: "The Solution",
	heading: "Transform your real estate business with our proven system",
	description:
		"Through our 12-week coaching program, you'll develop a customized marketing strategy that delivers consistent results without consuming your valuable time.",
	benefits: [
		"A consistent flow of qualified leads every month",
		"Automated systems that work while you sleep",
		"More time to focus on high-value activities",
		"Confidence in your marketing strategy",
		"Sustainable business growth without burnout",
	],
	calloutText:
		"Stop struggling with ineffective marketing and start thriving with a system designed specifically for real estate success.",
	calloutLinkText: "See how it works",
	calloutLinkHref: "/about",
};

export const ctaSectionData: CtaSectionProps = {
	badgeText: "Get started",
	heading: "Ready to grow your business?",
	description: "Let's discuss how we can help you achieve your business goals.",
	primaryCtaText: "Schedule a consultation",
	primaryCtaLink: "/contact",
	secondaryCtaText: "Learn more",
	secondaryCtaLink: "/services",
};

export const valuePropSectionData: ValuePropSectionProps = {
	badgeText: "Why Choose Us",
	heading: "Transform Your Real Estate Business",
	subheading:
		"Our unique approach combines proven marketing strategies with real estate expertise to deliver results that matter.",
	benefits: [
		{
			title: "Save 10+ Hours Weekly",
			description:
				"Our streamlined systems eliminate manual prospecting, giving you back precious time for closing deals.",
			icon: "check-circle",
		},
		{
			title: "Personalized Strategy",
			description:
				"Unlike generic marketing courses, we create custom plans based on your specific market and strengths.",
			icon: "check-circle",
		},
		{
			title: "Proven Results",
			description:
				"Our clients see an average 127% increase in qualified leads within the first 90 days of implementation.",
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
