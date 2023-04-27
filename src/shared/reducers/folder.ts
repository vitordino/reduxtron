import { join } from 'path'
import { Reducer } from 'redux'
import _undoable from 'redux-undo'
// @ts-expect-error wtf
const undoable = _undoable.default as typeof _undoable

type FolderState = {
	state: 'idle' | 'loading' | 'error' | 'loaded'
	path?: string
	error: string | null
}

export type FolderAction =
	| { type: 'FOLDER:UNDO' }
	| { type: 'FOLDER:REDO' }
	| { type: 'FOLDER:UP' }
	| { type: 'FOLDER:DOWN'; payload: string }
	| { type: 'FOLDER:PICK' }
	| { type: 'FOLDER:PICK@LOADING' }
	| { type: 'FOLDER:PICK@LOADED'; payload: string }
	| { type: 'FOLDER:PICK@ERROR'; payload: string }
	| { type: 'FOLDER:SET'; payload: string }
	| { type: 'FOLDER:CLEAR' }

const initialState: FolderState = { state: 'idle', path: '/', error: null }

const trimSlashes = (s: string) =>
	`/${s
		.split('/')
		.filter(v => v !== '')
		.join('/')}`

const trimJoin = (...paths: string[]) => trimSlashes(join(...paths))

const baseFolderReducer: Reducer<FolderState, FolderAction> = (
	current = initialState,
	// @ts-expect-error empty action type
	action = { type: '' },
) => {
	switch (action.type) {
		case 'FOLDER:CLEAR':
			return { state: 'idle', path: undefined, error: null }
		case 'FOLDER:PICK':
			return { state: 'loading', path: undefined, error: null }
		case 'FOLDER:PICK@LOADED':
			return { state: 'loaded', path: trimSlashes(action.payload), error: null }
		case 'FOLDER:PICK@ERROR':
			return { state: 'error', path: undefined, error: action.payload }
		case 'FOLDER:SET':
			return { state: 'loaded', path: trimSlashes(action.payload), error: null }
		case 'FOLDER:UP':
			return { state: 'loaded', path: trimJoin(current.path || '/', '..'), error: null }
		case 'FOLDER:DOWN':
			return { state: 'loaded', path: trimJoin(current.path || '/', action.payload), error: null }
		default:
			return current
	}
}

const UNDOABLE_ACTION_TYPES: FolderAction['type'][] = [
	'FOLDER:UP',
	'FOLDER:DOWN',
	'FOLDER:SET',
	'FOLDER:PICK@LOADED',
]

export const folderReducer = undoable(baseFolderReducer, {
	undoType: 'FOLDER:UNDO',
	redoType: 'FOLDER:REDO',
	jumpType: 'FOLDER:JUMP',
	jumpToPastType: 'FOLDER:JUMP_TO_PAST',
	jumpToFutureType: 'FOLDER:JUMP_TO_FUTURE',
	filter: ({ type }, state, prev) => {
		const isUndoableAction = UNDOABLE_ACTION_TYPES.includes(type)
		const changed = state.path !== prev._latestUnfiltered?.path
		return isUndoableAction && changed
	},
})
