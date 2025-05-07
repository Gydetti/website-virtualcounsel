"use client";
import type { ReactNode } from "react";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface LazySectionProps {
	children: ReactNode;
	threshold?: number;
	className?: string;
	animation?:
		| "fade"
		| "slide-up"
		| "slide-down"
		| "slide-left"
		| "slide-right"
		| "zoom"
		| "none";
	delay?: number;
}

export default function LazySection({
	children,
	threshold = 0.1,
	className = "",
	animation = "slide-up",
	delay = 0,
}: LazySectionProps) {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold },
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [threshold]);

	// Define animation variants
	const variants = {
		hidden: {
			opacity: 0,
			y: animation === "slide-up" ? 50 : animation === "slide-down" ? -50 : 0,
			x:
				animation === "slide-left" ? 50 : animation === "slide-right" ? -50 : 0,
			scale: animation === "zoom" ? 0.95 : 1,
		},
		visible: {
			opacity: 1,
			y: 0,
			x: 0,
			scale: 1,
			transition: {
				duration: 0.5,
				delay: delay,
				ease: "easeOut",
			},
		},
	};

	// If animation is none, just render children
	if (animation === "none") {
		return (
			<div ref={ref} className={className}>
				{children}
			</div>
		);
	}

	return (
		<div ref={ref} className={className}>
			<motion.div
				initial="hidden"
				animate={isVisible ? "visible" : "hidden"}
				variants={variants}
			>
				{children}
			</motion.div>
		</div>
	);
}
