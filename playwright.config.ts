import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "tests/e2e",
	webServer: {
		command: "npm run dev -- --port 3010",
		port: 3010,
		reuseExistingServer: true,
	},
	use: {
		baseURL: "http://localhost:3010",
		headless: true,
		viewport: { width: 1280, height: 720 },
	},
});
