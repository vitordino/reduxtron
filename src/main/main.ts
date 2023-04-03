/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import { app, ipcMain } from 'electron'
import store from './store'
import mainReduxMiddleware from './main-redux-middleware'

const { unsubscribe } = mainReduxMiddleware(ipcMain, store)

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
	// Respect the OSX convention of having the application in memory even
	// after all windows have been closed
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app
	.whenReady()
	.then(async () => {
		app.on('activate', () => {
			// On macOS it's common to re-create a window in the app when the
			// dock icon is clicked and there are no other windows open.
			store.dispatch({ type: 'UI:ADD_VISIBLE', payload: 'main-window' })
		})

		app.on('quit', unsubscribe)

		await store.dispatch({ type: 'GET_STATE_FROM_PERSISTANCE_MIDDLEWARE' })
		store.dispatch({ type: 'UI:ADD_VISIBLE', payload: 'main-window' })
		store.dispatch({ type: 'UI:ADD_VISIBLE', payload: 'tray' })
	})
	.catch(console.log)
