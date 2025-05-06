import type { ClientsSectionProps } from "@/components/sections/clients-section";
import type { CtaSectionProps } from "@/components/sections/cta-section";
import type { FeaturesSectionProps } from "@/components/sections/features-section";
import type { HeroSectionProps } from "@/components/sections/hero-section";
import type { ProblemPainSectionProps } from "@/components/sections/problem-pain-section";
import type { SolutionVisionSectionProps } from "@/components/sections/solution-vision-section";
import type { TestimonialsSectionProps } from "@/components/sections/testimonials-section";

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
	repeats: 3,
	slideWidth: 166,
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
	badgeText: "Understand the Pain",
	heading: "Recognize Your Challenges",
	description:
		"Acknowledge the core obstacles visitors face and outline what's at stake if these issues go unaddressed.",
	points: [
		"Inconsistent lead flow and weak pipeline",
		"Wasted time on ineffective marketing",
		"Falling behind more visible competitors",
		"Unpredictable or stagnant growth",
	],
};

export const solutionVisionSectionData: SolutionVisionSectionProps = {
	badgeText: "Experience the Solution",
	heading: "How We Transform Your Business",
	description:
		"Through our proven process, we resolve core challenges and drive tangible growth—envision a future where your goals become reality.",
	benefits: [
		"A steady pipeline of qualified leads",
		"Efficient strategies tailored to your goals",
		"A standout brand that attracts attention",
		"Measurable, sustainable business growth",
	],
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
