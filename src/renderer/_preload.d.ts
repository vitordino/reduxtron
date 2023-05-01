import type { PreloadReduxMiddlewareHandlers } from '../preload/preload-redux-middleware'

declare global {
	interface Window {
		electron: PreloadReduxMiddlewareHandlers
		__PLATFORM__: 'darwin' | 'linux' | 'windows'
	}
}

export {}
