// Placeholder for page-specific Zod schemas (e.g., blog posts, service pages)
import { z } from 'zod';

import { imageSchema, seoSchema } from './common.schema';

export const authorSchema = z.object({
  name: z.string(),
  image: imageSchema.optional(), // Made optional as per data-utils
});

export const blogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  date: z.string(), // Keep date as string for compatibility
  category: z.string(),
  coverImage: imageSchema,
  content: z.string(), // This will be expanded with content blocks later
  slug: z.string(),
  featured: z.boolean().optional(),
  author: authorSchema,
  seo: seoSchema.optional(),
});

export const servicePageSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1), // Icon name, maps to a component
  features: z.array(z.string().min(1)).min(1, 'Service page must have at least one feature listed'),
  // popular: z.boolean().optional(), // This might be more of a display flag than core page data
  heroImage: imageSchema.optional(), // For a potential hero image specific to the service page
  // Further content for the service page can be defined using content blocks (Part 4)
  // For example: contentBlocks: z.array(contentBlockSchema).optional(),
  seo: seoSchema.optional(),
});

// Remove placeholder if all planned page schemas are added for this step
// export const placeholderPagesSchema = z.object({});
