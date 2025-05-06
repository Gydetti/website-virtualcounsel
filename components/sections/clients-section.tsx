"use client";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import styles from "./clients-section.module.css";

export interface ClientsSectionProps {
	badgeText?: string;
	heading?: string;
	clients?: { name: string; logo: string }[];
	repeats?: number;
	slideWidth?: number;
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
	repeats = 3,
	slideWidth = 166,
}: ClientsSectionProps) {
	const totalWidth = clients.length * repeats * slideWidth;

	return (
		<section
			id="clients-section"
			aria-labelledby="clients-section-heading"
			className="py-12 relative overflow-hidden"
		>
			<div className="container-wide relative z-10">
				<div className="text-center mb-8">
					<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
						{badgeText}
					</Badge>
					<h2 id="clients-section-heading" className="text-2xl font-bold">
						{heading}
					</h2>
				</div>

				<div className="py-4">
					<div className={styles.slider_wrapper}>
						<div className={styles.slider} style={{ width: `${totalWidth}px` }}>
							{Array.from({ length: repeats }).flatMap((_, rIdx) =>
								clients.map((client) => (
									<div
										key={`${rIdx}-${client.name}`}
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
								)),
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
