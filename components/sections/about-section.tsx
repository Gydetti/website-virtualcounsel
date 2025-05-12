"use client";

import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LazySection from "@/components/ui/lazy-section";
import OptimizedImage from "@/components/ui/optimized-image";
import type { aboutSectionDataSchema } from "@/lib/schemas/sections.schema";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { z } from "zod";

// Updated props type alias using Zod schema
export type AboutSectionProps = z.infer<typeof aboutSectionDataSchema>;

export default function AboutSection({
	badgeText,
	heading,
	paragraphs,
	image,
	stats,
	cta,
}: AboutSectionProps) {
	return (
		<Section
			id="about"
			className="relative overflow-hidden bg-gradient-to-r from-blue-100 via-transparent to-transparent z-10"
		>
			<div className="grid md:grid-cols-2 gap-12 items-center">
				<LazySection animation="slide-up" delay={0} className="relative">
					{image?.src && (
						<>
							<div className="absolute -top-6 -left-6 w-24 h-24 bg-[rgba(var(--primary-rgb),0.1)] rounded-full z-0" />
							<div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[rgba(var(--primary-rgb),0.2)] rounded-full z-0" />
							<OptimizedImage
								src={image.src}
								alt={image.alt || "About our company"}
								fill
								className="relative aspect-[3/2] w-full max-w-xl mx-auto rounded-xl shadow-2xl z-10"
								objectFit="cover"
								priority
							/>
						</>
					)}
				</LazySection>

				<LazySection animation="slide-up" delay={0.1}>
					{badgeText && (
						<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
							{badgeText}
						</Badge>
					)}
					{heading && <h2 className="section-title">{heading}</h2>}
					{paragraphs?.map((p) => (
						<p key={p.slice(0, 16)} className="text-gray-700 mb-6 last:mb-8">
							{p}
						</p>
					))}

					{stats && stats.length > 0 && (
						<div className="grid grid-cols-2 gap-4 mb-8">
							{stats.map((stat) => (
								<div
									key={stat.id}
									className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
								>
									<div className="font-bold text-primary text-xl">
										{stat.value}
									</div>
									<div className="text-gray-600">{stat.label}</div>
								</div>
							))}
						</div>
					)}

					{cta?.href && cta?.text && (
						<Button
							size="lg"
							className="bg-primary hover:bg-primary/90 group"
							asChild
						>
							<Link href={cta.href}>
								{cta.text}
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</Button>
					)}
				</LazySection>
			</div>
		</Section>
	);
}
