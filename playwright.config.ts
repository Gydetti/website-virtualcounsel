import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "tests",
	webServer: {
		command: "npm run build && npm run start -- -p 3001",
		port: 3001,
		reuseExistingServer: false,
	},
	use: {
		baseURL: "http://localhost:3001",
		headless: true,
		viewport: { width: 1280, height: 720 },
	},
});
