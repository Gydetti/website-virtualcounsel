// Common Zod schemas (links, images, CTAs, SEO, etc.)
import { z } from 'zod';

// Define a placeholder export to satisfy module requirements until actual schemas are added.
// This will be replaced by actual schema exports.
export const placeholderCommonSchema = z.object({});

export const linkSchema = z.object({
  text: z.string().min(1, { message: 'Link text cannot be empty' }),
  href: z.string().min(1, { message: 'Link href cannot be empty' }),
  external: z.boolean().optional(),
});

export const imageSchema = z.object({
  src: z.string().min(1, { message: 'Image src cannot be empty' }),
  alt: z.string().min(1, { message: 'Image alt text cannot be empty' }),
  width: z.number().optional(),
  height: z.number().optional(),
  blurDataURL: z.string().optional(),
});

export const ctaSchema = linkSchema.extend({
  variant: z.enum(['primary', 'secondary', 'outline', 'ghost', 'link']).optional(),
});

export const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});
