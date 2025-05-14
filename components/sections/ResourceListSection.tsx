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
		<section
			id={id}
			className="relative overflow-hidden bg-gradient-to-r from-blue-100 via-transparent to-transparent py-12 z-10"
		>
			<div className="container mx-auto px-4">
				<h2 className="text-[var(--font-subheading-size)] font-bold text-center mb-10">
					{title}
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{resources.map((resource) => (
						<article
							key={resource.slug}
							className="group relative flex flex-col overflow-hidden rounded-lg border border-[#e5e7eb80] bg-gradient-to-b from-white to-blue-50/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
						>
							<Link
								href={`/resources/${resource.slug}`}
								className="block h-full"
							>
								<div className="relative h-48 w-full overflow-hidden sm:h-56">
									{resource.heroImage && (
										<Image
											src={resource.heroImage.src}
											alt={resource.heroImage.alt}
											fill
											style={{ objectFit: "cover" }}
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										/>
									)}
								</div>
								<div className="p-6">
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
								</div>
							</Link>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
