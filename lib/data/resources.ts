import 'server-only';

import fs from 'node:fs';
import path from 'node:path';

import type { z } from 'zod';

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

const resourcesDirectory = path.join(process.cwd(), 'lib/content/resources');

export async function getResources(): Promise<z.infer<typeof resourceSchema>[]> {
  const filenames = fs.readdirSync(resourcesDirectory);
  const resources = filenames.map(filename => {
    const filePath = path.join(resourcesDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const resource = JSON.parse(fileContents);
    return resourceSchema.parse(resource);
  });
  return resources;
}

export async function getResourceBySlug(
  slug: string
): Promise<z.infer<typeof resourceSchema> | undefined> {
  const resources = await getResources();
  return resources.find(resource => resource.slug === slug);
}
