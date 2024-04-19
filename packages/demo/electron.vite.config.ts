import { join } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	main: { plugins: [tsconfigPaths(), externalizeDepsPlugin({ exclude: ['reduxtron'] })] },
	preload: { plugins: [tsconfigPaths(), externalizeDepsPlugin({ exclude: ['reduxtron'] })] },
	renderer: {
		plugins: [tsconfigPaths(), react(), svelte(), vue()],
		publicDir: '../../resources',
		define: {
			__PLATFORM__: JSON.stringify(process.platform),
		},
		build: {
			rollupOptions: {
				input: {
					index: join(__dirname, 'src', 'renderer', 'index.html'),
					'add-to-do/vanilla': join(__dirname, 'src', 'renderer', 'add-to-do/vanilla.html'),
					'add-to-do/svelte': join(__dirname, 'src', 'renderer', 'add-to-do/svelte.html'),
					'add-to-do/vue': join(__dirname, 'src', 'renderer', 'add-to-do/vue.html'),
				},
			},
		},
	},
})
