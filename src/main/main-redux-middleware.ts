/* eslint global-require: off */
// utility to plug redux functions onto main ipc
// this adds the subscribe and dispatch messages
import { IpcMain } from 'electron'
import type { Store } from 'redux'
import uiSideEffects from './redux-ui-side-effects'

type MainReduxMiddleware = {
	<S extends Store>(ipcMain: IpcMain, store: S): { unsubscribe: () => void }
}

const mainReduxMiddleware: MainReduxMiddleware = (ipcMain, store) => {
	ipcMain.on('dispatch', (_, action: Parameters<typeof store.dispatch>[0]) =>
		store.dispatch(action),
	)

	const unsubscribe = store.subscribe(() => {
		const state = store.getState()
		uiSideEffects(state)
		ipcMain.emit('subscribe', state)
	})

	return { unsubscribe }
}

export default mainReduxMiddleware
