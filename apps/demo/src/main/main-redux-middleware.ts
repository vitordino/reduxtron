// utility to plug redux functions onto main ipc
// this adds the subscribe and dispatch messages
import { IpcMain } from 'electron'
import type { Store } from 'redux'

type MainReduxMiddleware = {
	<S extends Store>(ipcMain: IpcMain, store: S): { unsubscribe: () => void }
}

export const mainReduxMiddleware: MainReduxMiddleware = (ipcMain, store) => {
	ipcMain.on('dispatch', (_, action: Parameters<typeof store.dispatch>[0]) =>
		store.dispatch(action),
	)
	const unsubscribe = store.subscribe(() => ipcMain.emit('subscribe', store.getState()))
	return { unsubscribe }
}
