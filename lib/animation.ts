import type { Variants } from "framer-motion";

// Fade-up variant: bottom-up reveal with stagger
export const fadeUpVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, delay: i * 0.1, ease: "easeOut" },
	}),
};

// Slide-left variant: right-to-left reveal
export const slideLeftVariants: Variants = {
	hidden: { opacity: 0, x: 20 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Slide-right variant: left-to-right reveal
export const slideRightVariants: Variants = {
	hidden: { opacity: 0, x: -20 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
