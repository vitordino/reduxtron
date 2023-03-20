import type { Middleware } from '@reduxjs/toolkit'

const actionsToIntercept = ['SWR:FETCH_URL', 'SWR:FETCH_URL@MUTATE']

const swrMiddleware: Middleware = store => next => async action => {
	if (!actionsToIntercept.includes(action.type)) return next(action)
	// get initial loading/revalidating state or idle if should not revalidate
	const result = next(action)
	const [key] = action.payload
	const item = store.getState().swr[key]
	if (item.state === 'idle') return result
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

export default swrMiddleware
