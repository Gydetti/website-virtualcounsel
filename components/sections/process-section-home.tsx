"use client";

import { Section } from "@/components/layout/Section";
import type { ProcessSectionProps } from "@/components/sections/process-section";
import { Badge } from "@/components/ui/badge";
import LazySection from "@/components/ui/lazy-section";

export default function ProcessSectionHome({
	badgeText,
	heading,
	subtitle,
	steps,
}: ProcessSectionProps) {
	if (!steps || steps.length === 0) return null;

	return (
		<Section
			id="process"
			fullBleed={false}
			className="bg-slate-50 px-4 py-20 md:px-6 md:py-28"
		>
			<div className="mx-auto max-w-6xl text-center">
				<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
					{badgeText}
				</Badge>
				{heading && (
					<h2 className="mt-4 text-[var(--font-heading-size)] font-bold tracking-tight text-slate-900 md:text-[var(--font-heading-size-md)]">
						{heading}
					</h2>
				)}
				{subtitle && (
					<p className="mt-6 text-lg leading-relaxed text-slate-600">
						{subtitle}
					</p>
				)}
			</div>

			<div className="mt-16 grid gap-8 md:grid-cols-4 md:gap-12">
				{steps.map((step, i) => (
					<div key={step.id} className="relative">
						<LazySection
							animation="fade-up"
							delay={i * 0.1}
							className="relative z-10"
						>
							<div className="flex h-full flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all hover:shadow-md card-equal-height">
								<div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white text-lg font-semibold">
									{step.number ?? String(i + 1).padStart(2, "0")}
								</div>
								<h3 className="text-xl font-semibold text-slate-900">
									{step.title}
								</h3>
								<p className="text-slate-600 leading-relaxed">
									{step.description}
								</p>
							</div>
						</LazySection>
						{i < steps.length - 1 && (
							<div className="absolute left-1/2 top-1/2 hidden h-1 w-full -translate-y-1/2 bg-slate-200 md:block" />
						)}
					</div>
				))}
			</div>
		</Section>
	);
}
