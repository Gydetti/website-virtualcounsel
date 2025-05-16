"use client";

import { Section } from "@/components/layout/Section";
import StructuredData from "@/components/seo/structured-data";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LazySection from "@/components/ui/lazy-section";
import type { ctaSchema } from "@/lib/schemas/common.schema";
import { siteConfig } from "@/lib/siteConfig";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useLayoutEffect, useRef } from "react";
import type { z } from "zod";

export interface FaqItem {
	question: string;
	answer: string;
}

export interface FaqCategory {
	category: string;
	questions: FaqItem[];
}

export interface HomepageFaqSectionProps {
	badgeText?: string;
	heading?: string;
	description?: string;
	categories: FaqCategory[];
	cta?: z.infer<typeof ctaSchema>;
}

export default function HomepageFaqSection({
	badgeText = "Frequently asked questions",
	heading = "Invite users to explore common questions",
	description,
	categories,
	cta = { text: "See all FAQs", href: "/contact" },
}: HomepageFaqSectionProps) {
	// Prepare JSON-LD items for structured-data
	const faqSchema = categories.flatMap((cat) =>
		cat.questions.map((q) => ({ question: q.question, answer: q.answer })),
	);

	// Calculate max collapsed height and apply to all FAQ cards
	const containerRef = useRef<HTMLDivElement>(null);
	useLayoutEffect(() => {
		if (!containerRef.current) return;
		const items = Array.from(
			containerRef.current.querySelectorAll<HTMLDivElement>(".faq-item"),
		);
		if (items.length === 0) return;
		const heights = items.map((item) => item.getBoundingClientRect().height);
		const max = Math.max(...heights);
		for (const item of items) {
			item.style.minHeight = `${max}px`;
		}
	}, []);

	return (
		<>
			<StructuredData type="faq" data={{ items: faqSchema }} />
			<Section id="faq-homepage">
				<LazySection
					animation="none"
					className="stagger-container text-center"
					style={{ "--stagger-delay": "0.1s" } as CSSProperties}
				>
					<Badge
						className="mb-4"
						style={{ "--index": 0 } as React.CSSProperties}
					>
						{badgeText}
					</Badge>
					<h2
						className="section-title mb-12"
						style={{ "--index": 1 } as React.CSSProperties}
					>
						{heading}
					</h2>
					{description && (
						<p
							className="text-foreground mb-8 max-w-2xl mx-auto"
							style={{ "--index": 2 } as React.CSSProperties}
						>
							{description}
						</p>
					)}
					<div
						ref={containerRef}
						className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
					>
						{categories.map((cat, idx) => (
							<div
								key={cat.category}
								className="text-center"
								style={{ "--index": 3 + idx } as CSSProperties}
							>
								<h3 className="text-body-base mb-6">{cat.category}</h3>
								<Accordion
									type="single"
									collapsible
									style={
										{
											display: "grid",
											gap: "1rem",
										} as CSSProperties
									}
								>
									{cat.questions.map((q) => (
										<AccordionItem
											key={q.question}
											value={`faq-${cat.category}-${q.question}`}
											className="border rounded-lg overflow-hidden flex flex-col faq-item"
										>
											<AccordionTrigger className="flex items-center justify-between w-full px-4 py-1.5 text-body-base font-medium text-left">
												{q.question}
											</AccordionTrigger>
											<AccordionContent className="px-4 py-2 text-foreground">
												{q.answer}
											</AccordionContent>
										</AccordionItem>
									))}
								</Accordion>
							</div>
						))}
					</div>
					{siteConfig.features.enableHomepageFaqCta && (
						<div
							className="flex justify-center mt-12"
							style={{ "--index": 3 + categories.length } as CSSProperties}
						>
							<Button size="lg" asChild>
								<Link href={cta.href || "/contact"}>
									{cta.text || "See all FAQs"}
								</Link>
							</Button>
						</div>
					)}
				</LazySection>
			</Section>
		</>
	);
}
