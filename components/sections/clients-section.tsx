"use client";
import { Badge } from "@/components/ui/badge";
import styles from "./clients-section.module.css";

export default function ClientsSection() {
	const clients = [
		{ name: "TechCorp", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "InnovateLabs", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "GrowthPartners", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "FutureVision", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "NextLevel", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "PeakPerformance", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "EliteServices", logo: "/placeholder.svg?height=60&width=120" },
		{ name: "PrimeConsulting", logo: "/placeholder.svg?height=60&width=120" },
	];
	const repeats = 3;
	const slideWidth = 166; // width of each logo item in px
	const totalWidth = clients.length * repeats * slideWidth;

	return (
		<section className="py-12 bg-white relative overflow-hidden">
			<div className="container-wide relative z-10">
				<div className="text-center mb-8">
					<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
						Trusted by
					</Badge>
					<h2 className="text-2xl font-bold">Companies that trust us</h2>
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
										<img
											src={client.logo}
											alt={client.name}
											width={120}
											height={60}
											className={`${styles.logo_image} w-24`}
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
