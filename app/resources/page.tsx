import { getResources } from "@/lib/data/resources";
import type { Resource } from "@/lib/data/resources";
import Link from "next/link";

export default async function ResourcesPage() {
	const resources: Resource[] = await getResources();
	return (
		<section className="resources-list py-8">
			<div className="container mx-auto">
				<h1>Resources</h1>
				<ul className="list-disc list-inside mt-4">
					{resources.map((r) => (
						<li key={r.slug}>
							<Link href={`/resources/${r.slug}`}>{r.title}</Link>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
