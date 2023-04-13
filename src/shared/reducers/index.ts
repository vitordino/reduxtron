import { combineReducers, Dispatch as BaseDispatch, Reducer, Observable } from '@reduxjs/toolkit'

import counterReducer, { CounterAction } from './counter'
import toDosReducer, { ToDosAction } from './toDos'
import UIReducer, { UIAction } from './ui'
import swrReducer, { SWRAction } from './swr'
import globalReducer, { GlobalAction } from './global'
import dogReducer, { DogAction } from './dog'
import folderReducer, { FolderAction } from './folder'

const rootReducer = globalReducer(
	combineReducers({
		counter: counterReducer,
		toDos: toDosReducer,
		ui: UIReducer,
		swr: swrReducer,
		dog: dogReducer,
		folder: folderReducer,
	}),
)

type ActionOrAnyAction =
	| CounterAction
	| ToDosAction
	| UIAction
	| SWRAction
	| DogAction
	| FolderAction
	| GlobalAction

export type Action = Exclude<ActionOrAnyAction, { type: '' }>

export type State = ReturnType<typeof rootReducer>
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

export type Middleware = (
	store: MiddlewareStore,
) => (next: Dispatch) => (action: Action) => Promise<Action>

export default rootReducer
