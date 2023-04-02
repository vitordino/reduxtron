import { Reducer } from '@reduxjs/toolkit'

type FolderState = {
	state: 'idle' | 'loading' | 'error' | 'loaded'
	path?: string
	error: string | null
}

export type FolderAction =
	| { type: 'FOLDER:PICK' }
	| { type: 'FOLDER:PICK@LOADING' }
	| { type: 'FOLDER:PICK@LOADED'; payload: string }
	| { type: 'FOLDER:PICK@ERROR'; payload: string }
	| { type: 'FOLDER:CLEAR' }

const initialState: FolderState = { state: 'idle', path: undefined, error: null }

const folderReducer: Reducer<FolderState, FolderAction> = (
	current = initialState,
	// @ts-expect-error
	action = { type: '' },
) => {
	switch (action.type) {
		case 'FOLDER:CLEAR':
			return { state: 'idle', path: undefined, error: null }
		case 'FOLDER:PICK':
			return { state: 'loading', path: undefined, error: null }
		case 'FOLDER:PICK@LOADED':
			return { state: 'loaded', path: action.payload, error: null }
		case 'FOLDER:PICK@ERROR':
			return { state: 'error', path: undefined, error: action.payload }
		default:
			return current
	}
}

export default folderReducer
