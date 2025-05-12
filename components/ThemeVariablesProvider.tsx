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

		// Helper to convert hex to rgb string
		const hexToRgb = (hex: string) => {
			const cleanHex = hex.replace("#", "");
			const r = Number.parseInt(cleanHex.substring(0, 2), 16);
			const g = Number.parseInt(cleanHex.substring(2, 4), 16);
			const b = Number.parseInt(cleanHex.substring(4, 6), 16);
			return `${r}, ${g}, ${b}`;
		};

		// Colors (set both hex and rgb for all theme colors)
		root.style.setProperty("--primary", theme.colors.primary);
		root.style.setProperty("--primary-rgb", hexToRgb(theme.colors.primary));
		root.style.setProperty("--secondary", theme.colors.secondary);
		root.style.setProperty("--secondary-rgb", hexToRgb(theme.colors.secondary));
		root.style.setProperty("--accent", theme.colors.accent);
		root.style.setProperty("--accent-rgb", hexToRgb(theme.colors.accent));
		const colors = theme.colors as Record<string, string | undefined>;
		if (colors.background)
			root.style.setProperty("--background", colors.background);
		if (colors.header) root.style.setProperty("--header", colors.header);
		if (colors.body) root.style.setProperty("--body", colors.body);
		if (colors.lightGrey)
			root.style.setProperty("--light-grey", colors.lightGrey);
		// Universal colors
		root.style.setProperty("--white", "#fff");
		root.style.setProperty("--black", "#000");
		// Dynamic light/dark shades for primary
		const hexToHsl = (hex: string) => {
			const cleanHex = hex.replace("#", "");
			const r = Number.parseInt(cleanHex.substring(0, 2), 16) / 255;
			const g = Number.parseInt(cleanHex.substring(2, 4), 16) / 255;
			const b = Number.parseInt(cleanHex.substring(4, 6), 16) / 255;
			const max = Math.max(r, g, b);
			const min = Math.min(r, g, b);
			let h = 0;
			let s = 0;
			const l = (max + min) / 2;
			if (max !== min) {
				const d = max - min;
				s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
				switch (max) {
					case r:
						h = (g - b) / d + (g < b ? 6 : 0);
						break;
					case g:
						h = (b - r) / d + 2;
						break;
					case b:
						h = (r - g) / d + 4;
						break;
				}
				h /= 6;
			}
			return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
		};
		const hslToHex = (h: number, s: number, l: number) => {
			const s1 = s / 100;
			const l1 = l / 100;
			const k = (n: number) => (n + h / 30) % 12;
			const a = s1 * Math.min(l1, 1 - l1);
			const f = (n: number) => {
				const color = l1 - a * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1);
				return Math.round(255 * color)
					.toString(16)
					.padStart(2, "0");
			};
			return `#${f(0)}${f(8)}${f(4)}`;
		};
		const [h, s, l] = hexToHsl(theme.colors.primary);
		root.style.setProperty(
			"--primary-light",
			hslToHex(h, s, Math.min(l + 20, 100)),
		);
		root.style.setProperty(
			"--primary-dark",
			hslToHex(h, s, Math.max(l - 20, 0)),
		);

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
