"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

export default function HeroSection() {
	// Reference to the typing element
	const typingRef = useRef<HTMLSpanElement>(null);

	// State for the current text being displayed
	const [displayText, setDisplayText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [loopNum, setLoopNum] = useState(0);
	const [typingSpeed, setTypingSpeed] = useState(150);

	// Words to cycle through
	const words = [
		"more visibility",
		"more clients",
		"more time",
		"more impact",
		"your business",
	];

	// Hero image source state with fallback
	const [heroSrc, setHeroSrc] = useState<string>("/placeholder-user.jpg");

	useEffect(() => {
		const handleTyping = () => {
			const current = loopNum % words.length;
			const fullText = words[current];

			setDisplayText(
				isDeleting
					? fullText.substring(0, displayText.length - 1)
					: fullText.substring(0, displayText.length + 1),
			);

			// Set typing speed based on state
			if (isDeleting) {
				setTypingSpeed(50); // Faster when deleting
			} else {
				setTypingSpeed(100); // Normal speed when typing
			}

			// If completed typing the word
			if (!isDeleting && displayText === fullText) {
				// Pause at the end of the word
				setTimeout(() => setIsDeleting(true), 1500);
			}
			// If deleted the word
			else if (isDeleting && displayText === "") {
				setIsDeleting(false);
				setLoopNum(loopNum + 1);
				// Small pause before typing the next word
				setTypingSpeed(500);
			}
		};

		const timer = setTimeout(handleTyping, typingSpeed);
		return () => clearTimeout(timer);
	}, [displayText, isDeleting, loopNum, typingSpeed]);

	return (
		<section className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-white pt-16 pb-12 md:pt-28 md:pb-20">
			{/* Background pattern */}
			<div className="absolute inset-0 bg-grid-pattern opacity-10" />

			{/* Floating elements for visual interest */}
			<div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
			<div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl" />

			<div className="container-wide relative z-10">
				<div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
					<motion.div
						className="flex flex-col justify-center space-y-6 z-10"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<Badge className="w-fit bg-blue-100 text-primary hover:bg-blue-200">
							Digital growth solutions
						</Badge>

						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
							Grow your business with
							<br />
							<span className="text-primary">
								{/* Fixed height container to prevent layout shifts */}
								<span className="inline-block min-h-[1.2em]" ref={typingRef}>
									{displayText}
									<span className="typing-cursor" />
								</span>
							</span>
						</h1>

						<p className="text-lg text-gray-700 max-w-lg">
							Helping entrepreneurs build their digital presence and grow their
							business with tailored solutions.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 pt-4">
							<Button
								size="lg"
								className="bg-primary hover:bg-primary/90 group"
								asChild
							>
								<Link href="/contact">
									Get started
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>

							<Button
								size="lg"
								variant="outline"
								className="border-primary text-primary hover:bg-primary hover:text-white"
								asChild
							>
								<Link href="/about">Learn more about us</Link>
							</Button>
						</div>
					</motion.div>

					<motion.div
						className="w-full max-w-[600px] ml-auto transform md:translate-y-6 transition-all"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<AspectRatio
							ratio={6 / 5}
							className="overflow-hidden rounded-xl shadow-2xl relative"
						>
							<Image
								src={heroSrc}
								alt="Professional entrepreneur"
								fill
								className="absolute inset-0 object-cover"
								priority
								unoptimized
								onError={() => setHeroSrc("/placeholder.svg")}
							/>
							<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
								<p className="text-white font-medium">John Smith</p>
								<p className="text-white/80 text-sm">
									Digital growth specialist
								</p>
							</div>
						</AspectRatio>
					</motion.div>
				</div>

				<div className="mt-16 bg-white rounded-xl shadow-lg p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
					{[
						{ value: 95, suffix: "%", label: "Client satisfaction" },
						{ value: 120, suffix: "+", label: "Projects completed" },
						{ value: 7, suffix: "+", label: "Years experience" },
						{ value: 50, suffix: "+", label: "Happy clients" },
					].map((stat) => (
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
							<p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
