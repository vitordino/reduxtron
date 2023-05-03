import type { AnyAction } from 'redux'
import type { State, Middleware } from 'shared/reducers'
import type { SettingsAction, WindowId, VisibleId } from 'shared/reducers/settings'
import {
	mainWindow,
	addTodoVanillaWindow,
	addTodoSvelteWindow,
	Window,
	addTodoVueWindow,
} from 'main/window/window'
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
const addTodoVanillaWindowSideEffects = createWindowSideEffects(
	'add-to-do/vanilla',
	addTodoVanillaWindow,
)
const addTodoSvelteWindowSideEffects = createWindowSideEffects(
	'add-to-do/svelte',
	addTodoSvelteWindow,
)
const addTodoVueWindowSideEffects = createWindowSideEffects('add-to-do/vue', addTodoVueWindow)

const traySideEffects = ({ settings }: Partial<State>) => {
	if (!settings) return
	const trayShouldBeVisible = settings?.visible.includes('tray')
	const isTrayVisible = tray.isVisible
	if (!trayShouldBeVisible && isTrayVisible) return tray.destroy()
	if (trayShouldBeVisible && !isTrayVisible) return tray.create()
}

const combinedSideEffects = (state: Partial<State>): void => {
	mainWindowSideEffects(state)
	traySideEffects(state)
	addTodoVanillaWindowSideEffects(state)
	addTodoSvelteWindowSideEffects(state)
}

const UI_SIDE_EFFECT_MAP: Record<VisibleId | 'init', (state: Partial<State>) => void> = {
	index: mainWindowSideEffects,
	tray: traySideEffects,
	'add-to-do/vanilla': addTodoVanillaWindowSideEffects,
	'add-to-do/svelte': addTodoSvelteWindowSideEffects,
	'add-to-do/vue': addTodoVueWindowSideEffects,
	init: combinedSideEffects,
}

const actionsToIntercept = [
	'SETTINGS:INIT',
	'SETTINGS:ADD_VISIBLE',
	'SETTINGS:REMOVE_VISIBLE',
	'SETTINGS:TOGGLE_VISIBLE',
]

const isUIAction = (action: AnyAction): action is SettingsAction =>
	actionsToIntercept.includes(action.type)

export const uiMiddleware: Middleware = store => next => async action => {
	if (!isUIAction(action)) return next(action)
	// get state after action is dispatched
	const result = next(action)
	UI_SIDE_EFFECT_MAP[action.payload || 'init'](store.getState())
	return result
}
