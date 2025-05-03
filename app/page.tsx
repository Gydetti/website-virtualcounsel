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
import { getBlogPosts, getServices } from "@/lib/data-utils";
import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site.config";
import type { Metadata } from "next";

export const metadata = defaultMetadata({
	title: `${siteConfig.site.name} | Home`,
});

export default async function Home() {
	// Fetch data for the homepage
	const services = await getServices();
	const blogPosts = await getBlogPosts(3); // Limit to 3 posts for the homepage

	return (
		<>
			<HeroSection />
			{/* Pricing Section */}
			<LazySection>
				<PricingSection cards={siteConfig.sections.pricing.cards} />
			</LazySection>
			<LazySection>
				<ClientsSection />
			</LazySection>
			<LazySection>
				<ServicesSection services={services} />
			</LazySection>
			<LazySection>
				<FeaturesSection />
			</LazySection>
			<LazySection>
				<AboutSection />
			</LazySection>
			<LazySection>
				<ProcessSection />
			</LazySection>
			<LazySection>
				<TestimonialsSection />
			</LazySection>
			<LazySection>
				<BlogSection posts={blogPosts} />
			</LazySection>
			<LazySection>
				<CtaSection />
			</LazySection>
			<LazySection>
				<ContactSection />
			</LazySection>
		</>
	);
}
