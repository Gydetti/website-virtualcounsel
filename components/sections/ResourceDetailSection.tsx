import type {
	resourceContentBlockSchema,
	resourceSchema,
} from "@/lib/schemas/contentBlocks.schema";
import type { z } from "zod";

// Updated paths for the new block components
import ContentBlockRenderer from "@/components/content-blocks/ContentBlockRenderer";
import Image from "next/image";

interface ResourceDetailSectionProps {
	resource: z.infer<typeof resourceSchema>;
}

export default function ResourceDetailSection({
	resource,
}: ResourceDetailSectionProps) {
	return (
		<>
			{/* Hero Section (part of ResourceDetailSection) */}
			<section className="resource-hero py-16 bg-white">
				<div className="container mx-auto px-4 text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						{resource.title}
					</h1>
					{resource.subtitle && (
						<p className="text-lg text-gray-600 mb-6">{resource.subtitle}</p>
					)}
					{resource.heroImage && (
						<div className="mx-auto w-full max-w-4xl">
							<Image
								src={resource.heroImage.src}
								alt={resource.heroImage.alt}
								width={resource.heroImage.width || 1200}
								height={resource.heroImage.height || 600}
								className="rounded-lg shadow-md"
								priority
							/>
						</div>
					)}
				</div>
			</section>

			{/* Dynamic Content Blocks from resource.sections */}
			{resource.sections.map(
				(block, i) => (
					<ContentBlockRenderer key={`${block.type}-${i}`} block={block} />
				),
			)}
		</>
	);
}
