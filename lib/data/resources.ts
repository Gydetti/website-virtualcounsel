import { z } from 'zod';

import resourcesContent from '@/lib/content/resources.json';

import { resourceSchema } from '../schemas/contentBlocks.schema';

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
  formEmbed?: React.ReactNode;
}

// Union type for resource sections
export type ResourceSection =
  | { type: 'text'; props: TextSectionProps }
  | { type: 'image'; props: ImageSectionProps }
  | { type: 'form'; props: FormSectionProps };

// Define the Resource type and data accessors
export type Resource = {
  slug: string;
  type: string;
  title: string;
  subtitle?: string;
  heroImage: string;
  sections: ResourceSection[];
};

// Validate and parse the resources JSON data
const parsedResources = z.array(resourceSchema).parse(resourcesContent);

// Return the parsed resource data (can be replaced by CMS fetch)
export async function getResources(): Promise<z.infer<typeof resourceSchema>[]> {
  return parsedResources;
}

// Find a resource by slug
export async function getResourceBySlug(
  slug: string
): Promise<z.infer<typeof resourceSchema> | undefined> {
  return parsedResources.find(r => r.slug === slug);
}
