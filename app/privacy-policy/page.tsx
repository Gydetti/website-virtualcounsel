import { Badge } from "@/components/ui/badge";
import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site.config";

export const metadata = defaultMetadata({
	title: `${siteConfig.site.name} | Privacy Policy`,
	description:
		"Our privacy policy outlines how we collect, use, and protect your personal information.",
});

export default function PrivacyPolicyPage() {
	return (
		<section className="py-16 md:py-24">
			<div className="container-wide">
				<div className="max-w-4xl mx-auto">
					<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
						Legal
					</Badge>
					<h1 className="text-3xl md:text-4xl font-bold mb-8">
						Privacy Policy
					</h1>

					<div className="prose prose-lg max-w-none">
						<p>Last Updated: [LAST_UPDATED_DATE]</p>

						<h2>1. Introduction</h2>
						<p>
							[PRIVACY_POLICY_INTRODUCTION: Explain who you are and the purpose
							of this privacy policy.]
						</p>

						<h2>2. Information We Collect</h2>
						<p>
							[INFORMATION_COLLECTED: Detail the types of personal information
							you collect from users.]
						</p>

						<h3>2.1 Personal Information</h3>
						<p>
							[PERSONAL_INFORMATION_DETAILS: Specify what personal information
							you collect, such as names, email addresses, etc.]
						</p>

						<h3>2.2 Usage Data</h3>
						<p>
							[USAGE_DATA_DETAILS: Explain what usage data you collect, such as
							IP addresses, browser types, etc.]
						</p>

						<h2>3. How We Use Your Information</h2>
						<p>
							[INFORMATION_USAGE: Explain how you use the collected
							information.]
						</p>
						<ul>
							<li>
								[USAGE_PURPOSE_1: Describe a specific purpose for using
								collected data.]
							</li>
							<li>
								[USAGE_PURPOSE_2: Describe a specific purpose for using
								collected data.]
							</li>
							<li>
								[USAGE_PURPOSE_3: Describe a specific purpose for using
								collected data.]
							</li>
							<li>
								[USAGE_PURPOSE_4: Describe a specific purpose for using
								collected data.]
							</li>
						</ul>

						<h2>4. Data Sharing and Disclosure</h2>
						<p>
							[DATA_SHARING: Explain who you share the data with and under what
							circumstances.]
						</p>

						<h2>5. Data Security</h2>
						<p>
							[DATA_SECURITY: Describe the measures you take to protect user
							data.]
						</p>

						<h2>6. Your Rights</h2>
						<p>
							[USER_RIGHTS: Explain what rights users have regarding their
							data.]
						</p>

						<h2>7. Cookies Policy</h2>
						<p>
							[COOKIES_POLICY: Explain your use of cookies and similar
							technologies.]
						</p>

						<h2>8. Changes to This Privacy Policy</h2>
						<p>
							[POLICY_CHANGES: Explain how you will notify users of changes to
							this policy.]
						</p>

						<h2>9. Contact Us</h2>
						<p>
							[CONTACT_INFORMATION: Provide contact information for
							privacy-related inquiries.]
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
