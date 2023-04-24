import { Reducer } from 'redux'

export type uiState = { visible: string[] }

const addVisible = (state: uiState, payload: string) => {
	if (state.visible.includes(payload)) return state
	return { ...state, visible: [...state.visible, payload] }
}

const removeVisible = (state: uiState, payload: string) => ({
	...state,
	visible: state.visible.filter(x => x !== payload),
})

const toggleVisible = (state: uiState, payload: string) => {
	if (state.visible.includes(payload)) return removeVisible(state, payload)
	return addVisible(state, payload)
}

const uiActions = {
	'UI:ADD_VISIBLE': addVisible,
	'UI:REMOVE_VISIBLE': removeVisible,
	'UI:TOGGLE_VISIBLE': toggleVisible,
} as const

export type UIAction =
	| { type: 'UI:ADD_VISIBLE'; payload: string }
	| { type: 'UI:REMOVE_VISIBLE'; payload: string }
	| { type: 'UI:TOGGLE_VISIBLE'; payload: string }

const uiReducer: Reducer<uiState, UIAction> = (
	state = { visible: [] },
	// @ts-expect-error empty action type
	action = { type: '' },
) => {
	if (!action?.type) return state
	if (!(action.type in uiActions)) return state
	return uiActions[action.type](state, action.payload)
}

export default uiReducer
