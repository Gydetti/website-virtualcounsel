import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site.config";
import FaqClientPage from "./FaqClientPage";

export const metadata = defaultMetadata({
	title: `${siteConfig.site.name} | FAQ`,
	description:
		"Find answers to frequently asked questions about our services and how we work.",
});

export default function FaqPage() {
	return <FaqClientPage />;
}
