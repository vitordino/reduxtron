import { useEffect } from 'react'
import compare from 'renderer/utils/compare'
import type { SWRItem, SWRItemData, SWRItemOptions } from 'shared/reducers/swr'
import useStore from 'renderer/hooks/useStore'
import useDispatch from 'renderer/hooks/useDispatch'

export type Arguments = string | null | undefined | false
export type Key = Arguments | (() => Arguments)

const initialState = { state: 'initial', data: undefined, error: null } as const

const useSWR = <Data = SWRItemData, Error = SWRItemData>(
	key: Key,
	options?: SWRItemOptions,
): SWRItem<Data, Error> | typeof initialState => {
	const stableKey = (typeof key === 'function' ? key() : key) || ''
	const entry = useStore(x => x.swr?.[stableKey], compare) as SWRItem<Data, Error>
	const dispatch = useDispatch()

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
