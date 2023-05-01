import { join } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	main: { plugins: [tsconfigPaths(), externalizeDepsPlugin()] },
	preload: { plugins: [tsconfigPaths(), externalizeDepsPlugin()] },
	renderer: {
		plugins: [tsconfigPaths(), react()],
		publicDir: '../../resources',
		define: {
			__PLATFORM__: JSON.stringify(process.platform),
		},
		build: {
			rollupOptions: {
				input: {
					index: join(__dirname, 'src', 'renderer', 'index.html'),
					'todo-add': join(__dirname, 'src', 'renderer', 'todo-add.html'),
				},
			},
		},
	},
})
