import { join } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	main: { plugins: [tsconfigPaths(), externalizeDepsPlugin()] },
	preload: { plugins: [tsconfigPaths(), externalizeDepsPlugin()] },
	renderer: {
		plugins: [tsconfigPaths(), svelte()],
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
