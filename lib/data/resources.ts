// Define the Resource type and data accessors
export type Resource = {
	slug: string;
	type: string;
	title: string;
	subtitle?: string;
	heroImage: string;
	sections: Array<{
		type: string;
		props: Record<string, unknown>;
	}>;
};

// Sample resource data with guideline copy
const sampleResources: Resource[] = [
	{
		slug: "example-ebook",
		type: "ebook",
		title: "E-Book: The Ultimate Guide to Conversion Optimization",
		subtitle: "Learn proven tactics to boost your landing page conversions.",
		heroImage: "/images/resources/example-ebook-hero.jpg",
		sections: [
			{
				type: "text",
				props: {
					content:
						"Introduce the resource: who it's for, why it's valuable, and what your reader will learn.",
				},
			},
			{
				type: "image",
				props: {
					src: "/images/resources/example-ebook-preview.png",
					alt: "Preview of the conversion optimization guide",
					width: 800,
					height: 600,
				},
			},
			{
				type: "form",
				props: {
					// Replace this with your embed snippet, e.g. <HubSpotForm portalId=\"...\" formId=\"...\" />
					formEmbed: null,
				},
			},
		],
	},
];

// Return the sample resource data (can be replaced by CMS fetch)
export async function getResources(): Promise<Resource[]> {
	return sampleResources;
}

// Find a resource by slug
export async function getResourceBySlug(
	slug: string,
): Promise<Resource | undefined> {
	return sampleResources.find((r) => r.slug === slug);
}
