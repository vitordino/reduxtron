import { Menu, Tray, nativeImage } from 'electron'
import store from '../store'
import TrayCounter from './Counter'
import TrayDog from './Dog'
import TrayToDo from './ToDo'
import TrayUIControls from './UIControls'

const trayIcon = nativeImage.createFromPath('assets/tray.png').resize({
	width: 16,
	height: 16,
})

class SystemTray {
	constructor() {
		this.instance = null
		this.unsubscribe = null
		this.isListening = false
	}

	private instance: Tray | null

	private unsubscribe: (() => void) | null

	private isListening: boolean

	private update = () => {
		console.log('tray update')
		if (!this.isListening) return
		console.log('tray update happening')
		if (!this.instance) this.instance = new Tray(trayIcon)
		const state = store.getState()
		const contextMenu = Menu.buildFromTemplate([
			TrayCounter(state),
			TrayToDo(state),
			TrayUIControls(state),
			TrayDog(state),
		])

		this.instance.setToolTip('This text comes from tray module.')

		// Need to call to set Context Menu.
		this.instance.setContextMenu(contextMenu)
	}

	public render = () => {
		console.log('tray render')
		this.isListening = true
		this.unsubscribe = store.subscribe(this.update)
		this.update()
	}

	public destroy = () => {
		console.log('tray destroy')
		this.isListening = false
		this.unsubscribe?.()
		this.instance?.destroy()
		this.instance = null
	}

	public get isVisible() {
		return !!this.instance
	}
}

export default new SystemTray()
