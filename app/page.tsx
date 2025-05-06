import AboutSection from "@/components/sections/about-section";
import BlogSection from "@/components/sections/blog-section";
import ClientsSection from "@/components/sections/clients-section";
import ContactSection from "@/components/sections/contact-section";
import CtaSection from "@/components/sections/cta-section";
import FeaturesSection, {
	FeaturesSectionProps,
} from "@/components/sections/features-section";
import HeroSection, {
	HeroSectionProps,
} from "@/components/sections/hero-section";
import PricingSection from "@/components/sections/pricing-section";
import ProblemPainSection, {
	ProblemPainSectionProps,
} from "@/components/sections/problem-pain-section";
import ProcessSection from "@/components/sections/process-section";
import ServicesSection from "@/components/sections/services-section";
import SolutionVisionSection, {
	SolutionVisionSectionProps,
} from "@/components/sections/solution-vision-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import LazySection from "@/components/ui/lazy-section";
import { getBlogPosts, getServices } from "@/lib/data-utils";
import {
	clientsSectionData,
	ctaSectionData,
	featuresSectionData,
	heroSectionData,
	problemPainSectionData,
	solutionVisionSectionData,
	testimonialsSectionData,
} from "@/lib/data/homepage";
import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site.config";
import type { Metadata } from "next";

export const metadata = defaultMetadata({
	title: `${siteConfig.site.name} | Home`,
	description: siteConfig.site.description,
});

export default async function Home() {
	// Fetch data for the homepage
	const services = await getServices();
	const blogPosts = await getBlogPosts(3); // Limit to 3 posts for the homepage

	return (
		<>
			{/* --- Research-Driven Homepage Structure for the Homepage --- */}

			{/* 1. Hero Section */}
			<HeroSection {...heroSectionData} />

			{/* Main Content Wrapper on global gradient */}
			<div className="relative">
				{/* 2. Value Proposition & Key Benefits */}
				<LazySection>
					<FeaturesSection {...featuresSectionData} />
				</LazySection>

				{/* 3. Social Proof (Client Logos) */}
				<LazySection>
					<ClientsSection {...clientsSectionData} />
				</LazySection>

				{/* 4. Testimonials (Social Proof Quotes) */}
				<LazySection>
					<TestimonialsSection {...testimonialsSectionData} />
				</LazySection>

				{/* 5. About Me (Trust Builder) */}
				<LazySection>
					<AboutSection />
				</LazySection>

				{/* 6. Empathy for the Problem */}
				<LazySection>
					<ProblemPainSection {...problemPainSectionData} />
				</LazySection>

				{/* 7. Solution & Vision */}
				<LazySection>
					<SolutionVisionSection {...solutionVisionSectionData} />
				</LazySection>

				{/* 8. Process (How It Works) */}
				<LazySection>
					<ProcessSection />
				</LazySection>

				{/* 9. Call-to-Action */}
				<LazySection>
					<CtaSection {...ctaSectionData} />
				</LazySection>

				{/* 10. Services */}
				<LazySection>
					<ServicesSection services={services} />
				</LazySection>

				{/* 11. Blog */}
				<LazySection>
					<BlogSection posts={blogPosts} />
				</LazySection>

				{/* 12. Contact */}
				<LazySection>
					<ContactSection />
				</LazySection>
			</div>
		</>
	);
}
