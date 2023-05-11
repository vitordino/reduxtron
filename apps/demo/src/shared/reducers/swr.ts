// inspiration: https://swr.vercel.app/docs/api
import type { Reducer } from 'redux'

const DEDUPING_INTERVAL = 2000

export type SWRState = 'idle' | 'loading' | 'revalidating' | 'error'

export type RevalidateEvents = 'stale' | 'focus' | 'reconnect' | 'auth'

export type SWRItemOptions = {
	revalidateOn: RevalidateEvents[]
}

export type SWRItemData = Record<string, unknown> | string | null | undefined | SWRItemData[]

export type SWRItem<Data = SWRItemData, Error = SWRItemData> = {
	state: SWRState
	data: Data
	error: Error
	timestamp: number
} & SWRItemOptions

export type SWRStore = Record<string, SWRItem>

export type SWRType = 'url' | 'fs'

export const SWR_ACTION_TYPE_MAP = {
	url: 'SWR:FETCH_URL',
	fs: 'SWR:FETCH_FS',
} as const

export type FSEntry = { name: string; folder: boolean }
export type FSData = FSEntry[]

type FetchBaseType = 'SWR:FETCH_URL' | 'SWR:FETCH_FS'
type FetchLoadedType = `${FetchBaseType}@LOADED`
type FetchErrorType = `${FetchBaseType}@ERROR`
type FetchLoadingType = `${FetchBaseType}@LOADING`
type FetchRevalidatingType = `${FetchBaseType}@REVALIDATING`
type FetchMutateType = `${FetchBaseType}@MUTATE`

export type SWRAction =
	| { type: FetchBaseType; payload: [string] | [string, SWRItemOptions] }
	| { type: FetchLoadedType; payload: [string, SWRItem['data']] }
	| { type: FetchErrorType; payload: [string, SWRItem['error']] }
	// unused for now:
	| { type: FetchLoadingType; payload: [string] }
	| { type: FetchRevalidatingType; payload: [string] }
	| { type: FetchMutateType; payload: [string] | [string, SWRItem['data']] }

const shouldRevalidate = (item?: SWRItem): boolean => {
	if (!item) return true
	if (item.state === 'loading') return false
	if (item.state === 'revalidating') return false
	const now = Date.now()

	if (item.revalidateOn.includes('stale') && item.timestamp + DEDUPING_INTERVAL < now) {
		return true
	}

	return false
}

const DEFAULT_SWR_ITEM_OPTIONS: SWRItemOptions = {
	revalidateOn: ['stale', 'reconnect', 'focus'],
}

export const KEY_PREFIX_MAP = {
	'SWR:FETCH_URL': '',
	'SWR:FETCH_FS': 'fs://',
}

export const swrReducer: Reducer<SWRStore, SWRAction> = (state, { type, payload }) => {
	if (!state) return {}
	if (!type.startsWith('SWR:')) return state
	const key = payload[0]
	const item = state[key]
	switch (type) {
		case 'SWR:FETCH_URL':
		case 'SWR:FETCH_FS': {
			const options = payload[1] || DEFAULT_SWR_ITEM_OPTIONS
			if (!item) {
				return {
					...state,
					[key]: {
						...options,
						state: 'loading',
						timestamp: 0,
						data: undefined,
						error: null,
					},
				}
			}

			const withOptions = { ...item, ...options }
			if (item?.data && !shouldRevalidate(withOptions)) return { ...state, [key]: withOptions }
			const itemState = item.data ? 'revalidating' : 'loading'
			return { ...state, [key]: { ...item, ...options, state: itemState } }
		}

		case 'SWR:FETCH_URL@LOADING':
		case 'SWR:FETCH_FS@LOADING': {
			return {
				...state,
				[key]: {
					...item,
					data: undefined,
					error: null,
					state: 'loading',
				},
			}
		}

		case 'SWR:FETCH_URL@REVALIDATING':
		case 'SWR:FETCH_FS@REVALIDATING': {
			return {
				...state,
				[key]: {
					...item,
					state: 'revalidating',
				},
			}
		}

		case 'SWR:FETCH_URL@LOADED':
		case 'SWR:FETCH_FS@LOADED': {
			const data = payload[1]
			return {
				...state,
				[key]: {
					...item,
					error: null,
					data,
					state: 'idle',
					timestamp: Date.now(),
				},
			}
		}

		case 'SWR:FETCH_URL@ERROR':
		case 'SWR:FETCH_FS@ERROR': {
			const error = payload[1]
			return {
				...state,
				[key]: {
					...item,
					error,
					data: undefined,
					state: 'error',
					timestamp: Date.now(),
				},
			}
		}

		case 'SWR:FETCH_URL@MUTATE':
		case 'SWR:FETCH_FS@MUTATE': {
			const optimisticData = payload[1]
			const existingData = state[key].data
			return {
				...state,
				[key]: {
					...item,
					error: null,
					data: optimisticData ?? existingData,
					state: 'revalidating',
				},
			}
		}

		default:
			return state
	}
}
