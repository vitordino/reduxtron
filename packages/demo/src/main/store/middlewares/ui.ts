import type { Middleware } from 'src/shared/reducers'
import { tray } from 'src/main/tray/tray'
import { windowManager } from 'src/main/window/window-manager'
import { WindowPath, WindowState } from 'src/shared/reducers/settings'

const difference = <T>(a: T[], b: T[]): T[] => a.filter(x => !b.includes(x))

const traySideEffects: Middleware = store => next => async action => {
	const result = next(action)
	const settings = store.getState()?.settings
	if (!settings) return result
	const trayShouldBeVisible = settings.tray.visible
	const isTrayVisible = tray.isVisible
	// eslint-disable-next-line no-console
	console.log({ trayShouldBeVisible, isTrayVisible })
	if (!trayShouldBeVisible && isTrayVisible) tray.destroy()
	if (trayShouldBeVisible && !isTrayVisible) tray.create()
	return result
}

const getWindowIdByPath = (windows: Record<string, WindowState>, path: WindowPath) =>
	Object.entries(windows).find(([_k, v]) => v.path === path)?.[0]

const getWindowIdByIdProp = (
	windows: Record<string, WindowState>,
	path: WindowPath,
	id?: unknown,
) => {
	if (!id || typeof id !== 'string') return null
	return Object.entries(windows).find(([_k, v]) => v.path === path && v.props?.id === id)?.[0]
}

const windowSideEffects: Middleware = store => next => async action => {
	const result = next(action)
	const windows = store.getState()?.settings?.windows
	if (!windows) return next(action)
	const windowIds = Object.keys(windows)
	const visibleWindowIds = windowManager.visibleWindows
	const shouldCreateIds = difference(windowIds, visibleWindowIds)
	const shouldRemoveIds = difference(visibleWindowIds, windowIds)
	// eslint-disable-next-line no-console
	console.log({ windowIds, visibleWindowIds, shouldCreateIds, shouldRemoveIds })
	const createWindow = (id: string) => windowManager.updateWindow(id, windows[id].path)
	shouldCreateIds.forEach(createWindow)
	shouldRemoveIds.forEach(windowManager.removeWindow)
	if (action.type === 'SETTINGS:UPSERT_WINDOW_BY_ID_PROP') {
		const windowId = getWindowIdByIdProp(windows, action.payload.path, action.payload?.props?.id)
		if (windowId) windowManager.focusWindow(windowId)
	}
	if (action.type === 'SETTINGS:UPSERT_WINDOW_BY_PATH') {
		const windowId = getWindowIdByPath(windows, action.payload.path)
		if (windowId) windowManager.focusWindow(windowId)
	}
	return result
}

export const uiMiddleware: Middleware = store => next => async action => {
	switch (action.type) {
		case 'SETTINGS:SET_TRAY_VISIBLE':
		case 'SETTINGS:TOGGLE_TRAY_VISIBLE':
			return traySideEffects(store)(next)(action)

		case 'SETTINGS:CREATE_WINDOW':
		case 'SETTINGS:UPSERT_WINDOW_BY_PATH':
		case 'SETTINGS:SET_WINDOW_PROPS':
		case 'SETTINGS:TOGGLE_WINDOWS_BY_PATH':
		case 'SETTINGS:DESTROY_WINDOWS_BY_PATH':
		case 'SETTINGS:UPSERT_WINDOW_BY_ID_PROP':
		case 'SETTINGS:DESTROY_WINDOW':
			return windowSideEffects(store)(next)(action)

		default:
			return next(action)
	}
}
