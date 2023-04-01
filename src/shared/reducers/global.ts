import { Reducer } from 'redux'

type GlobalReducer = {
	<R extends Reducer>(reducer: R): (
		state: Parameters<R>[0],
		action: Parameters<R>[1] | { type: 'GLOBAL_SET'; payload: ReturnType<R> },
	) => ReturnType<R>
}

const globalReducer: GlobalReducer = reducer => (state, action) => {
	if (action.type === 'GLOBAL_SET') return action.payload
	return reducer(state, action)
}

export default globalReducer
