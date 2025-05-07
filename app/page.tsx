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
import HomepageFaqSection from "@/components/sections/homepage-faq-section";
import ProblemPainSection, {
	ProblemPainSectionProps,
} from "@/components/sections/problem-pain-section";
import ProcessSection from "@/components/sections/process-section";
import ServicesSection from "@/components/sections/services-section";
import SolutionVisionSection, {
	SolutionVisionSectionProps,
} from "@/components/sections/solution-vision-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import ValuePropSection from "@/components/sections/value-prop-section";
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
	valuePropSectionData,
} from "@/lib/data/homepage";
import { homepageFaqCategories } from "@/lib/data/homepage";
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
	const { features } = siteConfig;

	return (
		<>
			{/* --- Research-Driven Homepage Structure for the Homepage --- */}

			{/* 1. Hero Section */}
			{features.enableHeroSection && <HeroSection {...heroSectionData} />}

			{/* Main Content Wrapper on global gradient */}
			<div className="relative">
				{/* Value Proposition (Why Choose Us) */}
				{features.enableValuePropSection && (
					<LazySection>
						<ValuePropSection {...valuePropSectionData} />
					</LazySection>
				)}

				{/* Social Proof (Client Logos) */}
				{features.enableClientsSection && (
					<LazySection>
						<ClientsSection {...clientsSectionData} />
					</LazySection>
				)}

				{/* Empathy for the Problem & Solution (Pain and Solution Sections Animated Together) */}
				{features.enableProblemPainSection && (
					<LazySection>
						<ProblemPainSection {...problemPainSectionData} />
						{features.enableSolutionVisionSection && (
							<SolutionVisionSection {...solutionVisionSectionData} />
						)}
					</LazySection>
				)}

				{/* Value Proposition & Key Benefits */}
				{features.enableFeaturesSection && (
					<LazySection>
						<FeaturesSection {...featuresSectionData} />
					</LazySection>
				)}

				{/* Services */}
				{/* features.enableServices && (
					<LazySection>
						<ServicesSection services={services} />
					</LazySection>
				) */}

				{/* Testimonials (Social Proof Quotes) */}
				{features.enableTestimonials && (
					<LazySection>
						<TestimonialsSection {...testimonialsSectionData} />
					</LazySection>
				)}

				{/* Call-to-Action */}
				{features.enableCtaSection && (
					<LazySection>
						<CtaSection {...ctaSectionData} />
					</LazySection>
				)}

				{/* About Me (Trust Builder) */}
				{features.enableAboutSection && (
					<LazySection>
						<AboutSection />
					</LazySection>
				)}

				{/* Process (How It Works) */}
				{features.enableProcessSection && (
					<LazySection>
						<ProcessSection />
					</LazySection>
				)}

				{/* Frequently Asked Questions */}
				{features.enableFaqSection && (
					<LazySection>
						<HomepageFaqSection categories={homepageFaqCategories} />
					</LazySection>
				)}

				{/* Blog */}
				{features.enableBlog && (
					<LazySection>
						<BlogSection posts={blogPosts} />
					</LazySection>
				)}

				{/* Contact */}
				{features.enableContactForm && (
					<LazySection>
						<ContactSection />
					</LazySection>
				)}
			</div>
		</>
	);
}
