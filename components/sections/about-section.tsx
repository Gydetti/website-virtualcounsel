"use client";

import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LazySection from "@/components/ui/lazy-section";
import OptimizedImage from "@/components/ui/optimized-image";
import type { aboutSectionDataSchema } from "@/lib/schemas/sections.schema";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import Link from "next/link";
import type { z } from "zod";

// Updated props type alias using Zod schema
export type AboutSectionProps = z.infer<typeof aboutSectionDataSchema> & {
	variant?: "imageLeft" | "imageRight" | "centered";
	philosophy?: {
		title: string;
		text: string;
	};
	featureCards?: {
		id: string;
		title: string;
		description: string;
		icon: string;
		iconBg: string;
		iconColor: string;
	}[];
};

export default function AboutSection({
	variant = "imageLeft",
	badgeText,
	heading,
	paragraphs,
	image,
	stats,
	cta,
	philosophy,
	featureCards,
}: AboutSectionProps) {
	const containerClasses =
		variant === "centered"
			? "grid grid-cols-1 gap-12 items-center text-center"
			: "grid md:grid-cols-2 gap-12 items-center";
	const imageOrderClass = variant === "imageRight" ? "md:order-2" : "";
	const contentOrderClass = variant === "imageRight" ? "md:order-1" : "";

	return (
		<Section
			id="about"
			className="relative overflow-hidden bg-gradient-to-r from-blue-100 via-transparent to-transparent z-10"
		>
			<div className={containerClasses}>
				<LazySection
					animation="slide-up"
					delay={0}
					className={`relative ${imageOrderClass}`}
				>
					{image?.src && (
						<>
							{/* <div className="absolute -top-6 -left-6 w-24 h-24 bg-[rgba(var(--primary-rgb),0.1)] rounded-full z-0" />
							<div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[rgba(var(--primary-rgb),0.2)] rounded-full z-0" /> */}
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

				<LazySection
					animation="slide-up"
					delay={0.1}
					className={contentOrderClass}
				>
					{/* Content column: granular fade-up animations */}
					<div className={contentOrderClass}>
						{badgeText && (
							<LazySection animation="fade-up" delay={0.2}>
								<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
									{badgeText}
								</Badge>
							</LazySection>
						)}
						{heading && (
							<LazySection animation="fade-up" delay={0.3}>
								<h2 className="section-title">{heading}</h2>
							</LazySection>
						)}
						{paragraphs && paragraphs.length > 0 && (
							<LazySection animation="fade-up" delay={0.4}>
								{paragraphs.map((p) => (
									<p key={p.slice(0, 16)} className="text-gray-700 mb-6 last:mb-8">
										{p}
									</p>
								))}
							</LazySection>
						)}
						{stats && stats.length > 0 && (
							<LazySection animation="fade-up" delay={0.5}>
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
							</LazySection>
						)}
						{/* Philosophy Box */}
						{philosophy && (
							<LazySection animation="fade-up" delay={0.6} className="mt-8">
								<div className="rounded-xl border border-gray-200 bg-gray-50 p-8 shadow-sm">
									<h3 className="text-xl font-semibold text-gray-900">
										{philosophy.title}
									</h3>
									<p className="mt-2 text-gray-600 leading-relaxed">
										{philosophy.text}
									</p>
								</div>
							</LazySection>
						)}
						{/* Feature Cards */}
						{featureCards && featureCards.length > 0 && (
							<LazySection animation="fade-up" delay={0.7} className="mt-8">
								<div className="grid gap-4 sm:grid-cols-2">
									{featureCards.map((card) => {
										const Icon = card.icon === 'Star' ? Star : CheckCircle;
										return (
											<div
												key={card.id}
												className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
											>
												<div
													className={`flex h-12 w-12 items-center justify-center rounded-full ${card.iconBg}`}
												>
													<Icon className={`${card.iconColor} h-6 w-6`} />
												</div>
												<h3 className="mt-4 text-lg font-semibold text-gray-900">
													{card.title}
												</h3>
												<p className="mt-2 text-sm text-gray-600">
													{card.description}
												</p>
											</div>
										);
									})}
								</div>
							</LazySection>
						)}
						{cta?.href && cta?.text && (
							<LazySection animation="fade-up" delay={0.6}>
								<Button size="lg" className="bg-primary hover:bg-primary-90 group" asChild>
									<Link href={cta.href}>
										{cta.text}
										<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
							</LazySection>
						)}
					</div>
				</LazySection>
			</div>
		</Section>
	);
}
