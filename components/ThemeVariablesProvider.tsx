// A client-side provider to inject CSS custom properties based on siteConfig.theme
"use client";

import { siteConfig } from "@/lib/site.config.local";
import { useEffect } from "react";
import type { ReactNode } from "react";

interface ThemeVariablesProviderProps {
	children: ReactNode;
}

export default function ThemeVariablesProvider({
	children,
}: ThemeVariablesProviderProps) {
	useEffect(() => {
		const root = document.documentElement;
		const theme = siteConfig.theme;

		// Colors
		root.style.setProperty("--primary", theme.colors.primary);
		root.style.setProperty("--secondary", theme.colors.secondary);
		root.style.setProperty("--accent", theme.colors.accent);

		// Derive and set RGB channels for secondary (for alpha utilities)
		const secHex = theme.colors.secondary.replace("#", "");
		const secR = Number.parseInt(secHex.substring(0, 2), 16);
		const secG = Number.parseInt(secHex.substring(2, 4), 16);
		const secB = Number.parseInt(secHex.substring(4, 6), 16);
		root.style.setProperty("--secondary-rgb", `${secR},${secG},${secB}`);

		// Typography
		root.style.setProperty("--font-heading", theme.typography.headingFont);
		root.style.setProperty("--font-body", theme.typography.bodyFont);
		root.style.setProperty("--font-base-size", theme.typography.baseSize);

		// Spacing
		for (const [key, value] of Object.entries(theme.spacing)) {
			root.style.setProperty(`--space-${key}`, value);
		}

		// Borders
		root.style.setProperty("--radius-base", theme.borders.radiusBase);
		root.style.setProperty("--border-width-base", theme.borders.widthBase);
		root.style.setProperty("--border-color-base", theme.borders.colorBase);

		// Shadows
		for (const [key, value] of Object.entries(theme.shadows)) {
			root.style.setProperty(`--shadow-${key}`, value);
		}

		// Layout
		root.style.setProperty(
			"--container-max-width",
			theme.layout.containerMaxWidth,
		);
		root.style.setProperty(
			"--container-padding",
			theme.layout.containerPadding,
		);
	}, []);

	return <>{children}</>;
}
