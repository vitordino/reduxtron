import type { AnyAction, Middleware } from '@reduxjs/toolkit'
import type { State } from '../../../shared/reducers'
import type { UIAction } from '../../../shared/reducers/ui'
import mainWindow from '../../main-window/main-window'
import tray from '../../tray/tray'

const mainWindowSideEffects = ({ ui }: Partial<State>) => {
	const mainShouldBeVisible = ui?.visible.includes('main-window')
	const isMainVisible = mainWindow.isVisible
	console.log({ ui, mainShouldBeVisible, isMainVisible })
	if (!mainShouldBeVisible && isMainVisible) return mainWindow.destroy()
	if (mainShouldBeVisible && !isMainVisible) return mainWindow.create()
}

const traySideEffects = ({ ui }: Partial<State>) => {
	const trayShouldBeVisible = ui?.visible.includes('tray')
	const isTrayVisible = tray.isVisible
	console.log({ ui, trayShouldBeVisible, isTrayVisible })
	if (!trayShouldBeVisible && isTrayVisible) return tray.destroy()
	if (trayShouldBeVisible && !isTrayVisible) return tray.render()
}

const UI_SIDE_EFFECT_MAP = {
	'main-window': mainWindowSideEffects,
	tray: traySideEffects,
}

const actionsToIntercept = ['UI:ADD_VISIBLE', 'UI:REMOVE_VISIBLE', 'UI:TOGGLE_VISIBLE']

const isUIAction = (action: AnyAction): action is UIAction =>
	actionsToIntercept.includes(action.type)

const uiMiddleware: Middleware = store => next => async action => {
	if (!isUIAction(action)) return next(action)
	// get state after action is dispatched
	const result = next(action)
	if (action.payload in UI_SIDE_EFFECT_MAP) {
		const key = action.payload as keyof typeof UI_SIDE_EFFECT_MAP
		UI_SIDE_EFFECT_MAP[key](store.getState())
	}
	return result
}

export default uiMiddleware
