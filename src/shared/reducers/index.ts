import { combineReducers, Dispatch as BaseDispatch, Reducer, Observable, AnyAction } from 'redux'

import { toDosReducer, ToDosAction } from './toDos'
import { settingsReducer, SettingsAction } from './settings'
import { swrReducer, SWRAction } from './swr'
import { globalReducer, GlobalAction } from './global'
import { dogReducer, DogAction } from './dog'
import { folderReducer, FolderAction } from './folder'

export const reducer = globalReducer(
	combineReducers({
		toDos: toDosReducer,
		settings: settingsReducer,
		swr: swrReducer,
		dog: dogReducer,
		folder: folderReducer,
	}),
)

type ActionOrAnyAction =
	| ToDosAction
	| SettingsAction
	| SWRAction
	| DogAction
	| FolderAction
	| GlobalAction

export type Action = Exclude<ActionOrAnyAction, { type: '' }>

export type State = ReturnType<typeof reducer>
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
	store: MiddlewareStore,
) => (next: Dispatch) => (action: A) => Promise<Action>
