import { IpcRenderer } from 'electron'
import { AnyAction } from 'redux'

type AnyState = Record<string, unknown>

export type PreloadReduxBridgeReturn<S extends AnyState, A extends AnyAction> = {
	handlers: {
		dispatch: (action: A) => void
		subscribe: (callback: (newState: S) => void) => () => void
	}
}

export const preloadReduxBridge = <S extends AnyState, A extends AnyAction>(
	ipcRenderer: IpcRenderer,
): PreloadReduxBridgeReturn<S, A> => ({
	handlers: {
		dispatch: action => ipcRenderer.send('dispatch', action),
		subscribe: callback => {
			const subscription = (_: unknown, state: S) => callback(state)
			ipcRenderer.on('subscribe', subscription)
			return () => {
				ipcRenderer.off('subscribe', subscription)
			}
		},
	},
})

export type PreloadReduxBridge = typeof preloadReduxBridge
