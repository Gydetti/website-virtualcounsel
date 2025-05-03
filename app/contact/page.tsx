import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site.config";
import ContactPageClient from "./ContactPageClient";

export const metadata = defaultMetadata({
	title: `${siteConfig.site.name} | Contact`,
	description:
		"Get in touch with us to discuss your business needs and how we can help you grow.",
});

export default function ContactPage() {
	return <ContactPageClient />;
}
