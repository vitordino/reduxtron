import { useEffect } from 'react'
import compare from 'renderer/utils/compare'
import {
	SWRItem,
	SWRItemData,
	SWRItemOptions,
	SWRType,
	KEY_PREFIX_MAP,
	SWR_ACTION_TYPE_MAP,
} from 'shared/reducers/swr'
import useStore from 'renderer/hooks/useStore'
import useDispatch from 'renderer/hooks/useDispatch'

export type Arguments = string | null | undefined | false
export type Key = Arguments | (() => Arguments)

const initialState = { state: 'initial', data: undefined, error: null } as const

const useSWR = <Data = SWRItemData, Error = SWRItemData>(
	type: SWRType,
	key: Key,
	options?: SWRItemOptions,
): SWRItem<Data, Error> | typeof initialState => {
	const actionType = SWR_ACTION_TYPE_MAP[type]
	const stableKey = (typeof key === 'function' ? key() : key) || ''
	const prefixedKey = KEY_PREFIX_MAP[actionType] + stableKey
	const entry = useStore(x => x.swr?.[prefixedKey], compare) as SWRItem<Data, Error>
	const dispatch = useDispatch()

	useEffect(() => {
		if (!stableKey) return
		dispatch({
			type: actionType,
			payload: options ? [prefixedKey, options] : [prefixedKey],
		})
	}, [actionType, stableKey, prefixedKey, dispatch, options])

	return entry || initialState
}

export default useSWR
