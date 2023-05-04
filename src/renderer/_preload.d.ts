import type { PreloadReduxMiddleware } from '../preload/preload-redux-middleware'

declare global {
	interface Window {
		electron: ReturnType<PreloadReduxMiddleware>['handlers']
		windowId?: string
		__PLATFORM__: 'darwin' | 'linux' | 'windows'
	}
}

export {}
