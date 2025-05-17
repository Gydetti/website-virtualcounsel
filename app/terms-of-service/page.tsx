import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/siteConfig";
import { notFound } from "next/navigation";

// Disable this page if not enabled
if (
  siteConfig.enabledPages &&
  !siteConfig.enabledPages.includes("/terms-of-service")
) {
  notFound();
}

export const metadata = {
  title: "Terms of Service | Entrepreneur Template",
  description:
    "Our terms of service outline the rules and guidelines for using our website and services.",
};

export default function TermsOfServicePage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
            Section label for legal page
          </Badge>
          <h1 className="text-[var(--font-heading-size)]">
            Section title for terms of service page
          </h1>

          <div className="prose prose-lg max-w-none">
            <p>Last updated date placeholder (e.g. 'January 1, 2025')</p>

            <h2>1. Introduction</h2>
            <p>
              Paragraph placeholder: explain purpose of terms and applicable
              audience
            </p>

            <h2>2. Acceptance of terms</h2>
            <p>
              Paragraph placeholder: explain that using the website implies
              acceptance
            </p>

            <h2>3. Description of services</h2>
            <p>
              Paragraph placeholder: general description of services offered
            </p>

            <h2>4. User accounts</h2>
            <p>
              Paragraph placeholder: rules and responsibilities for user
              accounts
            </p>

            <h2>5. Intellectual property rights</h2>
            <p>
              Paragraph placeholder: explain content ownership and IP rights
            </p>

            <h2>6. User content</h2>
            <p>Paragraph placeholder: rules for user-submitted content</p>

            <h2>7. Prohibited activities</h2>
            <p>
              Paragraph placeholder: list activities not allowed on the site
            </p>

            <h2>8. Limitation of liability</h2>
            <p>
              Paragraph placeholder: explain limits of liability for damages or
              losses
            </p>

            <h2>9. Indemnification</h2>
            <p>
              Paragraph placeholder: explain user indemnification obligations
            </p>

            <h2>10. Termination</h2>
            <p>
              Paragraph placeholder: explain terms for terminating user access
            </p>

            <h2>11. Governing law</h2>
            <p>Paragraph placeholder: specify the governing law jurisdiction</p>

            <h2>12. Changes to terms</h2>
            <p>
              Paragraph placeholder: explain how users will be notified of
              changes
            </p>

            <h2>13. Contact information</h2>
            <p>
              Paragraph placeholder: provide contact details for terms inquiries
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
