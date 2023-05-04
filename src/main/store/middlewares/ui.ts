import type { State, Middleware } from 'shared/reducers'
import { tray } from 'main/tray/tray'
import { windowManager } from 'main/window/window-manager'

const traySideEffects = ({ settings }: Partial<State>) => {
	if (!settings) return
	const trayShouldBeVisible = settings.tray.visible
	const isTrayVisible = tray.isVisible
	console.log({ trayShouldBeVisible, isTrayVisible })
	if (!trayShouldBeVisible && isTrayVisible) return tray.destroy()
	if (trayShouldBeVisible && !isTrayVisible) return tray.create()
}

const windowSideEffects = ({ settings }: Partial<State>) => {
	const windows = settings?.windows
	if (!windows) return
	const windowIds = Object.keys(windows)
	const visibleWindowIds = windowManager.visibleWindows
	const shouldCreateIds = difference(windowIds, visibleWindowIds)
	const shouldRemoveIds = difference(visibleWindowIds, windowIds)
	console.log({ windowIds, visibleWindowIds, shouldCreateIds, shouldRemoveIds })

	const createWindow = (id: string) => windowManager.updateWindow(id, windows[id].path)
	shouldCreateIds.forEach(createWindow)
	shouldRemoveIds.forEach(windowManager.removeWindow)
}

const combinedSideEffects = (state: Partial<State>): void => {
	windowSideEffects(state)
	traySideEffects(state)
}

const difference = <T>(a: T[], b: T[]): T[] => a.filter(x => !b.includes(x))

export const uiMiddleware: Middleware = store => next => async action => {
	// get state after action is dispatched
	const result = next(action)
	switch (action.type) {
		case 'SETTINGS:INIT':
			combinedSideEffects(store.getState())
			return result
		case 'SETTINGS:SET_TRAY_VISIBLE':
		case 'SETTINGS:TOGGLE_TRAY_VISIBLE':
			traySideEffects(store.getState())
			return result
		case 'SETTINGS:CREATE_WINDOW':
		case 'SETTINGS:UPSERT_WINDOW_BY_PATH':
		case 'SETTINGS:SET_WINDOW_PROPS':
		case 'SETTINGS:TOGGLE_WINDOWS_BY_PATH':
		case 'SETTINGS:DESTROY_WINDOWS_BY_PATH':
		case 'SETTINGS:UPSERT_WINDOW_BY_ID_PROP':
		case 'SETTINGS:DESTROY_WINDOW': {
			windowSideEffects(store.getState())
			return result
		}
		default:
			return result
	}
}
