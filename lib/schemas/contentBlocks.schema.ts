import { z } from "zod";
import { imageSchema, seoSchema } from "./common.schema"; // Assuming cta might be a block type later

// Block type for simple text content
export const textBlockSchema = z.object({
	type: z.literal("text"),
	content: z.string().min(1, "Text content cannot be empty"),
});

// Block type for images
export const imageBlockSchema = z.object({
	type: z.literal("image"),
	image: imageSchema, // Reuses common imageSchema { src, alt, width, height, blurDataURL }
	caption: z.string().optional(),
});

// Block type for forms (e.g., Hubspot, Mailchimp embeds)
// For data, we store config rather than ReactNode
export const formBlockConfigSchema = z.object({
	provider: z.enum(["hubspot", "mailchimp", "custom"]).optional(), // Made optional, can be identified by other fields
	portalId: z.string().optional(), // Example: for Hubspot
	formId: z.string().optional(), // Example: for Hubspot
	embedCode: z.string().optional(), // For custom HTML embeds
	// Add other necessary fields based on how forms will be rendered
});

export const formBlockSchema = z.object({
	type: z.literal("form"),
	config: formBlockConfigSchema,
	// Placeholder for a title or intro text before the form
	title: z.string().optional(),
	description: z.string().optional(),
});

// Discriminated union of all content block types for resources
export const resourceContentBlockSchema = z.discriminatedUnion("type", [
	textBlockSchema,
	imageBlockSchema,
	formBlockSchema,
	// Future block types can be added here (e.g., video, quote, cta)
]);

// Schema for an individual resource (e.g., e-book, whitepaper)
export const resourceSchema = z.object({
	slug: z.string().min(1),
	resourceType: z.enum([
		"ebook",
		"whitepaper",
		"case-study",
		"guide",
		"report",
		"template",
		"other",
	]), // Renamed from 'type' to avoid conflict, made more generic
	title: z.string().min(1),
	subtitle: z.string().optional(),
	heroImage: imageSchema, // Main image for the resource
	sections: z
		.array(resourceContentBlockSchema)
		.min(1, "Resource must have at least one content section"),
	seo: seoSchema.optional(),
	publishedDate: z.string().pipe(z.coerce.date()).optional(), // Example of additional metadata
	// author: authorSchema.optional(), // If resources have authors (authorSchema from pages.schema.ts or common)
});
