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

// Stub: return an empty array or fetch from CMS
export async function getResources(): Promise<Resource[]> {
  return [];
}

// Find a resource by slug
export async function getResourceBySlug(
  slug: string,
): Promise<Resource | undefined> {
  const resources = await getResources();
  return resources.find((r) => r.slug === slug);
} 