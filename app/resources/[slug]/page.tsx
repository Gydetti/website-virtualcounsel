import DynamicPageRenderer from "@/components/layout/DynamicPageRenderer";
import { getResourceBySlug, getResources } from "@/lib/data/resources";
import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site.config.local";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	const resources = await getResources();
	return resources.map((r) => ({ slug: r.slug }));
}

const resourceDetailPageStructure = siteConfig.pageStructures?.find(
	(p) => p.path === "/resources/:slug",
);

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const resource = await getResourceBySlug(params.slug);
	if (!resource) {
		return defaultMetadata({ title: "Resource Not Found" });
	}

	const pageSeo = resource.seo;
	const title = pageSeo?.title || resource.title || "Resource";
	const description =
		pageSeo?.description || resource.subtitle || siteConfig.site.description;

	return defaultMetadata({
		title: `${title} | ${siteConfig.site.name}`,
		description: description,
		openGraph: {
			image: resource.heroImage
				? {
						url: resource.heroImage.src,
						alt: resource.heroImage.alt,
						width: resource.heroImage.width,
						height: resource.heroImage.height,
					}
				: undefined,
		},
	});
}

export default async function ResourceDetailPage({
	params,
}: {
	params: { slug: string };
}) {
	const { slug } = params;

	const resource = await getResourceBySlug(slug);
	if (!resource) {
		notFound();
	}

	if (!resourceDetailPageStructure) {
		return (
			<div className="container py-12 text-center">
				<p className="text-xl text-red-600">
					Resource detail page structure is not defined in site configuration.
				</p>
			</div>
		);
	}

	const currentPagePath = `/resources/${slug}`;

	return (
		<DynamicPageRenderer
			pagePath={currentPagePath}
			pageStructure={resourceDetailPageStructure}
		/>
	);
}
