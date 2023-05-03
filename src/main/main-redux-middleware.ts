/* eslint global-require: off */
// utility to plug redux functions onto main ipc
// this adds the subscribe and dispatch messages
import { IpcMain } from 'electron'
import type { Store } from 'redux'
import {
	mainWindow,
	addTodoVanillaWindow,
	addTodoSvelteWindow,
	addTodoVueWindow,
} from 'main/window/window'
import { tray } from 'main/tray/tray'

type MainReduxMiddleware = {
	<S extends Store>(ipcMain: IpcMain, store: S): { unsubscribe: () => void }
}

export const mainReduxMiddleware: MainReduxMiddleware = (ipcMain, store) => {
	mainWindow.setDispatch(store.dispatch)
	addTodoVanillaWindow.setDispatch(store.dispatch)
	addTodoSvelteWindow.setDispatch(store.dispatch)
	addTodoVueWindow.setDispatch(store.dispatch)
	tray.setDispatch(store.dispatch)
	tray.setState(store.getState())

	ipcMain.on('dispatch', (_, action: Parameters<typeof store.dispatch>[0]) =>
		store.dispatch(action),
	)

	const unsubscribe = store.subscribe(() => {
		const state = store.getState()
		tray.setState(state)
		ipcMain.emit('subscribe', state)
	})

	return { unsubscribe }
}
