import type { AnyAction, Middleware } from '@reduxjs/toolkit'
import type { State } from 'shared/reducers'
import type { UIAction } from 'shared/reducers/ui'
import mainWindow from 'main/main-window/main-window'
import tray from 'main/tray/tray'

const mainWindowSideEffects = ({ ui }: Partial<State>) => {
	if (!ui) return
	const mainShouldBeVisible = ui?.visible.includes('main-window')
	const isMainVisible = mainWindow.isVisible
	console.log('mainWindowSideEffects', { ui, mainShouldBeVisible, isMainVisible })
	if (!mainShouldBeVisible && isMainVisible) return mainWindow.destroy()
	if (mainShouldBeVisible && !isMainVisible) return mainWindow.create()
}

const traySideEffects = ({ ui }: Partial<State>) => {
	if (!ui) return
	const trayShouldBeVisible = ui?.visible.includes('tray')
	const isTrayVisible = tray.isVisible
	console.log('traySideEffects', { ui, trayShouldBeVisible, isTrayVisible })
	if (!trayShouldBeVisible && isTrayVisible) return tray.destroy()
	if (trayShouldBeVisible && !isTrayVisible) return tray.create()
}

const UI_SIDE_EFFECT_MAP = {
	'main-window': mainWindowSideEffects,
	tray: traySideEffects,
}

const actionsToIntercept = ['UI:ADD_VISIBLE', 'UI:REMOVE_VISIBLE', 'UI:TOGGLE_VISIBLE']

const isUIAction = (action: AnyAction): action is UIAction =>
	actionsToIntercept.includes(action.type)

const shouldIntercept = (payload?: string): payload is keyof typeof UI_SIDE_EFFECT_MAP => {
	if (!payload) return false
	return payload in UI_SIDE_EFFECT_MAP
}

const uiMiddleware: Middleware = store => next => async action => {
	if (!isUIAction(action) || !shouldIntercept(action.payload)) return next(action)
	// get state after action is dispatched
	const result = next(action)
	UI_SIDE_EFFECT_MAP[action.payload](store.getState())
	return result
}

export default uiMiddleware
