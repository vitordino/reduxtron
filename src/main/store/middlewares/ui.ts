import type { AnyAction } from 'redux'
import type { State, Middleware } from 'shared/reducers'
import type { SettingsAction, WindowId, VisibleId } from 'shared/reducers/settings'
import { mainWindow, todoAddWindow, Window } from 'main/window/window'
import { tray } from 'main/tray/tray'

const createWindowSideEffects =
	(id: WindowId, instance: Window) =>
	({ settings }: Partial<State>) => {
		if (!settings?.visible) return
		const { visible } = settings
		const shouldBeVisible = visible.includes(id)
		const isVisible = instance.isVisible
		if (!shouldBeVisible && isVisible) return instance.destroy()
		if (shouldBeVisible && !isVisible) return instance.create()
		if (shouldBeVisible && isVisible) return instance.focus()
	}

const mainWindowSideEffects = createWindowSideEffects('index', mainWindow)
const todoAddWindowSideEffects = createWindowSideEffects('todo-add', todoAddWindow)

const traySideEffects = ({ settings }: Partial<State>) => {
	if (!settings) return
	const trayShouldBeVisible = settings?.visible.includes('tray')
	const isTrayVisible = tray.isVisible
	if (!trayShouldBeVisible && isTrayVisible) return tray.destroy()
	if (trayShouldBeVisible && !isTrayVisible) return tray.create()
}

const UI_SIDE_EFFECT_MAP: Record<VisibleId, (state: Partial<State>) => void> = {
	index: mainWindowSideEffects,
	tray: traySideEffects,
	'todo-add': todoAddWindowSideEffects,
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

export const uiMiddleware: Middleware = store => next => async action => {
	if (!isUIAction(action) || !shouldIntercept(action.payload)) return next(action)
	// get state after action is dispatched
	const result = next(action)
	UI_SIDE_EFFECT_MAP[action.payload](store.getState())
	return result
}
