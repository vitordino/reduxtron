import { combineReducers } from '@reduxjs/toolkit'

import counterReducer, { CounterAction } from './counter'
import toDosReducer, { ToDosAction } from './toDos'
import UIReducer, { UIAction } from './ui'
import dogReducer, { DogAction } from './dog'
import swrReducer, { SWRAction } from './swr'
import globalReducer from './global'

const rootReducer = globalReducer(
	combineReducers({
		counter: counterReducer,
		toDos: toDosReducer,
		ui: UIReducer,
		dog: dogReducer,
		swr: swrReducer,
	}),
)

export type Action = CounterAction | ToDosAction | UIAction | DogAction | SWRAction
export type State = ReturnType<typeof rootReducer>

export default rootReducer
