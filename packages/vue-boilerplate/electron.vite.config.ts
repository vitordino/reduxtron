import { join } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	main: { plugins: [tsconfigPaths(), externalizeDepsPlugin()] },
	preload: { plugins: [tsconfigPaths(), externalizeDepsPlugin()] },
	renderer: {
		plugins: [tsconfigPaths(), vue()],
		publicDir: '../../resources',
		define: {
			__PLATFORM__: JSON.stringify(process.platform),
		},
		build: {
			rollupOptions: {
				input: {
					index: join(__dirname, 'src', 'renderer', 'index.html'),
				},
			},
		},
	},
})
