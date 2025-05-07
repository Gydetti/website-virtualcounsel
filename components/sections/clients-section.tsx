"use client";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./clients-section.module.css";

export interface ClientsSectionProps {
	badgeText?: string;
	heading?: string;
	clients?: { name: string; logo: string }[];
}

export default function ClientsSection({
	badgeText = "Trusted by",
	heading = "Companies that trust us",
	clients = [
		{ name: "TechCorp", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "InnovateLabs", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "GrowthPartners", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "FutureVision", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "NextLevel", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "PeakPerformance", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "EliteServices", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "PrimeConsulting", logo: "/placeholder.svg?height=60&width=120" },
	],
}: ClientsSectionProps) {
	// Only display up to 6 logos, then duplicate for infinite scroll
	const displayClients = clients.slice(0, 6);
	// Duplicate with an instance flag for unique, stable keys
	const sliderItems = [
		...displayClients.map((c) => ({ ...c, instance: 0 })),
		...displayClients.map((c) => ({ ...c, instance: 1 })),
	];

	return (
		<Section
			id="clients-section"
			aria-labelledby="clients-section-heading"
			className="relative overflow-hidden"
		>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true }}
				className="relative z-10"
			>
				<div className="text-center mb-4">
					<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
						{badgeText}
					</Badge>
				</div>

				<div className="py-4">
					<div className="py-2">
						<div className={styles.slider_wrapper}>
							<div className={styles.slider}>
								{sliderItems.map((client) => (
									<div
										key={`${client.name}-${client.instance}`}
										className={styles.logo_item}
									>
										<Image
											src={client.logo}
											alt={client.name}
											width={120}
											height={60}
											className={`${styles.logo_image} w-24 object-contain`}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</Section>
	);
}
