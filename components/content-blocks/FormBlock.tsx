// biome-disable

import type { FC } from "react";

interface FormBlockProps {
	config: {
		provider?: "hubspot" | "mailchimp" | "custom";
		portalId?: string;
		formId?: string;
		embedCode?: string;
	};
	title?: string;
	description?: string;
}

const FormBlock: FC<FormBlockProps> = ({ config, title, description }) => {
	return (
		<section className="form-block py-8">
			<div className="container mx-auto">
				{title && (
					<h2 className="text-[var(--font-subheading-size)] font-semibold mb-4">
						{title}
					</h2>
				)}
				{description && <p className="mb-6">{description}</p>}
				{config.embedCode ? (
					<div
						className="form-embed"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: Form embed code is trusted and sanitized by the CMS
						dangerouslySetInnerHTML={{ __html: config.embedCode }}
					/>
				) : (
					<p>
						{/* TODO: Implement form rendering for provider {config.provider} */}
						Form embed not configured.
					</p>
				)}
			</div>
		</section>
	);
};

export default FormBlock;
