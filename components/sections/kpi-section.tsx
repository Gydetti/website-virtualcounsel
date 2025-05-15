"use client";

import { Section } from "@/components/layout/Section";
import LazySection from "@/components/ui/lazy-section";
import type {
	kpiSectionDataSchema,
	kpiStatItemSchema,
} from "@/lib/schemas/sections.schema";
import CountUp from "react-countup";
import type { z } from "zod";

export type KpiSectionProps = z.infer<typeof kpiSectionDataSchema>;

export default function KpiSection({ stats }: KpiSectionProps) {
	return (
		<Section fullBleed={false} className="mt-16">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
				{stats.map((stat) => (
					<LazySection key={stat.id} animation="fade-up">
						<div className="rounded-xl bg-white border border-gray-200 border-t-4 border-t-primary p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
							<div className="text-primary font-bold text-3xl md:text-4xl mb-2">
								<CountUp
									end={stat.value}
									suffix={stat.suffix || ""}
									duration={2.5}
									enableScrollSpy
									scrollSpyDelay={500}
								/>
							</div>
							<p className="text-gray-600 text-sm md:text-base m-0">
								{stat.label}
							</p>
						</div>
					</LazySection>
				))}
			</div>
		</Section>
	);
}
