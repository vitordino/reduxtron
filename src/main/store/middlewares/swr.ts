import { readdir } from 'node:fs/promises'
import type { Middleware as BaseMiddleware } from '@reduxjs/toolkit'
import type { Middleware, Action } from 'shared/reducers'
import { KEY_PREFIX_MAP } from 'shared/reducers/swr'

const actionsToIntercept = [
	'SWR:FETCH_URL',
	'SWR:FETCH_URL@MUTATE',
	'SWR:FETCH_FS',
	'SWR:FETCH_FS@MUTATE',
] as const

type InterceptedAction = Extract<Action, { type: (typeof actionsToIntercept)[number] }>

const fsFetcher: Middleware<InterceptedAction> = store => next => async action => {
	console.log('FS_FETCHER')
	const result = next(action)
	const [key] = action.payload
	const rawKey = key.replace(KEY_PREFIX_MAP['SWR:FETCH_FS'], '')

	const item = store.getState()?.swr[key]
	console.log('FS_FETCHER', { key, rawKey, item })
	if (item?.state === 'idle') return result
	try {
		const raw = await readdir(rawKey, { encoding: 'utf-8', withFileTypes: true })
		const dir = raw.map(x => ({ name: x.name, folder: x.isDirectory() }))
		return next({
			type: 'SWR:FETCH_FS@LOADED',
			payload: [key, dir],
		})
	} catch (e) {
		return next({
			type: 'SWR:FETCH_FS@ERROR',
			payload: [key, e?.toString?.() || 'unknown error'],
		})
	}
}

const urlFetcher: Middleware<InterceptedAction> = store => next => async action => {
	const result = next(action)
	const [key] = action.payload
	const item = store.getState().swr[key]
	if (item?.state === 'idle') return result
	try {
		const res = await fetch(key)
		try {
			const json = await res.json()
			return next({
				type: 'SWR:FETCH_URL@LOADED',
				payload: [key, json],
			})
		} catch (e) {
			return next({
				type: 'SWR:FETCH_URL@ERROR',
				payload: [key, e?.toString?.() || 'unknown error'],
			})
		}
	} catch (e) {
		return next({
			type: 'SWR:FETCH_URL@ERROR',
			payload: [key, e?.toString?.() || 'unknown error'],
		})
	}
}

const FETCHER_ACTION_MAP: Record<(typeof actionsToIntercept)[number], BaseMiddleware> = {
	'SWR:FETCH_URL': urlFetcher,
	'SWR:FETCH_URL@MUTATE': urlFetcher,
	'SWR:FETCH_FS': fsFetcher,
	'SWR:FETCH_FS@MUTATE': fsFetcher,
}

const swrMiddleware: Middleware = store => next => async action => {
	const fetcher = FETCHER_ACTION_MAP[action.type]
	if (!fetcher) return next(action)
	return fetcher(store)(next)(action)
}

export default swrMiddleware
