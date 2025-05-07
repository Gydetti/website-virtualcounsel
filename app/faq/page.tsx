import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site.config";
import { notFound } from "next/navigation";
import FaqClientPage from "./FaqClientPage";

// Disable this page if not enabled in config
if (siteConfig.enabledPages && !siteConfig.enabledPages.includes("/faq")) {
  notFound();
}

export const metadata = defaultMetadata({
  title: `${siteConfig.site.name} | FAQ`,
  description:
    "Find answers to frequently asked questions about our services and how we work.",
});

export default function FaqPage() {
  return <FaqClientPage />;
}
