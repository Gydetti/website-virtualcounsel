"use client";
import type { ReactNode } from "react";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

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

	// Add horizontal overflow hiding for horizontal slide animations
	const wrapperClass = [
		className,
		animation === "slide-left" || animation === "slide-right"
			? "overflow-x-hidden"
			: "",
	]
		.filter(Boolean)
		.join(" ");

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
				duration: 0.8,
				delay: delay,
				ease: "easeOut",
			},
		},
	};

	// If animations are globally disabled or set to none, just render children without motion
	if (!siteConfig.features.enableStaggeredAnimations || animation === "none") {
		return (
			<div ref={ref} className={wrapperClass}>
				{children}
			</div>
		);
	}

	return (
		<div ref={ref} className={wrapperClass}>
			<motion.div
				className={wrapperClass}
				initial="hidden"
				animate={isVisible ? "visible" : "hidden"}
				variants={variants}
			>
				{children}
			</motion.div>
		</div>
	);
}
