"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = useCallback(() => {
		if (window.pageYOffset > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, [toggleVisibility]);

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.2 }}
					className="fixed bottom-6 right-6 z-50"
				>
					<Button
						size="icon"
						className="h-12 w-12 rounded-full bg-transparent hover:bg-transparent shadow-lg border border-primary"
						onClick={scrollToTop}
						aria-label="Scroll to top"
					>
						<ArrowUp className="h-6 w-6 text-primary" />
					</Button>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
