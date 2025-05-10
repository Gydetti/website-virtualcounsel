import LazySection from "@/components/ui/lazy-section"; // Assuming LazySection is still used
import type {
	pageSectionConfigSchema,
	pageStructureSchema,
} from "@/lib/schemas/siteConfig.schema"; // Adjust path as needed
import type { ComponentType, FC } from "react";
import type { z } from "zod";

import ResourceDetailSection from "@/components/sections/ResourceDetailSection"; // ++ Import ResourceDetailSection
import ResourceListSection from "@/components/sections/ResourceListSection"; // ++ Import
import AboutSection from "@/components/sections/about-section"; // ++ Import
import BlogSection from "@/components/sections/blog-section"; // For BlogPreviewSection
import ClientsSection from "@/components/sections/clients-section";
import CtaSection from "@/components/sections/cta-section";
// --- Section Component Imports ---
import HeroSection from "@/components/sections/hero-section";
import ServicesSection from "@/components/sections/services-section"; // For ServicesPreviewSection
import TestimonialsSection from "@/components/sections/testimonials-section";
// Import other sections as needed for other pages later:
// import AboutSection from "@/components/sections/about-section";
// import FeaturesSection from "@/components/sections/features-section";
// import ContactSection from "@/components/sections/contact-section";
// import ValuePropSection from "@/components/sections/value-prop-section";
// import ProcessSection from "@/components/sections/process-section";
// import SolutionVisionSection from "@/components/sections/solution-vision-section";
// import HomepageFaqSection from "@/components/sections/homepage-faq-section";
// import PricingSection from "@/components/sections/pricing-section";
// import ProblemPainSection from "@/components/sections/problem-pain-section";

import { getBlogPosts, getServices } from "@/lib/data-utils"; // Now using these
import { aboutPageMainContentData } from "@/lib/data/aboutPageData"; // ++ Import about page data
// ++ NEW IMPORTS FOR DATA ++
import * as homepageData from "@/lib/data/homepage";
import {
	getResourceBySlug as getResourceBySlugFromData,
	getResources,
} from "@/lib/data/resources"; // Alias to avoid conflict if used directly
import { siteConfig } from "@/lib/site.config.local"; // For blog limit

// Define the type for the component props
type PageStructure = z.infer<typeof pageStructureSchema>;
type PageSectionConfig = z.infer<typeof pageSectionConfigSchema>; // Added for clarity

interface DynamicPageRendererProps {
	pagePath: string; // To help with data fetching context if needed
	pageStructure: PageStructure;
	// We might need a way to pass down all site-wide section data, or fetch it here.
	// allSectionsData: Record<string, unknown>; // Using unknown for potential future prop
}

// Corrected sectionComponentMap
const sectionComponentMap: Record<string, ComponentType<any>> = {
	HeroSection: HeroSection,
	ClientsSection: ClientsSection,
	ServicesPreviewSection: ServicesSection,
	TestimonialsSection: TestimonialsSection,
	BlogPreviewSection: BlogSection,
	CtaSection: CtaSection,
	ResourceDetailSection: ResourceDetailSection,
	ResourceListSection: ResourceListSection,
	AboutSection: AboutSection,
};

// Async data fetching
const getSectionData = async (
	pagePath: string,
	sectionConfig: PageSectionConfig,
): Promise<Record<string, unknown>> => {
	if (pagePath === "/") {
		switch (sectionConfig.sectionType) {
			case "HeroSection":
				return homepageData.heroSectionData;
			case "ClientsSection":
				return homepageData.clientsSectionData;
			case "TestimonialsSection":
				return homepageData.testimonialsSectionData;
			case "CtaSection":
				return homepageData.ctaSectionData;
			case "ServicesPreviewSection": {
				const services = await getServices();
				return {
					...homepageData.servicesPreviewSectionData,
					id: sectionConfig.id,
					services: services.slice(0, 3),
				};
			}
			case "BlogPreviewSection": {
				const blogLimit = siteConfig.sectionsDataKeys?.blog?.limit || 3;
				const posts = await getBlogPosts(blogLimit);
				return {
					...homepageData.blogPreviewSectionData,
					id: sectionConfig.id,
					posts: posts,
				};
			}
			default:
				console.warn(
					`Data for section type "${sectionConfig.sectionType}" (id: ${sectionConfig.id}) not implemented for homepage.`,
				);
				return { id: sectionConfig.id };
		}
	}

	if (pagePath.startsWith("/resources/")) {
		const slug = pagePath.substring("/resources/".length);
		if (slug && sectionConfig.sectionType === "ResourceDetailSection") {
			const resource = await getResourceBySlugFromData(slug);
			if (resource) {
				return { resource: resource };
			}
			console.warn(
				`Resource with slug "${slug}" not found for ResourceDetailSection.`,
			);
			return { resource: null };
		}
	}

	if (pagePath === "/resources") {
		if (sectionConfig.sectionType === "ResourceListSection") {
			const resources = await getResources();
			return {
				id: sectionConfig.id,
				resources: resources,
			};
		}
	}

	if (pagePath === "/about") {
		switch (sectionConfig.sectionType) {
			case "AboutSection":
				return aboutPageMainContentData;
			case "TestimonialsSection":
				return homepageData.testimonialsSectionData;
			case "CtaSection":
				return homepageData.ctaSectionData;
			default:
				console.warn(
					`Data for section type "${sectionConfig.sectionType}" (id: ${sectionConfig.id}) not implemented for /about page.`,
				);
				return { id: sectionConfig.id };
		}
	}

	console.warn(
		`Data fetching for section type "${sectionConfig.sectionType}" on page "${pagePath}" (id: ${sectionConfig.id}) is not implemented.`,
	);
	return { id: sectionConfig.id };
};

// DynamicPageRenderer becomes an async component
const DynamicPageRenderer: FC<DynamicPageRendererProps> = async ({
	pagePath,
	pageStructure,
	// allSectionsData
}) => {
	if (!pageStructure?.sections || pageStructure.sections.length === 0) {
		// Or render a fallback, or handle this upstream
		return <p>No sections configured for this page.</p>;
	}

	// Fetch data for all sections in parallel
	const sectionsWithDataPromises = pageStructure.sections.map((sectionConfig) =>
		getSectionData(pagePath, sectionConfig).then((data) => ({
			...sectionConfig,
			data,
		})),
	);
	const sectionsWithData = await Promise.all(sectionsWithDataPromises);

	return (
		<>
			{sectionsWithData.map((section) => {
				const Component = sectionComponentMap[section.sectionType];

				if (!Component) {
					console.error(
						`Error: Unknown section type "${section.sectionType}" for id "${section.id}" on page "${pagePath}". Check component map.`,
					);
					// Render a fallback or an error message in development
					return (
						<div key={section.id} className="py-8 text-center text-red-500">
							Unknown section type: {section.sectionType} (ID: {section.id})
						</div>
					);
				}

				return (
					<LazySection key={section.id}>
						<Component {...section.data} />
					</LazySection>
				);
			})}
		</>
	);
};

export default DynamicPageRenderer;
