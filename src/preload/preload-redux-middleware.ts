import { IpcRenderer } from 'electron'
import { AnyAction } from 'redux'

type AnyState = Record<string, unknown>

export type PreloadReduxMiddlewareReturn<S extends AnyState, A extends AnyAction> = {
	handlers: {
		dispatch: (action: A) => void
		subscribe: (callback: (newState: S) => void) => () => void
	}
}

export const preloadReduxMiddleware = <S extends AnyState, A extends AnyAction>(
	ipcRenderer: IpcRenderer,
): PreloadReduxMiddlewareReturn<S, A> => ({
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

export type PreloadReduxMiddleware = typeof preloadReduxMiddleware
