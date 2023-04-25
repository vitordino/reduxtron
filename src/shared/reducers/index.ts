import { combineReducers, Dispatch as BaseDispatch, Reducer, Observable, AnyAction } from 'redux'

import counterReducer, { CounterAction } from './counter'
import toDosReducer, { ToDosAction } from './toDos'
import UIReducer, { UIAction } from './ui'
import swrReducer, { SWRAction } from './swr'
import globalReducer, { GlobalAction } from './global'
import dogReducer, { DogAction } from './dog'
import folderReducer, { FolderAction } from './folder'
import undoable from 'redux-undo'

console.log({ undoable: undoable.default })

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

export type Middleware<A extends AnyAction = Action> = (
	store: MiddlewareStore,
) => (next: Dispatch) => (action: A) => Promise<Action>

export default rootReducer
