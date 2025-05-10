import type { formBlockSchema } from "@/lib/schemas/contentBlocks.schema";
import type { z } from "zod";

import type { ReactNode } from "react";

type FormBlockProps = z.infer<typeof formBlockSchema>;

export default function FormBlock({
	title,
	description,
	config,
}: FormBlockProps) {
	let formNode: ReactNode | string | undefined = undefined;

	if (config.provider === "custom" && config.embedCode) {
		// biome-ignore lint: Trusting embedCode from CMS/data file for now, will revisit sanitization if needed.
		formNode = <div dangerouslySetInnerHTML={{ __html: config.embedCode }} />;
	} else if (
		config.provider === "hubspot" &&
		config.portalId &&
		config.formId
	) {
		formNode = (
			<div>
				<p>HubSpot Form Placeholder:</p>
				<p>
					Portal ID: {config.portalId}, Form ID: {config.formId}
				</p>
			</div>
		);
	} else {
		formNode = (
			<div id="form-block-placeholder">
				Form provider not configured or embed code missing.
			</div>
		);
	}

	return (
		<section className="form-block py-12 bg-gray-50">
			<div className="container mx-auto px-4 text-center">
				{title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
				{description && (
					<p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
						{description}
					</p>
				)}
				<div className="max-w-xl mx-auto">{formNode}</div>
			</div>
		</section>
	);
}
