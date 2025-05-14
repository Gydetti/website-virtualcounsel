"use client";
import type { ReactNode } from "react";

import { siteConfig } from "@/lib/siteConfig";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface LazySectionProps {
	children: ReactNode;
	/** Intersection threshold (fraction in view) to start animation */
	threshold?: number;
	className?: string;
	/** Animation style: fade only, slide with fade, zoom, or none */
	animation?:
		| "fade"
		| "fade-up"
		| "slide-up"
		| "slide-down"
		| "slide-left"
		| "slide-right"
		| "zoom"
		| "none";
	delay?: number;
	/** Animation duration in seconds */
	duration?: number;
	fullHeight?: boolean;
}

export default function LazySection({
	children,
	// Start as soon as any part of element is in view
	threshold = 0,
	className = "",
	animation = "slide-up",
	delay = 0,
	// Global default duration shortened for snappier feel (reduced from 0.6)
	duration = 0.4,
	fullHeight,
}: LazySectionProps) {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	// Respect users' reduced-motion preference
	const shouldReduceMotion = useReducedMotion();

	// Compute overflow class for slide animations
	const overflowClass =
		animation === "slide-left" || animation === "slide-right"
			? "overflow-x-hidden"
			: "";

	// Determine whether to fill height: slide-up/down by default, override if prop provided
	const defaultFullHeight =
		animation === "slide-up" || animation === "slide-down";
	const useFullHeight =
		fullHeight !== undefined ? fullHeight : defaultFullHeight;

	// Wrapper controls overflow and optionally full height to align grid items
	const wrapperClass = [overflowClass, useFullHeight ? "h-full" : ""]
		.filter(Boolean)
		.join(" ");
	// Inner content can also fill wrapper for consistent sizing when fullHeight
	const innerClass = [className, useFullHeight ? "h-full" : ""]
		.filter(Boolean)
		.join(" ");
	// Combined classes for no-animation mode (overflow + styling + optional full height)
	const combinedClass = [
		overflowClass,
		className,
		useFullHeight ? "h-full" : "",
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
			// For slide-up and fade-up, move up from below with different offsets
			y: animation === "slide-up"
				? 50
				: animation === "fade-up"
				? 20
				: animation === "slide-down"
				? -50
				: 0,
			x:
				animation === "slide-left"
					? 50
					: animation === "slide-right"
					? -50
					: 0,
			scale: animation === "zoom" ? 0.95 : 1,
		},
		visible: {
			opacity: 1,
			y: 0,
			x: 0,
			scale: 1,
			transition: {
				duration: duration,
				delay: delay,
				ease: "easeOut",
			},
		},
	};

	// If reduced-motion is requested, animations globally disabled, or set to none, render children without motion
	if (
		shouldReduceMotion ||
		!siteConfig.features.enableStaggeredAnimations ||
		animation === "none"
	) {
		return (
			<div ref={ref} className={combinedClass}>
				{children}
			</div>
		);
	}

	return (
		<div ref={ref} className={wrapperClass}>
			<motion.div
				className={innerClass}
				initial="hidden"
				animate={isVisible ? "visible" : "hidden"}
				variants={variants}
			>
				{children}
			</motion.div>
		</div>
	);
}
