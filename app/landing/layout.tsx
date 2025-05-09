import LandingFooter from "@/components/layout/LandingFooter";
import LandingHeader from "@/components/layout/LandingHeader";

export default function LandingLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<LandingHeader />
			<main>{children}</main>
			<LandingFooter />
		</>
	);
}
