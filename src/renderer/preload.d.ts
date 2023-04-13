import type { PreloadReduxMiddlewareHandlers } from '../preload/preload-redux-middleware'

declare global {
	interface Window {
		electron: PreloadReduxMiddlewareHandlers
	}
}

export {}
