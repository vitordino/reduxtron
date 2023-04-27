import { Reducer } from 'redux'

export type settingsState = { visible: string[] }

const addVisible = (state: settingsState, payload: string) => {
	if (state.visible.includes(payload)) return state
	return { ...state, visible: [...state.visible, payload] }
}

const removeVisible = (state: settingsState, payload: string) => ({
	...state,
	visible: state.visible.filter(x => x !== payload),
})

const toggleVisible = (state: settingsState, payload: string) => {
	if (state.visible.includes(payload)) return removeVisible(state, payload)
	return addVisible(state, payload)
}

const settingsActions = {
	'SETTINGS:ADD_VISIBLE': addVisible,
	'SETTINGS:REMOVE_VISIBLE': removeVisible,
	'SETTINGS:TOGGLE_VISIBLE': toggleVisible,
} as const

export type SettingsAction =
	| { type: 'SETTINGS:ADD_VISIBLE'; payload: string }
	| { type: 'SETTINGS:REMOVE_VISIBLE'; payload: string }
	| { type: 'SETTINGS:TOGGLE_VISIBLE'; payload: string }

const settingsReducer: Reducer<settingsState, SettingsAction> = (
	state = { visible: [] },
	// @ts-expect-error empty action type
	action = { type: '' },
) => {
	if (!action?.type) return state
	if (!(action.type in settingsActions)) return state
	return settingsActions[action.type](state, action.payload)
}

export default settingsReducer
