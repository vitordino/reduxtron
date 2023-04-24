import { Reducer } from '@reduxjs/toolkit'

const counterIncrement = (state: number) => state + 1
const counterDecrement = (state: number) => state - 1
const increaseBy = (state: number, payload = 0) => state + payload

export type CounterAction =
	| { type: 'COUNTER:INCREMENT' | 'COUNTER:DECREMENT' }
	| { type: 'COUNTER:INCREASE_BY'; payload: number }

const counterActions: Record<CounterAction['type'], (state: number, payload) => number> = {
	'COUNTER:INCREMENT': counterIncrement,
	'COUNTER:DECREMENT': counterDecrement,
	'COUNTER:INCREASE_BY': increaseBy,
}

// @ts-expect-error empty action type
const counterReducer: Reducer<number, CounterAction> = (state, action = { type: '' }) => {
	if (!action?.type || !(action.type in counterActions)) return state ?? 0
	// @ts-expect-error some actions might not contain the payload
	return counterActions[action.type](state ?? 0, action.payload)
}

export default counterReducer
