import { State } from '../shared/reducers'
import mainWindow from './main-window/main-window'
import tray from './tray/tray'

const mainWindowSideEffects = ({ ui }: State) => {
	const mainShouldBeVisible = ui?.visible.includes('main-window')
	const isMainVisible = mainWindow.isVisible
	console.log({ ui, mainShouldBeVisible, isMainVisible })
	if (!mainShouldBeVisible && isMainVisible) return mainWindow.destroy()
	if (mainShouldBeVisible && !isMainVisible) return mainWindow.create()
}

const traySideEffects = ({ ui }: State) => {
	const trayShouldBeVisible = ui?.visible.includes('tray')
	const isTrayVisible = tray.isVisible
	console.log({ ui, trayShouldBeVisible, isTrayVisible })
	if (!trayShouldBeVisible && isTrayVisible) return tray.destroy()
	if (trayShouldBeVisible && !isTrayVisible) return tray.render()
}

const uiSideEffects = (state: State) => {
	mainWindowSideEffects(state)
	traySideEffects(state)
}

export default uiSideEffects
