import { Reducer } from 'redux'

export type CounterAction = { type: 'COUNTER:INCREMENT' } | { type: 'COUNTER:DECREMENT' }

export const counterReducer: Reducer<number, CounterAction> = (state = 0, action) => {
	switch (action.type) {
		case 'COUNTER:INCREMENT':
			return state + 1
		case 'COUNTER:DECREMENT':
			return state - 1
		default:
			return state
	}
}
