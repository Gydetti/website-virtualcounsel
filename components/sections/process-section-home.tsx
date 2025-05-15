"use client";

import { Section } from "@/components/layout/Section";
import type { ProcessSectionProps } from "@/components/sections/process-section";
import { Badge } from "@/components/ui/badge";
import LazySection from "@/components/ui/lazy-section";
import type { CSSProperties } from "react";

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
			className=" px-4 py-20 md:px-6 md:py-28"
		>
			<LazySection
				animation="none"
				className="stagger-container mx-auto max-w-6xl text-center"
				style={{ '--stagger-delay': '0.1s' } as CSSProperties}
			>
				<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200" style={{ '--index': 0 } as CSSProperties}>
					{badgeText}
				</Badge>
				{heading && (
					<h2
						className="mt-4 text-[var(--font-heading-size)] font-bold tracking-tight text-slate-900 md:text-[var(--font-heading-size-md)]"
						style={{ '--index': 1 } as CSSProperties}
					>
						{heading}
					</h2>
				)}
				{subtitle && (
					<p className="mt-6 text-lg leading-relaxed text-slate-600" style={{ '--index': 2 } as CSSProperties}>
						{subtitle}
					</p>
				)}
			</LazySection>

			<LazySection
				animation="none"
				className="stagger-container mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 items-stretch"
				style={{ '--stagger-delay': '0.2s' } as CSSProperties}
			>
				{steps.map((step, i) => (
					<div key={step.id} className="relative" style={{ '--index': i } as CSSProperties}>
						<div className="relative z-10 h-full flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all hover:shadow-md card-equal-height">
							<div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white text-lg font-semibold mb-4">
								{step.number ?? String(i + 1).padStart(2, "00")}
							</div>
							<div className="card-content flex flex-col items-center gap-4">
								<h3 className="text-xl font-semibold text-slate-900">
									{step.title}
								</h3>
								<p className="text-slate-600 leading-relaxed">
									{step.description}
								</p>
							</div>
						</div>
						{i < steps.length - 1 && (
							<div className="absolute left-1/2 top-1/2 hidden h-1 w-full -translate-y-1/2 bg-slate-200 md:block" />
						)}
					</div>
				))}
			</LazySection>
		</Section>
	);
}
