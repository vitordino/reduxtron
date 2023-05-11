import type { Reducer } from 'redux'
import { uid } from 'uid'

export type WindowPath =
	| 'index'
	| 'add-to-do/vanilla'
	| 'add-to-do/svelte'
	| 'add-to-do/vue'
	| 'edit-to-do/index'

export type WindowState = { path: WindowPath; props?: Record<string, unknown> }

export type settingsState = {
	tray: { visible: boolean }
	windows: Record<string, WindowState>
}

export const WINDOW_PATHS: WindowPath[] = [
	'index',
	'add-to-do/vanilla',
	'add-to-do/svelte',
	'add-to-do/vue',
]

type FilterKey = {
	<O extends Record<string, unknown>, K extends string>(object: O, keyToRemove: K): Omit<O, K>
}

const filterKey: FilterKey = (object, keyToRemove) => {
	const { [keyToRemove]: _, ...rest } = object
	return rest
}

const findWindowIdByPath = (state: settingsState, path: WindowPath) =>
	Object.entries(state.windows || {}).find(x => x[1].path === path)?.[0]

const getWindowIdsByPath = (state: settingsState, path: WindowPath) =>
	Object.entries(state.windows || {})
		.filter(x => x[1].path === path)
		.map(x => x[0])

const setTrayVisible = (state: settingsState, payload: boolean): settingsState => ({
	...state,
	tray: { ...state.tray, visible: payload },
})

const toggleTrayVisible = (state: settingsState): settingsState => ({
	...state,
	tray: { ...state.tray, visible: !state.tray.visible },
})

const createWindow = (state: settingsState, payload: WindowState): settingsState => {
	const id = uid()
	return { ...state, windows: { ...state.windows, [id]: payload } }
}

const destroyWindow = (state: settingsState, payload: string): settingsState => {
	return { ...state, windows: filterKey(state.windows, payload) }
}

const setWindowProps = (
	state: settingsState,
	payload: [key: string, props: WindowState['props']],
): settingsState => {
	const [key, props] = payload
	return {
		...state,
		windows: { ...state.windows, [key]: { ...state.windows[key], props } },
	}
}

const upsertWindowByPath = (state: settingsState, payload: WindowState): settingsState => {
	const currentId = findWindowIdByPath(state, payload.path)
	if (currentId) return setWindowProps(state, [currentId, payload])
	return createWindow(state, payload)
}

const upsertWindowByIdProp = (state: settingsState, payload: WindowState): settingsState => {
	const path = payload.path
	const id = payload.props?.id
	if (typeof id !== 'string') return createWindow(state, payload)
	const currentWindow = Object.entries(state.windows).find(
		([_k, v]) => v.path === path && v.props?.id === id,
	)
	if (!currentWindow) return createWindow(state, payload)
	return setWindowProps(state, [currentWindow[0], payload.props])
}

const destroyWindowsByPath = (state: settingsState, payload: WindowPath): settingsState => {
	const windows = Object.fromEntries(
		Object.entries(state.windows).filter(x => x[1].path !== payload),
	)
	return { ...state, windows }
}

const toggleWindowsByPath = (state: settingsState, payload: WindowState): settingsState => {
	const windowsIds = getWindowIdsByPath(state, payload.path)
	if (!windowsIds.length) return createWindow(state, payload)
	return destroyWindowsByPath(state, payload.path)
}

export type SettingsAction =
	| { type: 'SETTINGS:SET_TRAY_VISIBLE'; payload: boolean }
	| { type: 'SETTINGS:TOGGLE_TRAY_VISIBLE'; payload?: never }
	| { type: 'SETTINGS:CREATE_WINDOW'; payload: WindowState }
	| { type: 'SETTINGS:DESTROY_WINDOW'; payload: string }
	// same as above, but to be used on window class (skips middleware)
	| { type: 'SETTINGS:DESTROY_WINDOW_INTERNAL'; payload: string }
	| { type: 'SETTINGS:DESTROY_WINDOWS_BY_PATH'; payload: WindowPath }
	| { type: 'SETTINGS:UPSERT_WINDOW_BY_PATH'; payload: WindowState }
	| { type: 'SETTINGS:UPSERT_WINDOW_BY_ID_PROP'; payload: WindowState }
	| { type: 'SETTINGS:SET_WINDOW_PROPS'; payload: [key: string, props: WindowState['props']] }
	| { type: 'SETTINGS:TOGGLE_WINDOWS_BY_PATH'; payload: WindowState }

export const settingsReducer: Reducer<settingsState, SettingsAction> = (
	state = { windows: {}, tray: { visible: false } },
	action,
) => {
	switch (action.type) {
		case 'SETTINGS:CREATE_WINDOW':
			return createWindow(state, action.payload)
		case 'SETTINGS:DESTROY_WINDOW':
		case 'SETTINGS:DESTROY_WINDOW_INTERNAL':
			return destroyWindow(state, action.payload)
		case 'SETTINGS:DESTROY_WINDOWS_BY_PATH':
			return destroyWindowsByPath(state, action.payload)
		case 'SETTINGS:UPSERT_WINDOW_BY_PATH':
			return upsertWindowByPath(state, action.payload)
		case 'SETTINGS:UPSERT_WINDOW_BY_ID_PROP':
			return upsertWindowByIdProp(state, action.payload)
		case 'SETTINGS:SET_WINDOW_PROPS':
			return setWindowProps(state, action.payload)
		case 'SETTINGS:TOGGLE_WINDOWS_BY_PATH':
			return toggleWindowsByPath(state, action.payload)
		case 'SETTINGS:SET_TRAY_VISIBLE':
			return setTrayVisible(state, action.payload)
		case 'SETTINGS:TOGGLE_TRAY_VISIBLE':
			return toggleTrayVisible(state)
		default:
			return state
	}
}
