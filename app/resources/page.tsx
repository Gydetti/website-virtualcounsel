import DynamicPageRenderer from "@/components/layout/DynamicPageRenderer";
import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site.config.local";
import type { Metadata } from "next";

// Find the page structure for the resources index page
const resourcesIndexPageStructure = siteConfig.pageStructures?.find(
	(p) => p.path === "/resources",
);

// Generate metadata: prioritize page-specific SEO from structure, then site defaults
export async function generateMetadata(): Promise<Metadata> {
	const pageSeo = resourcesIndexPageStructure?.seo;
	const title = pageSeo?.title || "Resources";
	const description =
		pageSeo?.description ||
		`Explore various resources offered by ${siteConfig.site.name}.`;

	return defaultMetadata({
		title: `${title} | ${siteConfig.site.name}`,
		description: description,
	});
}

export default async function ResourcesIndexPage() {
	if (!resourcesIndexPageStructure) {
		return (
			<div className="container py-12 text-center">
				<p className="text-xl text-red-600">
					Resources page structure is not defined in site configuration.
				</p>
			</div>
		);
	}

	return (
		<DynamicPageRenderer
			pagePath="/resources"
			pageStructure={resourcesIndexPageStructure}
		/>
	);
}
