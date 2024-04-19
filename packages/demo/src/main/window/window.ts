import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { BrowserWindow, BrowserWindowConstructorOptions, app, ipcMain, shell } from 'electron'

import type { Dispatch } from 'src/shared/reducers'
import { WindowPath } from 'src/shared/reducers/settings'
import { MenuBuilder } from 'src/main/window/window-native-menu'
import { windowDebug } from 'src/main/window/window-debug'

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

const ADD_TO_DO_OPTIONS = {
	...DEFAULT_WINDOW_OPTIONS,
	title: 'add todo',
	show: false,
	width: 256,
	height: 128,
	resizable: false,
}

const BROWSER_WINDOW_OPTIONS_BY_WINDOW_PATH: Record<WindowPath, BrowserWindowConstructorOptions> = {
	index: {
		...DEFAULT_WINDOW_OPTIONS,
		title: 'reduxtron',
		width: 1024,
		height: 728,
		titleBarStyle: 'hiddenInset',
		titleBarOverlay: true,
		vibrancy: 'sidebar',
	},
	'edit-to-do/index': { ...DEFAULT_WINDOW_OPTIONS, width: 224, height: 72 },
	'add-to-do/vanilla': ADD_TO_DO_OPTIONS,
	'add-to-do/svelte': ADD_TO_DO_OPTIONS,
	'add-to-do/vue': ADD_TO_DO_OPTIONS,
}

export class Window {
	constructor(id: string, path: WindowPath) {
		this.id = id
		this.path = path
		this.instance = null
		ipcMain.on('subscribe', async (state: unknown) => {
			if (this.instance?.isDestroyed()) return
			this.instance?.webContents?.send('subscribe', state)
		})
	}

	public id: string
	public path: WindowPath
	private instance: BrowserWindow | null

	private dispatch?: Dispatch

	public create = async () => {
		if (this.instance) return
		this.instance = new BrowserWindow(BROWSER_WINDOW_OPTIONS_BY_WINDOW_PATH[this.path])

		// HMR for renderer base on electron-vite cli.
		// Load the remote URL for development or the local html file for production.
		if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
			this.instance.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/' + this.path + '.html')
		} else {
			this.instance.loadFile(join(__dirname, '../renderer', this.path + '.html'))
		}

		this.instance.on('ready-to-show', async () => {
			if (!this.instance) {
				throw new Error('"this.instance" is not defined')
			}
			this.instance.webContents.executeJavaScript(`globalThis.windowId = '${this.id}'`)
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

		this.instance.webContents.on('before-input-event', (_, { control, meta, key }) => {
			if (!this.instance) return
			if (process.platform === 'darwin' && meta && key === 'w') return this.destroy()
			if (control && key === 'w') return this.destroy()
		})

		this.instance.on('close', this.destroy)
		this.instance.on('closed', this.destroy)
		// register dev-tools + source-maps
		windowDebug()
	}

	public destroy = () => {
		this.dispatch?.({ type: 'SETTINGS:DESTROY_WINDOW_INTERNAL', payload: this.id })
		this.instance?.destroy()
		this.instance = null
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
