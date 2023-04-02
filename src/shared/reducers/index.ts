import {
	combineReducers,
	Dispatch as BaseDispatch,
	Middleware as BaseMiddleware,
} from '@reduxjs/toolkit'

import counterReducer, { CounterAction } from './counter'
import toDosReducer, { ToDosAction } from './toDos'
import UIReducer, { UIAction } from './ui'
import swrReducer, { SWRAction } from './swr'
import globalReducer from './global'
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

export type Action = CounterAction | ToDosAction | UIAction | SWRAction | DogAction | FolderAction
export type State = ReturnType<typeof rootReducer>
export type Dispatch = BaseDispatch<Action>

type MiddlewareStore = {
	getState: () => State
	dispatch: Dispatch
}

export type Middleware = (
	store: MiddlewareStore,
) => (next: Dispatch) => (action: Action) => Promise<Action>

export default rootReducer
