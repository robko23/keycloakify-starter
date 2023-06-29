import {defineConfig} from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
	test: {
		environment: "jsdom",
		setupFiles: "src/setupTests.ts",
		globals: true
	},
	plugins: [react()]
})