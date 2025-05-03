"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export interface FaqItem {
	question: string;
	answer: string;
}

interface FaqAccordionProps {
	items: FaqItem[];
	defaultOpen?: string;
}

export default function FaqAccordion({
	items,
	defaultOpen,
}: FaqAccordionProps) {
	const [searchQuery, setSearchQuery] = useState("");

	// Filter questions based on search query
	const filteredItems = searchQuery
		? items.filter(
				(item) =>
					item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
					item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
			)
		: items;

	return (
		<div className="w-full">
			<AnimatePresence>
				{filteredItems.length > 0 ? (
					<Accordion
						type="single"
						collapsible
						defaultValue={defaultOpen}
						className="space-y-4"
					>
						{filteredItems.map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.2, delay: index * 0.05 }}
							>
								<AccordionItem
									value={`item-${index}`}
									className="border border-gray-200 rounded-lg overflow-hidden"
								>
									<AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left font-medium">
										{item.question}
									</AccordionTrigger>
									<AccordionContent className="px-6 py-4 bg-gray-50 text-gray-700">
										{item.answer}
									</AccordionContent>
								</AccordionItem>
							</motion.div>
						))}
					</Accordion>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="text-center py-12"
					>
						<h3 className="text-xl font-bold mb-2">No results found</h3>
						<p className="text-gray-600">
							We couldn't find any FAQs matching your search. Please try a
							different search term.
						</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
