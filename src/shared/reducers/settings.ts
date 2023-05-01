import type { Reducer } from 'redux'

export type TrayId = 'tray'
export type WindowId = 'index' | 'add-to-do/vanilla' | 'add-to-do/svelte'
export type VisibleId = TrayId | WindowId
export type settingsState = { visible: VisibleId[] }

export const WINDOW_IDS: WindowId[] = ['index', 'add-to-do/vanilla', 'add-to-do/svelte']

const addVisible = (state: settingsState, payload: VisibleId) => {
	if (state.visible.includes(payload)) return state
	return { ...state, visible: [...state.visible, payload] }
}

const removeVisible = (state: settingsState, payload: VisibleId) => ({
	...state,
	visible: state.visible.filter(x => x !== payload),
})

const toggleVisible = (state: settingsState, payload: VisibleId) => {
	if (state.visible.includes(payload)) return removeVisible(state, payload)
	return addVisible(state, payload)
}

const settingsActions = {
	'SETTINGS:ADD_VISIBLE': addVisible,
	'SETTINGS:REMOVE_VISIBLE': removeVisible,
	'SETTINGS:TOGGLE_VISIBLE': toggleVisible,
} as const

export type SettingsAction =
	| { type: 'SETTINGS:ADD_VISIBLE'; payload: VisibleId }
	| { type: 'SETTINGS:REMOVE_VISIBLE'; payload: VisibleId }
	| { type: 'SETTINGS:TOGGLE_VISIBLE'; payload: VisibleId }

export const settingsReducer: Reducer<settingsState, SettingsAction> = (
	state = { visible: [] },
	// @ts-expect-error empty action type
	action = { type: '' },
) => {
	if (!action?.type) return state
	if (!(action.type in settingsActions)) return state
	return settingsActions[action.type](state, action.payload)
}
