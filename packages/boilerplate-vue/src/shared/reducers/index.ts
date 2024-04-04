import { combineReducers, Dispatch as BaseDispatch, Reducer, Observable, AnyAction } from 'redux'

import { counterReducer, CounterAction } from './counter'

export const reducer = combineReducers({ counter: counterReducer })

type ActionOrAnyAction = AnyAction | CounterAction

export type Action = Exclude<ActionOrAnyAction, { type: '' }>

export type State = { counter: number }
export type Dispatch = BaseDispatch<Action>
export type Subscribe = (listener: () => void) => () => void

export type Store = {
	getState: () => State
	dispatch: Dispatch
	subscribe: Subscribe
	replaceReducer: (nextReducer: Reducer<State, Action>) => void
	[Symbol.observable](): Observable<State>
}

type MiddlewareStore = Pick<Store, 'getState' | 'dispatch'>

export type Middleware<A extends AnyAction = Action> = (
	store: MiddlewareStore
) => (next: Dispatch) => (action: A) => Promise<Action>
