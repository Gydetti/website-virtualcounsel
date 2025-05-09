import { trackEvent } from "@/lib/tracking-utils";
import { cloneElement, isValidElement } from "react";
import type { ReactNode } from "react";

export interface FormSectionProps {
	/** ReactNode for embedding a 3rd-party form component */
	formEmbed?: ReactNode;
	/** Slug of the resource for tracking purposes */
	resourceSlug?: string;
}

export default function FormSection({
	formEmbed,
	resourceSlug,
}: FormSectionProps) {
	let embedNode = formEmbed;
	// Attach onSubmit handler to trigger tracking if embed supports it
	if (resourceSlug && embedNode && isValidElement(embedNode)) {
		embedNode = cloneElement(embedNode, {
			onSubmit: () => {
				trackEvent("landing_form_submit", "resource", resourceSlug);
			},
		});
	}

	return (
		<section className="form-section py-8">
			<div className="container mx-auto">
				{embedNode ?? (
					<div id="resource-form-placeholder">Form embed placeholder</div>
				)}
			</div>
		</section>
	);
}
