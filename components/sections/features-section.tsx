"use client";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LazySection from "@/components/ui/lazy-section";
import OptimizedImage from "@/components/ui/optimized-image";
import type { featuresSectionDataSchema } from "@/lib/schemas/sections.schema";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import type { z } from "zod";

// Updated props type alias using Zod schema
export type FeaturesSectionProps = z.infer<typeof featuresSectionDataSchema>;

export default function FeaturesSection({
	badgeText,
	heading,
	description,
	comparison,
	cta, // cta is in schema, but rendering is commented out in component
}: FeaturesSectionProps) {
	const withoutTitle = comparison?.without?.title;
	const withoutItems = comparison?.without?.items;
	const withTitle = comparison?.with?.title;
	const withItems = comparison?.with?.items;

	return (
		<Section
			id="features-section"
			aria-labelledby="features-section-heading"
			className="text-gray-800 relative overflow-hidden"
		>
			{/* Ensure decorative elements overlap edges */}
			{/* <div className="absolute top-0 right-0 w-96 h-96 bg-primary-5 rounded-full -translate-y-1/4 translate-x-1/4 blur-3xl z-0" /> */}

			<div className="relative z-10">
				<div className="max-w-3xl mx-auto text-center mb-12">
					{badgeText && (
						<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
							{badgeText}
						</Badge>
					)}
					{heading && (
						<h2
							id="features-section-heading"
							className="section-title text-gray-900"
						>
							{heading}
						</h2>
					)}
					{description && <p className="text-gray-700">{description}</p>}
				</div>

				<div className="relative grid md:grid-cols-2 gap-8 md:gap-0 mb-0">
					{comparison?.without?.items &&
						comparison.without.items.length > 0 && (
							<LazySection
								animation="slide-left"
								delay={0}
								className="md:w-4/5 md:mx-auto rounded-lg border border-red-200 bg-red-50/50 backdrop-blur p-6 hover:bg-red-100/50 transition-colors text-gray-800"
							>
								{withoutTitle && (
									<h3 className="text-red-400 mb-4">{withoutTitle}</h3>
								)}
								<ul className="space-y-3">
									{withoutItems?.map((item) => (
										<li key={item} className="flex items-start">
											<XCircle className="text-red-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
											<span className="text-gray-700">{item}</span>
										</li>
									))}
								</ul>
							</LazySection>
						)}

					{comparison?.with?.items && comparison.with.items.length > 0 && (
						<LazySection
							animation="slide-right"
							delay={0}
							className="md:w-4/5 md:mx-auto rounded-lg border border-green-200 bg-green-50/50 backdrop-blur p-6 hover:bg-green-100/50 transition-colors text-gray-800"
						>
							{withTitle && (
								<h3 className="text-green-400 mb-4">{withTitle}</h3>
							)}
							<ul className="space-y-3">
								{withItems?.map((item) => (
									<li key={item} className="flex items-start">
										<CheckCircle className="text-green-400 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
										<span className="text-gray-700">{item}</span>
									</li>
								))}
							</ul>
						</LazySection>
					)}

					{/* Decorative arrow image between cards on desktop */}
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
					>
						<OptimizedImage
							src="/images/general/1 bend arrow right.svg"
							alt="Arrow indicating transition"
							width={64}
							height={64}
							objectFit="contain"
							className="opacity-90"
						/>
					</motion.div>
				</div>

				<div className="text-center">
					{cta?.href && cta?.text && (
						<Button size="lg" className="group" asChild>
							<Link href={cta.href}>
								{cta.text}
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</Button>
					)}
				</div>
			</div>
		</Section>
	);
}
