import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { BrowserWindow, ipcMain, shell } from 'electron'

import type { Dispatch } from 'shared/reducers'
import { MenuBuilder } from 'main/window/window-native-menu'
import { windowDebug } from 'main/window/window-debug'

console.log({
	ENV_ENV: process.env,
})

export class Window {
	constructor(id: string, file: string) {
		this.id = id
		this.file = file
		this.instance = null
		ipcMain.on('subscribe', async (state: unknown) => {
			if (this.instance?.isDestroyed()) return
			this.instance?.webContents?.send('subscribe', state)
		})
	}

	public id: string
	public file: string
	private instance: BrowserWindow | null

	private dispatch?: Dispatch

	public create = async () => {
		const icon = join(__dirname, '../../resources', 'images', 'icon.png')
		console.log({ __dirname, icon })
		if (this.instance) return

		this.instance = new BrowserWindow({
			title: 'redux-electron',
			show: false,
			width: 1024,
			height: 728,
			fullscreen: false,
			fullscreenable: false,
			titleBarStyle: 'hiddenInset',
			titleBarOverlay: true,
			vibrancy: 'sidebar',
			icon,
			webPreferences: {
				scrollBounce: true,
				sandbox: true,
				nodeIntegration: false,
				preload: join(__dirname, '../preload/index.js'),
			},
		})

		// HMR for renderer base on electron-vite cli.
		// Load the remote URL for development or the local html file for production.
		if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
			this.instance.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/' + this.file)
		} else {
			this.instance.loadFile(join(__dirname, '../renderer', this.file))
		}

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
			this?.dispatch?.({ type: 'SETTINGS:REMOVE_VISIBLE', payload: this.id })
		})

		const menuBuilder = new MenuBuilder(this.instance)
		menuBuilder.buildMenu()

		// Open urls in the user's browser
		this.instance.webContents.setWindowOpenHandler(({ url }) => {
			if (!url.startsWith('http')) return { action: 'deny' }
			shell.openExternal(url)
			return { action: 'deny' }
		})

		// register dev-tools + source-maps
		windowDebug()
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

export const mainWindow = new Window('main-window', 'index.html')
