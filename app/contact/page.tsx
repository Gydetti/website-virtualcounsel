import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";
import { notFound } from "next/navigation";
import ContactPageClient from "./ContactPageClient";

export const metadata = defaultMetadata({
  title: `${siteConfig.site.name} | Contact`,
  description:
    "Get in touch with us to discuss your business needs and how we can help you grow.",
});

export default function ContactPage() {
  // Disable this page if contact form feature is off or page not enabled
  if (
    !siteConfig.features.enableContactForm ||
    (siteConfig.enabledPages && !siteConfig.enabledPages.includes("/contact"))
  ) {
    notFound();
  }

  return <ContactPageClient />;
}
