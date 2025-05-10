"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

import { Section } from "@/components/layout/Section";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/ui/optimized-image";
import type { heroSectionDataSchema } from "@/lib/schemas/sections.schema";
import { siteConfig } from "@/lib/siteConfig";
import type { z } from "zod";

export type HeroSectionProps = z.infer<typeof heroSectionDataSchema>;

export default function HeroSection({
	badgeText,
	headline,
	subheadline,
	primaryCta,
	secondaryCta,
	showSecondaryCta = true,
	typingWords,
	stats,
	image,
	showHelpedStats = true,
	showOverlayStat = false,
	overlayTitle,
	overlayValue,
}: HeroSectionProps) {
	// Reference to the typing element
	const typingRef = useRef<HTMLSpanElement>(null);

	// State for the current text being displayed
	const [displayText, setDisplayText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [loopNum, setLoopNum] = useState(0);
	const [typingSpeed, setTypingSpeed] = useState(150);

	// Hero image source state with fallback
	const [currentImageSrc, setCurrentImageSrc] = useState(image?.src);
	useEffect(() => {
		setCurrentImageSrc(image?.src);
	}, [image?.src]);

	useEffect(() => {
		if (!typingWords || typingWords.length === 0) return;

		const handleTyping = () => {
			const current = loopNum % typingWords.length;
			const fullText = typingWords[current];

			setDisplayText(
				isDeleting
					? fullText.substring(0, displayText.length - 1)
					: fullText.substring(0, displayText.length + 1),
			);

			if (isDeleting) {
				setTypingSpeed(50);
			} else {
				setTypingSpeed(100);
			}

			if (!isDeleting && displayText === fullText) {
				setTimeout(() => setIsDeleting(true), 1500);
			} else if (isDeleting && displayText === "") {
				setIsDeleting(false);
				setLoopNum(loopNum + 1);
				setTypingSpeed(500);
			}
		};

		const timer = setTimeout(handleTyping, typingSpeed);
		return () => clearTimeout(timer);
	}, [displayText, isDeleting, loopNum, typingSpeed, typingWords]);

	const defaultImageSrc = "/images/placeholders/placeholder.svg";
	const imageToDisplay = currentImageSrc || defaultImageSrc;
	const imageAltText = image?.alt || "Hero image";

	return (
		<section
			id="hero-section"
			aria-labelledby="hero-section-heading"
			className="relative overflow-hidden bg-gradient-to-r from-blue-100 to-white"
		>
			{/* Background pattern */}
			<div className="absolute inset-0 bg-grid-pattern opacity-10" />

			{/* Floating elements for visual interest */}
			<div className="hidden sm:block absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
			<div className="hidden sm:block absolute bottom-10 left-10 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl" />

			<Section
				fullBleed={false}
				className="relative z-10 pb-16 sm:py-12 md:py-16"
			>
				<div className="grid md:grid-cols-2 gap-4 sm:gap-8 md:gap-12 lg:gap-16 items-center">
					<motion.div
						className="flex flex-col justify-center space-y-6 z-10"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4 }}
					>
						{badgeText && (
							<Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/20">
								{badgeText}
							</Badge>
						)}

						<h1
							id="hero-section-heading"
							className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance"
						>
							{headline && <span className="block">{headline}</span>}
							{typingWords && typingWords.length > 0 && (
								<span className="block mt-2 md:mt-4 lg:mt-6 text-primary">
									<span className="inline-block min-h-[1.2em]" ref={typingRef}>
										{displayText}
										<span className="typing-cursor" />
									</span>
								</span>
							)}
						</h1>

						{subheadline && (
							<p className="text-gray-700 max-w-lg">{subheadline}</p>
						)}

						{(primaryCta?.text || secondaryCta?.text) && (
							<div className="flex flex-col sm:flex-row gap-4 pt-4">
								{primaryCta?.text && primaryCta.href && (
									<Button
										size="lg"
										className={`bg-primary hover:bg-primary/90 group ${!showSecondaryCta || !secondaryCta?.text ? "w-full sm:w-auto" : ""}`}
										asChild
									>
										<Link href={primaryCta.href}>
											{primaryCta.text}
											<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
										</Link>
									</Button>
								)}

								{showSecondaryCta &&
									secondaryCta?.text &&
									secondaryCta.href && (
										<Button
											size="lg"
											variant="ghost"
											className="bg-transparent text-primary hover:text-primary/80 hover:bg-transparent"
											asChild
										>
											<Link href={secondaryCta.href}>{secondaryCta.text}</Link>
										</Button>
									)}
							</div>
						)}

						{showHelpedStats && (
							<div className="flex items-center space-x-4 mt-6 text-sm">
								<div className="flex -space-x-2">
									{[1, 2, 3, 4].map((i) => (
										<div
											key={i}
											className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden bg-gray-200"
										>
											<Image
												src="/placeholder.svg?height=32&width=32"
												alt="User avatar"
												width={32}
												height={32}
												className="h-full w-full object-cover"
											/>
										</div>
									))}
								</div>
								<div className="text-gray-700">
									<span className="font-medium">100+</span> statistic that helps
									build authority
								</div>
							</div>
						)}
					</motion.div>

					<motion.div
						className="relative w-full max-w-[600px] ml-auto transform md:translate-y-6"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<AspectRatio
							ratio={6 / 5}
							className="overflow-visible rounded-xl shadow-2xl relative"
						>
							<OptimizedImage
								src={imageToDisplay}
								alt={imageAltText}
								fill
								sizes="(max-width: 600px) 100vw, 600px"
								className="absolute inset-0 object-cover rounded-xl"
								priority
								onError={() => setCurrentImageSrc(defaultImageSrc)}
							/>
							<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-xl">
								<p className="text-white font-medium"> </p>
							</div>
							{showOverlayStat && overlayTitle && overlayValue && (
								<div
									className="hidden md:block absolute -bottom-6 -left-6 h-24 w-2/3 rounded-xl p-4 shadow-lg z-10"
									style={{ backgroundColor: siteConfig.theme.colors.accent }}
								>
									<div className="flex items-center space-x-4">
										<div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
											<svg
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												style={{ color: siteConfig.theme.colors.accent }}
											>
												<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
											</svg>
										</div>
										<div className="text-white">
											<p className="text-sm font-medium m-0">{overlayTitle}</p>
											<p className="text-xl font-bold m-0">{overlayValue}</p>
										</div>
									</div>
								</div>
							)}
						</AspectRatio>
					</motion.div>
				</div>

				<div className="mt-16 bg-white rounded-xl shadow-lg p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
					{stats &&
						stats.length > 0 &&
						stats.map((stat) => (
							<div
								key={stat.label}
								className="flex flex-col items-center text-center"
							>
								<div className="text-primary font-bold text-3xl md:text-4xl mb-2">
									<CountUp
										end={stat.value}
										suffix={stat.suffix}
										duration={2.5}
										enableScrollSpy
										scrollSpyDelay={500}
									/>
								</div>
								<p className="text-gray-600 text-sm md:text-base m-0">
									{stat.label}
								</p>
							</div>
						))}
				</div>
			</Section>

			{/* soft left-only bottom shadow (20% width gradient) */}
			<div
				aria-hidden="true"
				className="absolute bottom-0 left-0 w-1/5 h-1 bg-gradient-to-r from-black/10 to-transparent pointer-events-none"
			/>
		</section>
	);
}
