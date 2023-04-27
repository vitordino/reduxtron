import { Menu, Tray, nativeImage } from 'electron'
import type { Dispatch, State } from 'shared/reducers'
import { TrayDog } from 'main/tray/Dog'
import { TrayFinder } from 'main/tray/Finder'
import { TrayToDo } from 'main/tray/ToDo'
import { TraySettingsMenu } from 'main/tray/TraySettingsMenu'
import image from 'main/tray/tray.png'

const trayIcon = nativeImage.createFromDataURL(image).resize({
	width: 18,
	height: 18,
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
		console.log('tray update')
		if (!this.isListening) return
		console.log('tray update happening')
		if (!this.instance) this.instance = new Tray(trayIcon)
		if (!this.state || !this.dispatch) return
		const contextMenu = Menu.buildFromTemplate([
			TrayToDo(this.state, this.dispatch),
			TraySettingsMenu(this.state, this.dispatch),
			TrayDog(this.state, this.dispatch),
			TrayFinder(this.state, this.dispatch),
		])

		this.instance.setToolTip('This text comes from tray module.')

		// Need to call to set Context Menu.
		this.instance.setContextMenu(contextMenu)
	}

	public create = () => {
		console.log('tray create')
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
		console.log('tray destroy')
		this.isListening = false
		this.instance?.destroy()
		this.instance = null
	}

	public get isVisible() {
		return !!this.instance
	}
}

export const tray = new SystemTray()
