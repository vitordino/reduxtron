import type { PreloadReduxMiddlewareReturn } from '../preload/preload-redux-middleware'
import type { State, Action } from '../shared/reducers'

declare global {
	interface Window {
		electron: PreloadReduxMiddlewareReturn<State, Action>['handlers']
		windowId?: string
		__PLATFORM__: 'darwin' | 'linux' | 'windows'
	}
}

export {}
