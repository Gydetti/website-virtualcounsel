import LazySection from "@/components/ui/lazy-section"; // Assuming LazySection is still used
import type {
	pageSectionConfigSchema,
	pageStructureSchema,
} from "@/lib/schemas/siteConfig.schema"; // Adjust path as needed
import type { ComponentType, FC } from "react";
import type { z } from "zod";

// --- Section Component Imports (examples, to be expanded) ---
// import HeroSection from "@/components/sections/hero-section";
// import ClientsSection from "@/components/sections/clients-section";
// import ServicesPreviewSection from "@/components/sections/services-preview-section"; // Example
// import TestimonialsSection from "@/components/sections/testimonials-section";
// import BlogPreviewSection from "@/components/sections/blog-preview-section"; // Example
// import CtaSection from "@/components/sections/cta-section";
// We will need to import all actual section components that can be dynamically rendered.

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
	// HeroSection: HeroSection,
	// ClientsSection: ClientsSection,
	// ServicesPreviewSection: ServicesPreviewSection,
	// TestimonialsSection: TestimonialsSection,
	// BlogPreviewSection: BlogPreviewSection,
	// CtaSection: CtaSection,
	// Add other section components here as they are created/refactored
	// e.g., "AboutContentSection": AboutContentSection, "TeamSection": TeamSection
};

// Placeholder for data fetching logic for dynamic sections
// This is a critical part and will need careful design.
// It might involve fetching from `lib/data/` files based on pagePath and sectionType,
// or using a more structured data retrieval mechanism.
const getSectionData = (
	pagePath: string,
	sectionConfig: PageSectionConfig, // Use the inferred type
	// allSectionsData: Record<string, unknown>
): Record<string, unknown> => {
	// Return Record<string, unknown>
	// TODO: Implement actual data fetching/retrieval logic.
	// For now, return placeholder data or an empty object.
	// Example: if (pagePath === "/" && sectionConfig.sectionType === "HeroSection") {
	//   return homepageData.heroSection; // Assuming homepageData is accessible
	// }
	console.warn(
		`Data fetching for section type "${sectionConfig.sectionType}" on page "${pagePath}" (id: ${sectionConfig.id}) is not yet implemented.`,
	);
	return { id: sectionConfig.id }; // Pass at least the ID for keying
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
				const sectionData = getSectionData(
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
