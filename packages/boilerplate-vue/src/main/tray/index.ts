import { Menu, Tray, app, nativeImage } from 'electron'

import type { Dispatch, State } from 'src/shared/reducers'
import image from 'src/main/tray/tray.png'
import { TrayCounter } from 'src/main/tray/Counter'

const trayIcon = nativeImage.createFromDataURL(image).resize({
	width: 18,
	height: 18
})

class SystemTray {
	constructor() {
		this.instance = null
		this.isListening = false
	}

	private instance: Tray | null

	private state?: State

	private dispatch?: Dispatch

	private isListening: boolean

	private update = () => {
		if (!this.isListening) return
		if (!this.instance) this.instance = new Tray(trayIcon)
		if (!this.state || !this.dispatch) return
		const contextMenu = Menu.buildFromTemplate([
			...TrayCounter(this.state, this.dispatch),
			{ type: 'separator' },
			{ label: 'quit', click: app.quit }
		])

		this.instance.setToolTip('This text comes from tray module.')

		// Need to call to set Context Menu.
		this.instance.setContextMenu(contextMenu)
	}

	public create = () => {
		this.isListening = true
		this.update()
	}

	public setState = (state: State) => {
		this.state = state
		this.update()
	}

	public setDispatch = (dispatch: Dispatch) => {
		this.dispatch = dispatch
		this.update()
	}

	public destroy = () => {
		this.isListening = false
		this.instance?.destroy()
		this.instance = null
	}

	public get isVisible() {
		return !!this.instance
	}
}

export const tray = new SystemTray()
