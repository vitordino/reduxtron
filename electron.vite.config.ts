import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	main: {
		plugins: [tsconfigPaths(), externalizeDepsPlugin()],
	},
	preload: {
		plugins: [tsconfigPaths(), externalizeDepsPlugin()],
	},
	renderer: {
		plugins: [tsconfigPaths(), react()],
		publicDir: 'static',
	},
})
