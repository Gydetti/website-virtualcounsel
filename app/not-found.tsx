import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[70vh] py-16 px-4 text-center">
			<h1 className="text-9xl font-bold text-primary">404</h1>
			<h2 className="text-3xl md:text-4xl font-bold mt-6 mb-4">
				Page Not Found
			</h2>
			<p className="text-xl text-gray-600 max-w-md mb-8">
				The page you are looking for might have been removed, had its name
				changed, or is temporarily unavailable.
			</p>
			<Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
				<Link href="/">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Home
				</Link>
			</Button>
		</div>
	);
}
