import ResourceContent from "@/components/resources/ResourceContent";
import { getResources, getResourceBySlug } from "@/lib/data/resources";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const resources = await getResources();
  return resources.map((r) => ({ slug: r.slug }));
}

export default async function ResourceDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const resource = await getResourceBySlug(slug);
  if (!resource) notFound();

  return <ResourceContent resource={resource} />;
} 