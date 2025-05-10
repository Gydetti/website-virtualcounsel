import { z } from "zod";
import {
	formBlockConfigSchema,
	formBlockSchema,
	imageBlockSchema,
	resourceContentBlockSchema,
	resourceSchema,
	textBlockSchema,
} from "../schemas/contentBlocks.schema";

// Define specific section prop types
export interface TextSectionProps {
	content: string;
}
export interface ImageSectionProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
}
export interface FormSectionProps {
	formEmbed?: ReactNode;
}

// Union type for resource sections
export type ResourceSection =
	| { type: "text"; props: TextSectionProps }
	| { type: "image"; props: ImageSectionProps }
	| { type: "form"; props: FormSectionProps };

// Define the Resource type and data accessors
export type Resource = {
	slug: string;
	type: string;
	title: string;
	subtitle?: string;
	heroImage: string;
	sections: ResourceSection[];
};

// Sample resource data conformed to the new Zod schemas
const sampleResourcesData: z.infer<typeof resourceSchema>[] = [
	{
		slug: "example-ebook",
		resourceType: "ebook",
		title: "E-Book: The Ultimate Guide to Conversion Optimization",
		subtitle: "Learn proven tactics to boost your landing page conversions.",
		heroImage: {
			src: "/images/resources/example-ebook-hero.jpg",
			alt: "Hero image for The Ultimate Guide to Conversion Optimization E-Book", // Provide a meaningful alt
			width: 1200,
			height: 630,
		},
		sections: [
			{
				type: "text",
				content:
					"Introduce the resource: who it's for, why it's valuable, and what your reader will learn.",
			},
			{
				type: "image",
				image: {
					src: "/images/resources/example-ebook-preview.png",
					alt: "Preview of the conversion optimization guide",
					width: 800,
					height: 600,
				},
				caption: "A sneak peek inside the guide.",
			},
			{
				type: "form",
				title: "Download Your Free E-Book",
				description: "Enter your details below to get instant access.",
				config: {
					// Example: provider: "hubspot", portalId: "YOUR_PORTAL_ID", formId: "YOUR_FORM_ID"
					// For now, an empty config or a placeholder for a custom embed that would be filled later
					provider: "custom",
					embedCode: "<!-- Placeholder for custom form embed code -->",
				},
			},
		],
		// seo: { title: "...", description: "..." } // SEO data can be added here
		// publishedDate: new Date().toISOString(), // Example for publishedDate
	},
];

// Validate the sample data
try {
	z.array(resourceSchema).parse(sampleResourcesData);
} catch (error) {
	console.error(
		"Error validating sample resources data:",
		error instanceof z.ZodError ? error.errors : error,
	);
	// Throw error during build or testing to catch issues early
	// throw new Error("Sample resources data validation failed");
}

// Return the sample resource data (can be replaced by CMS fetch)
export async function getResources(): Promise<
	z.infer<typeof resourceSchema>[]
> {
	// In a real app, you might fetch and then validate data from a CMS here
	return sampleResourcesData;
}

// Find a resource by slug
export async function getResourceBySlug(
	slug: string,
): Promise<z.infer<typeof resourceSchema> | undefined> {
	const resource = sampleResourcesData.find((r) => r.slug === slug);
	// Optionally validate the found resource again if needed, though sampleResourcesData is already validated
	return resource;
}
