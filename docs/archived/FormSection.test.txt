import * as trackingUtils from "@/lib/tracking-utils";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import FormSection from "./FormSection";

describe("FormSection", () => {
	it("renders placeholder when no embed provided", () => {
		render(<FormSection />);
		expect(screen.getByText(/Form embed placeholder/i)).toBeInTheDocument();
	});

	it("renders embed component and tracks on submit", () => {
		const spy = vi.spyOn(trackingUtils, "trackEvent");
		const EmbedForm = () => (
			<form data-testid="test-form">
				<button type="submit">Submit</button>
			</form>
		);
		render(
			<FormSection formEmbed={<EmbedForm />} resourceSlug="example-ebook" />,
		);
		const form = screen.getByTestId("test-form");
		fireEvent.submit(form);
		expect(spy).toHaveBeenCalledWith(
			"landing_form_submit",
			"resource",
			"example-ebook",
		);
	});
});
