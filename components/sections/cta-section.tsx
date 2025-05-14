import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LazySection from "@/components/ui/lazy-section";
import type { ctaSectionDataSchema } from "@/lib/schemas/sections.schema";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { z } from "zod";

// Updated props type alias using Zod schema
export type CtaSectionProps = z.infer<typeof ctaSectionDataSchema>;

export default function CtaSection({
	badgeText,
	heading,
	description,
	primaryCta,
	secondaryCta,
}: CtaSectionProps) {
	return (
		<Section
			id="cta-section"
			aria-labelledby="cta-section-heading"
			fullBleed
			className="bg-brand-dark text-white relative overflow-hidden py-8"
		>
			{/* Decorative elements matching the dark theme */}
			<div className="hidden sm:block absolute top-0 right-0 w-96 h-96 bg-primary-10 rounded-full blur-3xl" />
			<div className="hidden sm:block absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />

			<LazySection
				animation="slide-up"
				delay={0}
				className="relative z-10 text-center"
			>
				{badgeText && (
					<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
						{badgeText}
					</Badge>
				)}
				{heading && (
					<h2
						id="cta-section-heading"
						className="text-[var(--font-subheading-size)] text-white"
					>
						{heading}
					</h2>
				)}
				{description && (
					<p className="text-gray-300 max-w-xl mx-auto mb-8">{description}</p>
				)}

				{(primaryCta?.text || secondaryCta?.text) && (
					<div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-12">
						{primaryCta?.href && primaryCta?.text && (
							<Button
								size="lg"
								variant="white"
								className="group w-full sm:w-auto whitespace-normal"
								asChild
							>
								<Link href={primaryCta.href}>
									{primaryCta.text}
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
						)}
						{secondaryCta?.href && secondaryCta?.text && (
							<Button
								size="lg"
								variant="outline"
								className="bg-transparent border-gray-400 text-gray-200 hover:bg-white/10 hover:text-white group w-full sm:w-auto whitespace-normal"
								asChild
							>
								<Link href={secondaryCta.href}>
									{secondaryCta.text}
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
						)}
					</div>
				)}
			</LazySection>
		</Section>
	);
}
