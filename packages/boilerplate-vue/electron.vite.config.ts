import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	main: {
		plugins: [tsconfigPaths(), externalizeDepsPlugin()]
	},
	preload: {
		plugins: [tsconfigPaths(), externalizeDepsPlugin({ exclude: ['reduxtron'] })]
	},
	renderer: {
		plugins: [tsconfigPaths(), vue()]
	}
})
