import { IpcRenderer } from 'electron'
import { State, Action } from 'shared/reducers'

export type PreloadReduxMiddlewareHandlers = {
	dispatch: (action: Action) => void
	subscribe: (callback: (newState: State) => void) => () => void
}

export type PreloadReduxMiddleware = (ipcRenderer: IpcRenderer) => {
	handlers: PreloadReduxMiddlewareHandlers
}

export const preloadReduxMiddleware: PreloadReduxMiddleware = ipcRenderer => ({
	handlers: {
		dispatch: action => ipcRenderer.send('dispatch', action),
		subscribe: callback => {
			const subscription = (_: unknown, state: State) => callback(state)
			ipcRenderer.on('subscribe', subscription)
			return () => {
				ipcRenderer.off('subscribe', subscription)
			}
		},
	},
})
