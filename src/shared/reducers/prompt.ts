import { Reducer } from 'redux'

export type PromptEntry = {
	status: 'idle' | 'loading' | 'error' | 'loaded'
	value?: string
	error: string | null
}

export type PromptState = Record<string, PromptEntry | undefined>

export type PromptAction =
	| {
			type: 'PROMPT:OPEN'
			payload: [
				key: string,
				parameters: { title: string; description: string; defaultText?: string },
			]
	  }
	| { type: 'PROMPT:OPEN@LOADED'; payload: [key: string, value: string] }
	| { type: 'PROMPT:OPEN@ERROR'; payload: [key: string, error: string] }
	| { type: 'PROMPT:SET'; payload: [key: string, value: string] }
	| { type: 'PROMPT:CLEAR'; payload: [string] }
	| { type: ''; payload: [string] }

export const promptReducer: Reducer<PromptState, PromptAction> = (
	state = {},
	action = { type: '', payload: [''] },
) => {
	const key = action.payload?.[0]
	switch (action.type) {
		case 'PROMPT:CLEAR':
			return { ...state, [key]: undefined }
		case 'PROMPT:OPEN':
			return { ...state, [key]: { status: 'loading', value: undefined, error: null } }
		case 'PROMPT:OPEN@LOADED':
			return { ...state, [key]: { status: 'loaded', value: action.payload[1], error: null } }
		case 'PROMPT:OPEN@ERROR':
			return { ...state, [key]: { status: 'error', value: undefined, error: action.payload[1] } }
		case 'PROMPT:SET':
			return { ...state, [key]: { status: 'loaded', value: action.payload[1], error: null } }
		default:
			return state
	}
}
