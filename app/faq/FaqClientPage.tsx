"use client";

import { useState } from "react";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import StructuredData from "@/components/seo/structured-data";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LazySection from "@/components/ui/lazy-section";

export default function FaqClientPage() {
	const [searchQuery, setSearchQuery] = useState("");

	// This would typically come from a CMS or API
	const faqCategories = [
		{
			category: "General Questions",
			questions: [
				{
					question:
						"Sample question placeholder: common user question (e.g. 'How do I get started?')",
					answer: "Brief answer placeholder: concise response to the question",
				},
				{
					question:
						"Sample question placeholder: common user question (e.g. 'What services do you offer?')",
					answer: "Brief answer placeholder: concise response to the question",
				},
				{
					question:
						"Sample question placeholder: common user question (e.g. 'How can I contact support?')",
					answer: "Brief answer placeholder: concise response to the question",
				},
			],
		},
		{
			category: "Services",
			questions: [
				{
					question:
						"Sample question placeholder: service-related question (e.g. 'What is your pricing model?')",
					answer: "Brief answer placeholder: concise response to the question",
				},
				{
					question:
						"Sample question placeholder: service-related question (e.g. 'How long does implementation take?')",
					answer: "Brief answer placeholder: concise response to the question",
				},
				{
					question:
						"Sample question placeholder: service-related question (e.g. 'Do you offer custom solutions?')",
					answer: "Brief answer placeholder: concise response to the question",
				},
				{
					question:
						"Sample question placeholder: service-related question (e.g. 'How do I request a quote?')",
					answer: "Brief answer placeholder: concise response to the question",
				},
			],
		},
		{
			category: "Pricing & Billing",
			questions: [
				{
					question:
						"Sample question placeholder: billing question (e.g. 'What payment methods do you accept?')",
					answer: "Brief answer placeholder: concise response to the question",
				},
				{
					question:
						"Sample question placeholder: billing question (e.g. 'Do you offer refunds?')",
					answer: "Brief answer placeholder: concise response to the question",
				},
				{
					question:
						"Sample question placeholder: billing question (e.g. 'Can I change my plan later?')",
					answer: "Brief answer placeholder: concise response to the question",
				},
			],
		},
	];

	// Prepare FAQ structured-data for SEO
	const faqSchemaData = faqCategories
		.flatMap((category) => category.questions)
		.map(({ question, answer }) => ({ question, answer }));

	// Filter questions based on search query
	const filteredFaqs = searchQuery
		? faqCategories
				.map((category) => ({
					...category,
					questions: category.questions.filter(
						(q) =>
							q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
							q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
					),
				}))
				.filter((category) => category.questions.length > 0)
		: faqCategories;

	return (
		<>
			<StructuredData type="faq" data={{ items: faqSchemaData }} />
			<LazySection>
				<section className="relative overflow-hidden bg-gradient-to-r from-blue-100 via-transparent to-transparent py-16 md:py-24 z-10">
					<div className="container-wide">
						<div className="text-center max-w-3xl mx-auto">
							<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
								Short label introducing FAQ section
							</Badge>
							<h1>Section title inviting users to find answers</h1>
							<p className="text-gray-700 mb-8">
								Brief subtitle explaining purpose of this FAQ page
							</p>

							<div className="relative max-w-xl mx-auto">
								<Input
									autoComplete="off"
									type="text"
									placeholder="Search for answers..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent pl-10"
								/>
								<svg
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</div>
						</div>
					</div>
				</section>
			</LazySection>

			<LazySection>
				<section className="py-16">
					<div className="container-wide">
						{filteredFaqs.length > 0 ? (
							filteredFaqs.map((category, idx) => (
								<LazySection key={category.category} delay={idx * 0.1}>
									<div className="mb-12">
										<h2 className="text-[1.625rem] md:text-[2rem] font-semibold mb-6">
											{category.category}
										</h2>
										<Accordion type="single" collapsible className="space-y-4">
											{category.questions.map((faq) => (
												<AccordionItem
													key={faq.question}
													value={`${/* replaced index-based value */ ""}`}
													className="border border-gray-200 rounded-lg overflow-hidden"
												>
													<AccordionTrigger className="px-6 py-4 text-body-base font-medium hover:bg-gray-50 text-left">
														{faq.question}
													</AccordionTrigger>
													<AccordionContent className="px-6 py-4 text-body-base bg-gray-50 text-gray-700">
														{faq.answer}
													</AccordionContent>
												</AccordionItem>
											))}
										</Accordion>
									</div>
								</LazySection>
							))
						) : (
							<div className="text-center py-12">
								<h2 className="text-2xl font-bold mb-4">No results found</h2>
								<p className="text-gray-600 mb-8">
									We couldn't find any FAQs matching your search. Please try a
									different search term or browse our categories.
								</p>
								<Button
									variant="outline"
									className="border-primary text-primary hover:bg-primary hover:text-white"
									onClick={() => setSearchQuery("")}
								>
									Clear Search
								</Button>
							</div>
						)}
					</div>
				</section>
			</LazySection>

			<LazySection>
				<section className="py-16 bg-gray-50">
					<div className="container-wide text-center">
						<h2 className="text-3xl font-bold mb-6">
							Section heading for further assistance
						</h2>
						<p className="text-xl mb-8 max-w-2xl mx-auto">
							Brief prompt directing visitors to contact if they need more help
						</p>
						<Button
							size="lg"
							className="bg-primary hover:bg-primary-90"
							asChild
						>
							<Link href="/contact">
								Contact Us
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>
				</section>
			</LazySection>
		</>
	);
}
