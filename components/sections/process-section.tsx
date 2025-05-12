"use client";

import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import LazySection from "@/components/ui/lazy-section";
import type { processSectionDataSchema } from "@/lib/schemas/sections.schema";
import type { z } from "zod";

// Updated props type alias using Zod schema
export type ProcessSectionProps = z.infer<typeof processSectionDataSchema>;

export default function ProcessSection({
	badgeText,
	heading,
	subtitle,
	steps,
}: ProcessSectionProps) {
	if (!steps || steps.length === 0) {
		// Schema enforces min(1) for steps
		return null;
	}

	return (
		<Section id="process" className="relative overflow-hidden">
			<div className="absolute inset-0 bg-[url('/placeholder.svg?height=1000&width=1000')] bg-center opacity-5" />

			{/* Decorative elements */}
			{/* <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50/80 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl" />
			<div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl" /> */}

			<div className="max-w-4xl mx-auto relative z-10">
				<div className="text-center mb-16">
					{badgeText && (
						<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
							{badgeText}
						</Badge>
					)}
					{heading && <h2 className="section-title">{heading}</h2>}
					{subtitle && <p className="section-subtitle">{subtitle}</p>}
				</div>

				<div className="relative">
					{/* Timeline line */}
					<div className="absolute left-[40px] top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

					<div className="space-y-16">
						{steps.map((step, index) => (
							<LazySection
								key={step.id}
								animation="slide-up"
								delay={index * 0.1}
								className="flex flex-col md:flex-row gap-8"
							>
								<div className="flex-shrink-0 flex items-start justify-center relative z-10">
									<div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold shadow-md bg-primary text-white">
										{step.number || String(index + 1).padStart(2, "0")}
									</div>
								</div>
								<div className="flex-grow w-full bg-white p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
									<h3 className="mb-1">{step.title}</h3>
									{step.subtitle && (
										<p className="text-primary font-medium mb-3">
											{step.subtitle}
										</p>
									)}
									<p className="text-gray-600 mb-6">{step.description}</p>

									{step.details && step.details.length > 0 && (
										<div className="bg-gray-50 p-6 rounded-lg">
											<h4 className="mb-3">What this includes:</h4>
											<ul className="space-y-2">
												{step.details.map((detail) => (
													<li key={detail} className="flex items-start">
														<span className="text-primary mr-2">•</span>
														<span>{detail}</span>
													</li>
												))}
											</ul>
										</div>
									)}
								</div>
							</LazySection>
						))}
					</div>
				</div>
			</div>
		</Section>
	);
}
