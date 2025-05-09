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
			<section className="resource-hero">
				<h1>{resource.title}</h1>
				{resource.subtitle && <p>{resource.subtitle}</p>}
				<Image
					src={resource.heroImage}
					alt={resource.title}
					width={1200}
					height={600}
				/>
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
