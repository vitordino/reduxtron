import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { BrowserWindow, BrowserWindowConstructorOptions, app, ipcMain, shell } from 'electron'

import type { Dispatch } from 'shared/reducers'
import { MenuBuilder } from 'main/window/window-native-menu'
import { windowDebug } from 'main/window/window-debug'

type WindowId = 'index' | 'todo-add'

const icon = join(__dirname, '../../resources', 'images', 'icon.png')

const DEFAULT_WINDOW_OPTIONS: BrowserWindowConstructorOptions = {
	show: false,
	icon,
	fullscreen: false,
	fullscreenable: false,
	webPreferences: {
		scrollBounce: true,
		sandbox: true,
		nodeIntegration: false,
		preload: join(__dirname, '../preload/index.js'),
	},
}

const BROWSER_WINDOW_OPTIONS_BY_WINDOW_ID: Record<WindowId, BrowserWindowConstructorOptions> = {
	index: {
		...DEFAULT_WINDOW_OPTIONS,
		title: 'redux-electron',
		width: 1024,
		height: 728,
		titleBarStyle: 'hiddenInset',
		titleBarOverlay: true,
		vibrancy: 'sidebar',
	},
	'todo-add': {
		...DEFAULT_WINDOW_OPTIONS,
		title: 'add todo',
		show: false,
		width: 256,
		height: 128,
		resizable: false,
	},
}

export class Window {
	constructor(id: WindowId) {
		this.id = id
		this.instance = null
		ipcMain.on('subscribe', async (state: unknown) => {
			if (this.instance?.isDestroyed()) return
			this.instance?.webContents?.send('subscribe', state)
		})
	}

	public id: WindowId
	private instance: BrowserWindow | null

	private dispatch?: Dispatch

	public create = async () => {
		if (this.instance) return
		this.instance = new BrowserWindow(BROWSER_WINDOW_OPTIONS_BY_WINDOW_ID[this.id])

		// HMR for renderer base on electron-vite cli.
		// Load the remote URL for development or the local html file for production.
		if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
			this.instance.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/' + this.id + '.html')
		} else {
			this.instance.loadFile(join(__dirname, '../renderer', this.id + '.html'))
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

		const menuBuilder = new MenuBuilder(this.instance)
		menuBuilder.buildMenu()

		// Open urls in the user's browser
		this.instance.webContents.setWindowOpenHandler(({ url }) => {
			if (!url.startsWith('http')) return { action: 'deny' }
			shell.openExternal(url)
			return { action: 'deny' }
		})

		this.instance.webContents.on('before-input-event', (event, { control, meta, key }) => {
			if (process.platform === 'darwin' && meta && key === 'w') {
				event.preventDefault()
				return this.destroy()
			}
			if (control && key === 'w') {
				event.preventDefault()
				return this.destroy()
			}
		})

		// register dev-tools + source-maps
		windowDebug()
	}

	public destroy = () => {
		this.instance?.destroy()
		this.instance = null
		this?.dispatch?.({ type: 'SETTINGS:REMOVE_VISIBLE', payload: this.id })
	}

	public focus = () => {
		app.focus({ steal: true })
		this.instance?.focus()
	}

	public setDispatch = (dispatch: Dispatch) => {
		this.dispatch = dispatch
	}

	public get isVisible() {
		return !!this.instance
	}
}

export const mainWindow = new Window('index')
export const todoAddWindow = new Window('todo-add')
