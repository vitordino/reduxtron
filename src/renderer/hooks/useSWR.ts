import type { SWRItem, SWRItemData, SWRItemOptions } from 'main/store/reducers/swr'
import { useEffect, useState } from 'react'
import useStore from 'renderer/store'
import useDispatch from './useDispatch'

const compare = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b)

export type Arguments = string | null | undefined | false
export type Key = Arguments | (() => Arguments)

const initialState = { state: 'initial', data: undefined, error: null } as const

const useSWR = <Data = SWRItemData, Error = SWRItemData>(
	key: Key,
	options?: SWRItemOptions,
): SWRItem<Data, Error> | typeof initialState => {
	const [stableKey, setStableKey] = useState('')
	const entry = useStore(x => x.swr?.[stableKey], compare) as SWRItem<Data, Error>
	const dispatch = useDispatch()

	useEffect(() => {
		try {
			const newKey = typeof key === 'function' ? key() : key
			setStableKey(newKey || '')
		} catch (e) {
			setStableKey('')
		}
	}, [key, setStableKey])

	useEffect(() => {
		if (!stableKey) return
		dispatch({
			type: 'SWR:FETCH_URL',
			payload: options ? [stableKey, options] : [stableKey],
		})
	}, [stableKey, dispatch, options])

	return entry || initialState
}

export default useSWR
