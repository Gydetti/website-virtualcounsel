import LazySection from "@/components/ui/lazy-section"; // Assuming LazySection is still used
import type {
	pageSectionConfigSchema,
	pageStructureSchema,
} from "@/lib/schemas/siteConfig.schema"; // Adjust path as needed
import type { ComponentType, FC } from "react";
import type { z } from "zod";

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

// ++ NEW IMPORTS FOR DATA ++
import * as homepageData from "@/lib/data/homepage";
// import { getServices, getBlogPosts } from "@/lib/data-utils"; // Async, for future enhancement
// import { siteConfig } from "@/lib/site.config.local"; // For blog limit, if using async getBlogPosts

// Define the type for the component props
type PageStructure = z.infer<typeof pageStructureSchema>;
type PageSectionConfig = z.infer<typeof pageSectionConfigSchema>; // Added for clarity

interface DynamicPageRendererProps {
	pagePath: string; // To help with data fetching context if needed
	pageStructure: PageStructure;
	// We might need a way to pass down all site-wide section data, or fetch it here.
	// allSectionsData: Record<string, unknown>; // Using unknown for potential future prop
}

// Mapping from sectionType string to the actual React component
// This needs to be populated with all valid section components
const sectionComponentMap: Record<
	string,
	ComponentType<Record<string, unknown>>
> = {
	HeroSection: HeroSection,
	ClientsSection: ClientsSection,
	ServicesPreviewSection: ServicesSection, // Map preview type to actual component
	TestimonialsSection: TestimonialsSection,
	BlogPreviewSection: BlogSection, // Map preview type to actual component
	CtaSection: CtaSection,
	// Add other mappings here:
	// "AboutSection": AboutSection,
	// "FeaturesSection": FeaturesSection,
	// etc.
};

// Synchronous data fetching for initial implementation
const getSyncSectionData = (
	pagePath: string,
	sectionConfig: PageSectionConfig,
): Record<string, unknown> => {
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
			case "ServicesPreviewSection":
				console.warn(
					"ServicesPreviewSection data is using placeholder; requires async data or prop refinement.",
				);
				// This placeholder needs to align with ServicesSection's expected props
				return {
					id: sectionConfig.id,
					badgeText: "Our Core Services",
					heading: "Services We Offer",
					description: "Explore our range of expert services.",
					services: [], // Placeholder
					cta: { text: "View All Services", href: "/services" },
				};
			case "BlogPreviewSection":
				console.warn(
					"BlogPreviewSection data is using placeholder; requires async data or prop refinement.",
				);
				// This placeholder needs to align with BlogSection's expected props
				return {
					id: sectionConfig.id,
					badgeText: "From Our Blog",
					heading: "Latest News",
					posts: [], // Placeholder
					cta: { text: "View All Posts", href: "/blog" },
				};
			default:
				console.warn(
					`Sync data for section type "${sectionConfig.sectionType}" (id: ${sectionConfig.id}) not implemented for homepage.`,
				);
				return { id: sectionConfig.id }; // Fallback
		}
	}
	console.warn(`Sync data fetching for page "${pagePath}" is not implemented.`);
	return { id: sectionConfig.id }; // Fallback for other pages
};

const DynamicPageRenderer: FC<DynamicPageRendererProps> = ({
	pagePath,
	pageStructure,
	// allSectionsData
}) => {
	if (!pageStructure?.sections || pageStructure.sections.length === 0) {
		// Or render a fallback, or handle this upstream
		return <p>No sections configured for this page.</p>;
	}

	return (
		<>
			{pageStructure.sections.map((sectionConfig) => {
				const Component = sectionComponentMap[sectionConfig.sectionType];

				if (!Component) {
					console.error(
						`Error: Unknown section type "${sectionConfig.sectionType}" for id "${sectionConfig.id}" on page "${pagePath}". Check component map.`,
					);
					// Render a fallback or an error message in development
					return (
						<div
							key={sectionConfig.id}
							className="py-8 text-center text-red-500"
						>
							Unknown section type: {sectionConfig.sectionType} (ID:{" "}
							{sectionConfig.id})
						</div>
					);
				}

				// Fetch or resolve data for this specific section instance
				const sectionData = getSyncSectionData(
					pagePath,
					sectionConfig,
					// allSectionsData
				);

				return (
					<LazySection key={sectionConfig.id}>
						<Component {...sectionData} />
					</LazySection>
				);
			})}
		</>
	);
};

export default DynamicPageRenderer;
