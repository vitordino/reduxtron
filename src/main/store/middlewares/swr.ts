import { AnyAction } from 'redux'
import type { Middleware, Action } from 'shared/reducers'

const actionsToIntercept = ['SWR:FETCH_URL', 'SWR:FETCH_URL@MUTATE'] as const

type InterceptedAction = Extract<Action, { type: (typeof actionsToIntercept)[number] }>

const shouldIntercept = (action: AnyAction): action is InterceptedAction =>
	actionsToIntercept.includes(action.type)

const urlFetcher: Middleware<InterceptedAction> = store => next => async action => {
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

const swrMiddleware: Middleware = store => next => async action => {
	if (shouldIntercept(action)) return urlFetcher(store)(next)(action)
	return next(action)
}

export default swrMiddleware
