import path from 'path'
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import type { Dispatch } from 'shared/reducers'
import { resolveHtmlPath, getAssetPath } from 'main/utils'
import MenuBuilder from 'main/main-window/main-window-native-menu'
import mainWindowDebug from 'main/main-window/main-window-debug'

class MainWindow {
	constructor() {
		this.instance = null
		ipcMain.on('subscribe', async (state: unknown) => {
			if (this.instance?.isDestroyed()) return
			this.instance?.webContents?.send('subscribe', state)
		})
	}

	private instance: BrowserWindow | null

	private dispatch?: Dispatch

	public create = async () => {
		if (this.instance) return

		this.instance = new BrowserWindow({
			show: false,
			width: 1024,
			height: 728,
			icon: getAssetPath('icon.png'),

			webPreferences: {
				sandbox: false,
				nodeIntegration: true,
				preload: app.isPackaged
					? path.join(__dirname, '../preload.js')
					: path.join(__dirname, '../../../.erb/dll/preload.js'),
			},
		})

		this.instance.loadURL(resolveHtmlPath('index.html'))

		this.instance.on('ready-to-show', () => {
			if (!this.instance) {
				throw new Error('"this.instance" is not defined')
			}
			if (process.env.START_MINIMIZED) {
				this.instance.minimize()
			} else {
				this.instance.show()
			}
		})

		this.instance.on('closed', () => {
			this?.dispatch?.({ type: 'UI:REMOVE_VISIBLE', payload: 'main-window' })
		})

		const menuBuilder = new MenuBuilder(this.instance)
		menuBuilder.buildMenu()

		// Open urls in the user's browser
		this.instance.webContents.setWindowOpenHandler(({ url }) => {
			shell.openExternal(url)
			return { action: 'deny' }
		})

		// register dev-tools + source-maps
		// mainWindowDebug()
	}

	public destroy = () => {
		this.instance?.destroy()
		this.instance = null
	}

	public setDispatch = (dispatch: Dispatch) => {
		this.dispatch = dispatch
	}

	public get isVisible() {
		return !!this.instance
	}
}

export default new MainWindow()
