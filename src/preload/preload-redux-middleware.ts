import { IpcRenderer } from 'electron'
import { AnyAction } from 'redux'

type AnyState = Record<string, unknown>

export const preloadReduxMiddleware = <S extends AnyState, A extends AnyAction>(
	ipcRenderer: IpcRenderer,
) => ({
	handlers: {
		dispatch: (action: A) => ipcRenderer.send('dispatch', action),
		subscribe: (callback: (newState: S) => void) => {
			const subscription = (_: unknown, state: S) => callback(state)
			ipcRenderer.on('subscribe', subscription)
			return () => {
				ipcRenderer.off('subscribe', subscription)
			}
		},
	},
})

export type PreloadReduxMiddleware = typeof preloadReduxMiddleware
