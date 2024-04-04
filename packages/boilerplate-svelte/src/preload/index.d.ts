import type { PreloadReduxBridgeReturn } from 'reduxtron/types'
import type { State, Action } from '../shared/reducers'

declare global {
	interface Window {
		reduxtron: PreloadReduxBridgeReturn<State, Action>['handlers']
	}
}

export {}
