import type { Resource } from "@/lib/data/resources";
/* eslint-disable react/no-array-index-key */
import Image from "next/image";
import FormSection from "./FormSection";
import ImageSection from "./ImageSection";
import TextSection from "./TextSection";

export default function ResourceContent({ resource }: { resource: Resource }) {
	return (
		<>
			{/* Hero Section */}
			<section className="resource-hero py-16 bg-white">
				<div className="container mx-auto px-4 text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						{resource.title}
					</h1>
					{resource.subtitle && (
						<p className="text-lg text-gray-600 mb-6">{resource.subtitle}</p>
					)}
					<div className="mx-auto w-full max-w-4xl">
						<Image
							src={resource.heroImage}
							alt={resource.title}
							width={1200}
							height={600}
							className="rounded-lg shadow-md"
						/>
					</div>
				</div>
			</section>

			{/* Dynamic Sections */}
			{resource.sections.map((section, i) => {
				switch (section.type) {
					case "text":
						return (
							<TextSection key={`${section.type}-${i}`} {...section.props} />
						);
					case "form":
						return (
							<FormSection key={`${section.type}-${i}`} {...section.props} />
						);
					case "image":
						return (
							<ImageSection key={`${section.type}-${i}`} {...section.props} />
						);
					default:
						return null;
				}
			})}
		</>
	);
}
