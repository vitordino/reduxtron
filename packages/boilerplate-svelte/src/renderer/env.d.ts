import type { PreloadReduxBridgeReturn } from 'reduxtron/types'
import type { State, Action } from '../shared/reducers'

declare module '*.svelte' {
	import type { ComponentType } from 'svelte'
	const component: ComponentType
	export default component
}

declare global {
	interface Window {
		reduxtron: PreloadReduxBridgeReturn<State, Action>['handlers']
	}
}

export type Reduxtron = PreloadReduxBridgeReturn<State, Action>['handlers']
