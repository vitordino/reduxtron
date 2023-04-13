import { Reducer } from '@reduxjs/toolkit'
import { uid } from 'uid'

export type ToDo = { id: string; title: string; completed: boolean }

const createToDo = (state: ToDo[], title: string) => [
	...state,
	{ id: uid(), completed: false, title },
]

const removeToDo = (state: ToDo[], id: string) => state.filter(x => x.id !== id)

const toggleToDo = (state: ToDo[], id: string) => {
	const indexToChange = state.findIndex(x => x.id === id)
	const selected = state[indexToChange]
	return [
		...state.slice(0, indexToChange),
		{ ...selected, completed: !selected.completed },
		...state.slice(indexToChange + 1),
	]
}

// @ts-expect-error
const setToDos = (state: ToDo[], newState: ToDo[]) => newState

const toDoActions = {
	'TO_DO:CREATE': createToDo,
	'TO_DO:REMOVE': removeToDo,
	'TO_DO:TOGGLE': toggleToDo,
	'TO_DO:SET': setToDos,
} as const

export type ToDosAction =
	| { type: 'TO_DO:CREATE'; payload: string }
	| { type: 'TO_DO:REMOVE'; payload: string }
	| { type: 'TO_DO:TOGGLE'; payload: string }
	| { type: 'TO_DO:SET'; payload: ToDo[] }

const toDosReducer: Reducer<ToDo[], ToDosAction> = (
	state = [],
	// @ts-expect-error
	action = { type: '' },
) => {
	if (!action?.type) return state
	if (action.type in toDoActions) {
		// @ts-expect-error
		return toDoActions[action.type](state, action.payload)
	}

	return state
}

export default toDosReducer
