import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
	main: {
		plugins: [tsconfigPaths(), externalizeDepsPlugin()]
	},
	preload: {
		plugins: [tsconfigPaths(), externalizeDepsPlugin({ exclude: ['reduxtron'] })]
	},
	renderer: {
		plugins: [tsconfigPaths(), svelte()]
	}
})
