import { z } from 'zod';
import { ctaSchema, imageSchema, linkSchema } from './common.schema';

// Base block type for discrimination
const baseBlockSchema = z.object({
  id: z.string().uuid().optional(), // Optional unique ID for React keys or CMS linking
});

// Specific Block Schemas
export const headingBlockSchema = baseBlockSchema.extend({
  type: z.literal('heading'),
  level: z.enum(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  text: z.string().nonempty(),
});

export const textBlockSchema = baseBlockSchema.extend({
  type: z.literal('text'),
  // Allowing string for simple cases, could be extended for Markdown/HTML later
  content: z.string().nonempty(),
});

export const imageBlockSchema = baseBlockSchema.extend({
  type: z.literal('image'),
  image: imageSchema, // Use the common image schema
  caption: z.string().optional(),
});

export const videoBlockSchema = baseBlockSchema.extend({
  type: z.literal('video'),
  src: z.string().url(), // Expecting a URL for the video source
  caption: z.string().optional(),
});

export const quoteBlockSchema = baseBlockSchema.extend({
  type: z.literal('quote'),
  text: z.string().nonempty(),
  author: z.string().optional(),
  source: linkSchema.optional(), // Optional link for the source
});

// Use the shape of ctaSchema directly for simplicity
export const ctaBlockSchema = baseBlockSchema.extend({
  type: z.literal('cta'),
  ...ctaSchema.shape, // Includes text, href, external?, variant?
});

export const listBlockSchema = baseBlockSchema.extend({
  type: z.literal('list'),
  ordered: z.boolean().default(false),
  items: z.array(z.string().nonempty()).nonempty(), // Ensure items are non-empty strings and the array has at least one item
});

// Add other block types as needed, e.g., code block, divider, form embed

// Form block schemas for contact or embed forms
export const formBlockConfigSchema = z.object({
  provider: z.enum(['hubspot', 'mailchimp', 'custom']).optional(),
  portalId: z.string().optional(),
  formId: z.string().optional(),
  embedCode: z.string().optional(),
});

export const formBlockSchema = baseBlockSchema.extend({
  type: z.literal('form'),
  config: formBlockConfigSchema,
  title: z.string().optional(),
  description: z.string().optional(),
});

// Resource content blocks include all block types including forms
export const resourceContentBlockSchema = z.discriminatedUnion('type', [
  headingBlockSchema,
  textBlockSchema,
  imageBlockSchema,
  videoBlockSchema,
  quoteBlockSchema,
  ctaBlockSchema,
  listBlockSchema,
  formBlockSchema,
]);

// Schema for individual resource pages
export const resourceSchema = z.object({
  slug: z.string().nonempty(),
  resourceType: z.enum([
    'ebook',
    'whitepaper',
    'case-study',
    'guide',
    'report',
    'template',
    'other',
  ]),
  title: z.string().nonempty(),
  subtitle: z.string().optional(),
  heroImage: imageSchema,
  sections: z.array(resourceContentBlockSchema).min(1),
  seo: z.any().optional(),
  publishedDate: z.string().optional(),
});

export const contentBlockSchema = z.discriminatedUnion('type', [
  headingBlockSchema,
  textBlockSchema,
  imageBlockSchema,
  videoBlockSchema,
  quoteBlockSchema,
  ctaBlockSchema,
  listBlockSchema,
  formBlockSchema,
  // Add other block schemas here
]);

export type ContentBlock = z.infer<typeof contentBlockSchema>;
