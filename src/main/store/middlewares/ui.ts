import type { AnyAction } from 'redux'
import type { State, Middleware } from 'shared/reducers'
import type { SettingsAction } from 'shared/reducers/settings'
import mainWindow from 'main/main-window/main-window'
import tray from 'main/tray/tray'

const mainWindowSideEffects = ({ settings }: Partial<State>) => {
	if (!settings) return
	const mainShouldBeVisible = settings?.visible.includes('main-window')
	const isMainVisible = mainWindow.isVisible
	console.log('mainWindowSideEffects', { ui: settings, mainShouldBeVisible, isMainVisible })
	if (!mainShouldBeVisible && isMainVisible) return mainWindow.destroy()
	if (mainShouldBeVisible && !isMainVisible) return mainWindow.create()
}

const traySideEffects = ({ settings }: Partial<State>) => {
	if (!settings) return
	const trayShouldBeVisible = settings?.visible.includes('tray')
	const isTrayVisible = tray.isVisible
	console.log('traySideEffects', { ui: settings, trayShouldBeVisible, isTrayVisible })
	if (!trayShouldBeVisible && isTrayVisible) return tray.destroy()
	if (trayShouldBeVisible && !isTrayVisible) return tray.create()
}

const UI_SIDE_EFFECT_MAP = {
	'main-window': mainWindowSideEffects,
	tray: traySideEffects,
}

const actionsToIntercept = [
	'SETTINGS:ADD_VISIBLE',
	'SETTINGS:REMOVE_VISIBLE',
	'SETTINGS:TOGGLE_VISIBLE',
]

const isUIAction = (action: AnyAction): action is SettingsAction =>
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
