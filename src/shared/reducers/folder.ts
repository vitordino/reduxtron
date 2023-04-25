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

const folderReducer: Reducer<FolderState, FolderAction> = (
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
		default:
			return current
	}
}

const undoableFolderReducer = undoable(folderReducer, {
	undoType: 'FOLDER:UNDO',
	redoType: 'FOLDER:REDO',
	jumpType: 'FOLDER:JUMP',
	jumpToPastType: 'FOLDER:JUMP_TO_PAST',
	jumpToFutureType: 'FOLDER:JUMP_TO_FUTURE',
	filter: ({ type }, state, prev) => {
		const validActions = type === 'FOLDER:PICK@LOADED' || type === 'FOLDER:SET'
		const changed = state.path !== prev._latestUnfiltered?.path
		return validActions && changed
	},
})

export default undoableFolderReducer
