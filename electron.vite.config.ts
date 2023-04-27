import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const optimizeDeps = { exclude: ['native-prompt'] }

export default defineConfig({
	main: {
		plugins: [tsconfigPaths(), externalizeDepsPlugin()],
		optimizeDeps,
	},
	preload: {
		plugins: [tsconfigPaths(), externalizeDepsPlugin()],
		optimizeDeps,
	},
	renderer: {
		plugins: [tsconfigPaths(), react()],
		publicDir: '../../resources',
		optimizeDeps,
		define: {
			__PLATFORM__: JSON.stringify(process.platform),
		},
	},
})
