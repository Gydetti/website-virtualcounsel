import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"*.{js,ts,jsx,tsx,mdx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1536px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "var(--primary)",
					foreground: "var(--primary-foreground)",
				},
				secondary: {
					DEFAULT: "var(--secondary)",
					foreground: "var(--secondary-foreground)",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "var(--accent)",
					foreground: "var(--accent-foreground)",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				brand: {
					primary: "hsl(var(--brand-primary))",
					secondary: "hsl(var(--brand-secondary))",
					dark: "hsl(var(--brand-dark))",
					light: "hsl(var(--brand-light))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			fontFamily: {
				sans: ["var(--font-raleway)", "sans-serif"],
				poppins: ["var(--font-poppins)", "sans-serif"],
				raleway: ["var(--font-raleway)", "sans-serif"],
				heading: ["var(--font-heading)", "sans-serif"],
				body: ["var(--font-body)", "sans-serif"],
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				blink: {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0" },
				},
				typing: {
					"0%": { width: "0" },
					"100%": { width: "100%" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				blink: "blink 1s step-end infinite",
				typing: "typing 3.5s steps(40, end)",
			},
			backgroundImage: {
				"concrete-texture":
					"url('/images/textures/concrete_texture_overlay_cleaned.png')",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		plugin(({ matchUtilities, theme }) => {
			const colors = [
				"primary",
				"secondary",
				"destructive",
				"muted",
				"accent",
				"popover",
				"card",
			];
			for (const color of colors) {
				matchUtilities(
					{
						[`bg-${color}`]: (value) => ({
							"background-color": `rgba(var(--${color}-rgb), ${value})`,
						}),
						[`text-${color}`]: (value) => ({
							color: `rgba(var(--${color}-rgb), ${value})`,
						}),
						[`border-${color}`]: (value) => ({
							"border-color": `rgba(var(--${color}-rgb), ${value})`,
						}),
					},
					{ values: theme("opacity") },
				);
			}
		}),
	],
} satisfies Config;

export default config;
