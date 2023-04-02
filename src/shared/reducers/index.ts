import { combineReducers, Dispatch as BaseDispatch } from '@reduxjs/toolkit'

import counterReducer, { CounterAction } from './counter'
import toDosReducer, { ToDosAction } from './toDos'
import UIReducer, { UIAction } from './ui'
import swrReducer, { SWRAction } from './swr'
import globalReducer from './global'

const rootReducer = globalReducer(
	combineReducers({
		counter: counterReducer,
		toDos: toDosReducer,
		ui: UIReducer,
		swr: swrReducer,
	}),
)

export type Action = CounterAction | ToDosAction | UIAction | SWRAction
export type State = ReturnType<typeof rootReducer>
export type Dispatch = BaseDispatch<Action>

export default rootReducer
