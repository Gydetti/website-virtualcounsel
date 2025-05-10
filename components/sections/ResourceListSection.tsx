import type { resourceSchema } from "@/lib/schemas/contentBlocks.schema";
import Image from "next/image";
import Link from "next/link";
import type { z } from "zod";

interface ResourceListSectionProps {
	id: string;
	title?: string;
	resources: Array<z.infer<typeof resourceSchema>>;
}

export default function ResourceListSection({
	id,
	title = "Our Resources",
	resources,
}: ResourceListSectionProps) {
	if (!resources || resources.length === 0) {
		return (
			<section id={id} className="py-12">
				<div className="container mx-auto px-4 text-center">
					<p>No resources available at the moment. Please check back later.</p>
				</div>
			</section>
		);
	}

	return (
		<section id={id} className="py-12 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{resources.map((resource) => (
						<Link
							href={`/resources/${resource.slug}`}
							key={resource.slug}
							className="block group bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
						>
							{resource.heroImage && (
								<div className="relative h-48 w-full mb-4 rounded overflow-hidden">
									<Image
										src={resource.heroImage.src}
										alt={resource.heroImage.alt}
										fill
										style={{ objectFit: "cover" }}
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									/>
								</div>
							)}
							<h3 className="text-xl font-semibold mb-2 text-blue-700 group-hover:text-blue-800">
								{resource.title}
							</h3>
							{resource.subtitle && (
								<p className="text-gray-600 text-sm line-clamp-3">
									{resource.subtitle}
								</p>
							)}
							<span className="mt-4 inline-block text-blue-600 group-hover:underline">
								Read more &rarr;
							</span>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
