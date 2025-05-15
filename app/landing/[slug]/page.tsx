import LandingLayout from "@/app/landing/layout";
import ResourceDetailSection from "@/components/sections/ResourceDetailSection";
import { getResourceBySlug, getResources } from "@/lib/data/resources";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	const resources = await getResources();
	return resources.map((r) => ({ slug: r.slug }));
}

export default async function LandingPage({
	params,
}: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const resource = await getResourceBySlug(slug);
	if (!resource) notFound();

	return (
		<LandingLayout>
			<ResourceDetailSection resource={resource} />
		</LandingLayout>
	);
}
