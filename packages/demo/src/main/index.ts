/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import { app, ipcMain } from 'electron'
import { mainReduxBridge } from 'reduxtron/main'
import { store } from 'src/main/store'
import { windowManager } from 'src/main/window/window-manager'
import { tray } from 'src/main/tray/tray'

const { unsubscribe } = mainReduxBridge(ipcMain, store)

tray.setDispatch(store.dispatch)
tray.setState(store.getState())
store.subscribe(() => tray.setState(store.getState()))
windowManager.setDispatch(store.dispatch)

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
			store.dispatch({ type: 'SETTINGS:UPSERT_WINDOW_BY_PATH', payload: { path: 'index' } })
		})

		app.on('quit', unsubscribe)

		await store.dispatch({ type: 'GET_STATE_FROM_PERSISTANCE_MIDDLEWARE' })
		await store.dispatch({ type: 'SETTINGS:UPSERT_WINDOW_BY_PATH', payload: { path: 'index' } })
		await store.dispatch({ type: 'SETTINGS:SET_TRAY_VISIBLE', payload: true })
	})
	// eslint-disable-next-line no-console
	.catch(console.error)
