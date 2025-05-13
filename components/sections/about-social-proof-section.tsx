import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import LazySection from "@/components/ui/lazy-section";
import OptimizedImage from "@/components/ui/optimized-image";
import type { aboutSocialProofSectionDataSchema } from "@/lib/schemas/sections.schema";
import { Star } from "lucide-react";
import type { z } from "zod";

export type AboutSocialProofSectionProps = z.infer<
	typeof aboutSocialProofSectionDataSchema
>;

export default function AboutSocialProofSection({
	badgeText,
	heading,
	socialProof,
}: AboutSocialProofSectionProps) {
	return (
		<Section id="about-social-proof" className="py-12 bg-gray-50">
			<LazySection
				animation="slide-up"
				delay={0}
				className="max-w-4xl mx-auto text-center"
			>
				{badgeText && (
					<Badge className="mb-4 bg-primary text-primary-foreground">
						{badgeText}
					</Badge>
				)}
				{heading && <h3 className="section-title mb-6">{heading}</h3>}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
					{socialProof.map((item) => (
						<div
							key={item.id}
							className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
						>
							{item.image?.src && (
								<div className="mb-4 flex justify-center">
									<OptimizedImage
										src={item.image.src}
										alt={item.image.alt || item.name}
										width={60}
										height={60}
										className="rounded-full"
									/>
								</div>
							)}
							<p className="italic text-gray-600 mb-4">"{item.quote}"</p>
							<div className="font-semibold text-gray-900">{item.name}</div>
							{item.title && (
								<div className="text-gray-500 text-sm">{item.title}</div>
							)}
						</div>
					))}
				</div>
			</LazySection>
		</Section>
	);
}
