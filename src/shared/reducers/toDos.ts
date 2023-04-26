import { Reducer } from 'redux'
import { uid } from 'uid'

export type ToDo = { id: string; title: string; completed: boolean }
export type VisibilityFilter = 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED'
export type ToDosState = { draft: string; items: ToDo[]; visibilityFilter: VisibilityFilter }

const createToDo = (state: ToDosState, title: string): ToDosState => ({
	...state,
	items: [...state.items, { id: uid(), completed: false, title }],
})

const commitDraft = (state: ToDosState, _: undefined): ToDosState => ({
	...createToDo(state, state.draft),
	draft: '',
})

const setDraft = (state: ToDosState, draft: string): ToDosState => ({ ...state, draft })

const removeToDo = (state: ToDosState, id: string): ToDosState => ({
	...state,
	items: state.items.filter(x => x.id !== id),
})

const toggleToDo = (state: ToDosState, id: string): ToDosState => {
	const indexToChange = state.items.findIndex(x => x.id === id)
	const selected = state.items[indexToChange]
	return {
		...state,
		items: [
			...state.items.slice(0, indexToChange),
			{ ...selected, completed: !selected.completed },
			...state.items.slice(indexToChange + 1),
		],
	}
}

const setToDos = (state: ToDosState, items: ToDo[]): ToDosState => ({ ...state, items })

const changeVisibilityFilter = (
	state: ToDosState,
	visibilityFilter: VisibilityFilter,
): ToDosState => ({ ...state, visibilityFilter })

export type ToDosAction =
	| { type: 'TO_DO:SET_DRAFT'; payload: string }
	| { type: 'TO_DO:COMMIT_DRAFT'; payload?: undefined }
	| { type: 'TO_DO:CREATE'; payload: string }
	| { type: 'TO_DO:REMOVE'; payload: string }
	| { type: 'TO_DO:TOGGLE'; payload: string }
	| { type: 'TO_DO:SET'; payload: ToDo[] }
	| { type: 'TO_DO:CHANGE_VISIBILITY_FILTER'; payload: VisibilityFilter }

const toDoActions: Record<ToDosAction['type'], (state: ToDosState, payload) => ToDosState> = {
	'TO_DO:SET_DRAFT': setDraft,
	'TO_DO:COMMIT_DRAFT': commitDraft,
	'TO_DO:CREATE': createToDo,
	'TO_DO:REMOVE': removeToDo,
	'TO_DO:TOGGLE': toggleToDo,
	'TO_DO:SET': setToDos,
	'TO_DO:CHANGE_VISIBILITY_FILTER': changeVisibilityFilter,
}

const toDosReducer: Reducer<ToDosState, ToDosAction> = (
	state = { draft: '', items: [], visibilityFilter: 'SHOW_ALL' },
	// @ts-expect-error empty action
	action = { type: '' },
) => {
	if (!action?.type || !(action.type in toDoActions)) return state
	return toDoActions[action.type](state, action.payload)
}

export default toDosReducer
