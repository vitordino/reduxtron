import { AnyAction, Reducer } from 'redux'

export type GlobalReducer = {
	<R extends Reducer>(reducer: R): (
		state: Parameters<R>[0],
		action:
			| Parameters<R>[1]
			| { type: 'GLOBAL:SET'; payload: ReturnType<R> }
			| { type: 'GET_STATE_FROM_PERSISTANCE_MIDDLEWARE' },
	) => ReturnType<R>
}

export type GlobalAction = Exclude<
	Extract<
		Parameters<ReturnType<GlobalReducer>>[1],
		{ type: 'GLOBAL:SET' | 'GET_STATE_FROM_PERSISTANCE_MIDDLEWARE' }
	>,
	{ type: '' }
>

export type GlobalSetAction = { type: 'GLOBAL:SET'; payload: unknown }
export type GetStateFromPersistanceMiddlewareAction = {
	type: 'GET_STATE_FROM_PERSISTANCE_MIDDLEWARE'
}

const isGlobalSetAction = (action: AnyAction): action is GlobalSetAction =>
	action.type === 'GLOBAL:SET'

export const globalReducer: GlobalReducer = reducer => (state, action) => {
	if (isGlobalSetAction(action)) return action.payload
	return reducer(state, action)
}
