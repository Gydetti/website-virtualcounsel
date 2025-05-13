import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/lib/siteConfig";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
	title: string;
	description: string;
	icon: React.ReactNode;
	features: string[];
	popular?: boolean;
	slug: string;
}

export default function ServiceCard({
	title,
	description,
	icon,
	features,
	popular = false,
	slug,
}: ServiceCardProps) {
	const microClass = siteConfig.features.enableMicroInteractions
		? "transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
		: "";
	return (
		<Card
			className={`card-equal-height h-full overflow-hidden ${microClass} ${
				popular
					? "border-primary shadow-lg relative"
					: "border-gray-200 shadow-sm"
			}`}
		>
			{popular && (
				<div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
					Popular
				</div>
			)}
			<CardHeader className={`${popular ? "pt-12" : ""}`}>
				<div className="mb-6 bg-[rgba(var(--primary-rgb),0.1)] w-16 h-16 rounded-lg flex items-center justify-center">
					{icon}
				</div>
				<CardTitle className="text-xl font-bold">{title}</CardTitle>
				<CardDescription className="text-body-base text-gray-600">
					{description}
				</CardDescription>
			</CardHeader>
			<CardContent className="card-content">
				<ul className="space-y-3">
					{features.map((feature) => (
						<li key={feature} className="flex items-start">
							<span className="text-green-500 mr-3 flex-shrink-0 mt-0.5">
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
									className="h-5 w-5"
								>
									<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
									<polyline points="22 4 12 14.01 9 11.01" />
								</svg>
							</span>
							<span>{feature}</span>
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter className="card-footer pt-6">
				<Button
					className="group w-full"
					variant={popular ? "default" : "outline"}
					asChild
				>
					<Link href={`/services/${slug}`}>
						{`Learn more about ${title}`}
						<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
