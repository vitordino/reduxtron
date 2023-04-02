import { Menu, Tray, nativeImage } from 'electron'
import type { State } from '../store'
import TrayCounter from './Counter'
import TrayToDo from './ToDo'
import TrayUIControls from './UIControls'

const trayIcon = nativeImage.createFromPath('assets/tray.png').resize({
	width: 16,
	height: 16,
})

class SystemTray {
	constructor() {
		this.instance = null
		this.isListening = false
	}

	private instance: Tray | null

	private state?: State

	private isListening: boolean

	private update = () => {
		console.log('tray update')
		if (!this.isListening) return
		console.log('tray update happening')
		if (!this.instance) this.instance = new Tray(trayIcon)
		if (!this.state) return
		const contextMenu = Menu.buildFromTemplate([
			TrayCounter(this.state),
			TrayToDo(this.state),
			TrayUIControls(this.state),
		])

		this.instance.setToolTip('This text comes from tray module.')

		// Need to call to set Context Menu.
		this.instance.setContextMenu(contextMenu)
	}

	public render = () => {
		console.log('tray render')
		this.isListening = true
		this.update()
	}

	public setState = (state: State) => {
		if (!this.isListening) return
		this.state = state
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

export default new SystemTray()
