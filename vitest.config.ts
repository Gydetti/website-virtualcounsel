import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig(async () => {
	const tsconfigPaths = (await import('vite-tsconfig-paths')).default;
	return {
		plugins: [react(), tsconfigPaths()],
		test: {
			environment: "jsdom",
			globals: true,
			setupFiles: ["./vitest.setup.ts"],
			include: [
				"tests/unit/**/*.test.{ts,tsx}",
				"tests/integration/**/*.spec.{ts,tsx}",
				"tests/integration/**/*.test.{ts,tsx}",
			],
		},
	};
});
