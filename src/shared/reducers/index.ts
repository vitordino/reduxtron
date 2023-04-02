import { combineReducers, Dispatch as BaseDispatch } from '@reduxjs/toolkit'

import counterReducer, { CounterAction } from './counter'
import toDosReducer, { ToDosAction } from './toDos'
import UIReducer, { UIAction } from './ui'
import swrReducer, { SWRAction } from './swr'
import globalReducer from './global'
import dogReducer, { DogAction } from './dog'

const rootReducer = globalReducer(
	combineReducers({
		counter: counterReducer,
		toDos: toDosReducer,
		ui: UIReducer,
		swr: swrReducer,
		dog: dogReducer,
	}),
)

export type Action = CounterAction | ToDosAction | UIAction | SWRAction | DogAction
export type State = ReturnType<typeof rootReducer>
export type Dispatch = BaseDispatch<Action>

export default rootReducer
