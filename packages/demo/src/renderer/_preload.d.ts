import type { PreloadReduxBridgeReturn } from 'reduxtron/preload'
import type { State, Action } from '../shared/reducers'

declare global {
	interface Window {
		electron: PreloadReduxBridgeReturn<State, Action>['handlers']
		windowId?: string
		__PLATFORM__: 'darwin' | 'linux' | 'windows'
	}
}

export {}
