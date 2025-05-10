import { trackEvent } from "@/lib/tracking-utils";
import {
	type FormHTMLAttributes,
	type ReactElement,
	type ReactNode,
	cloneElement,
	isValidElement,
} from "react";

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
		// Clone only if it's a form element, cast to include onSubmit
		const formElement = embedNode as ReactElement<
			FormHTMLAttributes<HTMLFormElement>
		>;
		embedNode = cloneElement(formElement, {
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
