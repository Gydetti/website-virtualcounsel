import AboutSection from "@/components/sections/about-section";
import BlogSection from "@/components/sections/blog-section";
import ClientsSection from "@/components/sections/clients-section";
import ContactSection from "@/components/sections/contact-section";
import CtaSection from "@/components/sections/cta-section";
import FeaturesSection from "@/components/sections/features-section";
import HeroSection from "@/components/sections/hero-section";
import PricingSection from "@/components/sections/pricing-section";
import ProcessSection from "@/components/sections/process-section";
import ServicesSection from "@/components/sections/services-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import LazySection from "@/components/ui/lazy-section";
import ProblemPainSection from "@/components/sections/problem-pain-section";
import SolutionVisionSection from "@/components/sections/solution-vision-section";
import { getBlogPosts, getServices } from "@/lib/data-utils";
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

			{/* 1. Hero Section:
				- H1: Clear value proposition (Who, What, Why)
				- Animated word loop for key benefits
				- Primary CTA above the fold */}
			<HeroSection />

			{/* Main Content Wrapper on global gradient */}
			<div className="relative">
				{/* 2. Value Proposition & Key Benefits */}
				<LazySection>
					<FeaturesSection />
				</LazySection>

				{/* 3. Social Proof */}
				<LazySection>
					<ClientsSection />
				</LazySection>
				<LazySection>
					<TestimonialsSection />
				</LazySection>

				{/* 4. Empathy for the Problem */}
				<LazySection>
					<ProblemPainSection />
				</LazySection>

				{/* 5. Solution & Vision */}
				<LazySection>
					<SolutionVisionSection />
				</LazySection>

				{/* 6. Call-to-Action (placed mid-flow) */}
				<LazySection>
					<CtaSection />
				</LazySection>

				{/* --- Secondary Sections (Optional) --- */}
				<LazySection>
					<ServicesSection services={services} />
				</LazySection>

				<LazySection>
					<BlogSection posts={blogPosts} />
				</LazySection>

				<LazySection>
					<ContactSection />
				</LazySection>
			</div>
		</>
	);
}
