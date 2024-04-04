import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'

export default defineConfig({
	main: {
		plugins: [tsconfigPaths(), externalizeDepsPlugin()]
	},
	preload: {
		plugins: [tsconfigPaths(), externalizeDepsPlugin({ exclude: ['reduxtron'] })]
	},
	renderer: {
		plugins: [tsconfigPaths(), react()]
	}
})
