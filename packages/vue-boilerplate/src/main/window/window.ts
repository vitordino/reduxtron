import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { BrowserWindow, BrowserWindowConstructorOptions, app, ipcMain, shell } from 'electron'

import { MenuBuilder } from 'main/window/window-native-menu'
import { windowDebug } from 'main/window/window-debug'

const icon = join(__dirname, '../../resources', 'images', 'icon.png')

const windowOptions: BrowserWindowConstructorOptions = {
	show: false,
	icon,
	title: 'reduxtron',
	width: 256,
	height: 256,
	webPreferences: {
		scrollBounce: true,
		sandbox: true,
		nodeIntegration: false,
		preload: join(__dirname, '../preload/index.js'),
	},
}

export class Window {
	constructor(path = 'index') {
		this.path = path
		this.instance = null
		ipcMain.on('subscribe', async (state: unknown) => {
			if (this.instance?.isDestroyed()) return
			this.instance?.webContents?.send('subscribe', state)
		})
	}

	public path: string
	private instance: BrowserWindow | null

	public create = async () => {
		if (this.instance) return
		this.instance = new BrowserWindow(windowOptions)

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
		this.instance?.destroy()
		this.instance = null
	}

	public focus = () => {
		app.focus({ steal: true })
		this.instance?.focus()
	}

	public get isVisible() {
		return !!this.instance
	}
}
