/* biome-disable lint/correctness/useExhaustiveDependencies */
"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const pathname = usePathname();

	// Get optional enabledPages list from config
	const enabledPages = siteConfig.enabledPages;

	// Filter navigation based on siteConfig.navLinks and feature flags
	const filteredNavigation = (siteConfig.navLinks ?? []).filter((item) => {
		// Exclude pages not in enabledPages
		if (enabledPages && !enabledPages.includes(item.href)) {
			return false;
		}
		// Respect individual feature flags
		if (item.href.startsWith("/blog") && !siteConfig.features.enableBlog)
			return false;
		if (
			item.href.startsWith("/services") &&
			!siteConfig.features.enableServices
		)
			return false;
		if (
			item.href.startsWith("/contact") &&
			!siteConfig.features.enableContactForm
		)
			return false;
		return true;
	});

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Close mobile menu when route changes
	// biome-disable-next-line lint/correctness/useExhaustiveDependencies
	useEffect(() => {
		setMobileMenuOpen(false);
	}, []);

	return (
		<header
			className={cn(
				"sticky top-0 z-50 w-full transition-all duration-300",
				scrolled
					? "bg-white shadow-sm lg:bg-white/80 lg:backdrop-blur-md"
					: "bg-white",
			)}
		>
			<nav
				className={cn(
					"container-wide px-2 sm:px-3 md:px-4 xl:px-10 flex items-center justify-between transition-all duration-300",
					scrolled ? "py-2.5" : "py-5",
				)}
				aria-label="Global"
			>
				<div
					className={cn(
						"flex lg:flex-1 transition-transform duration-300 origin-left",
						scrolled ? "scale-90" : "scale-100",
					)}
				>
					<Link href="/" className="-m-1.5 p-1.5">
						<span className="sr-only">{siteConfig.site.name}</span>
						<div
							className="flex items-center gap-3"
							style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
						>
							<Image
								src={siteConfig.theme.logo.src}
								alt={siteConfig.theme.logo.alt}
								width={150}
								height={40}
								priority
								className="h-14 w-auto"
							/>
							<div className="flex flex-col">
								<span className="text-lg font-semibold leading-tight text-gray-900">
									{siteConfig.site.name}
								</span>
								{siteConfig.theme.logo.subtitle && (
									<span className="text-sm text-gray-500 leading-snug">
										{siteConfig.theme.logo.subtitle}
									</span>
								)}
							</div>
						</div>
					</Link>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						onClick={() => setMobileMenuOpen(true)}
						aria-label="Open main menu"
					>
						<Menu className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<div className="hidden lg:flex lg:gap-x-8">
					{filteredNavigation.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"text-sm font-medium transition-colors relative group",
								pathname === item.href
									? "text-primary font-semibold"
									: scrolled
										? "text-gray-900 hover:text-primary"
										: "text-gray-700 hover:text-primary",
							)}
						>
							{item.text}
							<span
								className={cn(
									"absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
									pathname === item.href ? "w-full" : "w-0 group-hover:w-full",
								)}
							/>
						</Link>
					))}
				</div>
				<div className="hidden lg:flex lg:items-center lg:ml-8">
					<Button asChild className="bg-primary hover:bg-primary-90 group">
						<Link href="/contact">
							Main CTA button
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</Button>
				</div>
			</nav>

			{/* Mobile menu */}
			<AnimatePresence>
				{mobileMenuOpen && (
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="fixed inset-0 z-50 bg-white lg:hidden"
					>
						<div className="flex items-center justify-between px-6 py-4 border-b">
							<Link
								href="/"
								className="-m-1.5 p-1.5"
								onClick={() => setMobileMenuOpen(false)}
							>
								<span className="sr-only">{siteConfig.site.name}</span>
								<div className="flex items-center gap-3">
									<Image
										src={siteConfig.theme.logo.src}
										alt={siteConfig.theme.logo.alt}
										width={150}
										height={40}
										priority
										className="h-10 w-auto"
									/>
									<div className="flex flex-col">
										<span className="text-lg font-semibold leading-tight text-gray-900">
											{siteConfig.site.name}
										</span>
										{siteConfig.theme.logo.subtitle && (
											<span className="text-sm text-gray-500 leading-snug">
												{siteConfig.theme.logo.subtitle}
											</span>
										)}
									</div>
								</div>
							</Link>
							<button
								type="button"
								className="-m-2.5 rounded-md p-2.5 text-gray-700"
								onClick={() => setMobileMenuOpen(false)}
								aria-label="Close menu"
							>
								<X className="h-6 w-6" aria-hidden="true" />
							</button>
						</div>
						<div className="mt-6 flow-root px-6">
							<div className="space-y-6 py-6">
								{filteredNavigation.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										className={cn(
											"block text-base font-medium hover:text-primary",
											pathname === item.href
												? "text-primary font-semibold"
												: "text-gray-900",
										)}
										onClick={() => setMobileMenuOpen(false)}
									>
										{item.text}
									</Link>
								))}
							</div>
							<div className="mt-4">
								<Button
									asChild
									className="w-full bg-primary hover:bg-primary-90 group"
								>
									<Link
										href="/contact"
										onClick={() => setMobileMenuOpen(false)}
									>
										Get in touch
										<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
