import { combineReducers, configureStore, applyMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import logger from './middlewares/logger'
import counterReducer, { CounterAction } from '../../shared/reducers/counter'
import toDosReducer, { ToDosAction } from '../../shared/reducers/toDos'
import UIReducer, { UIAction } from '../../shared/reducers/ui'
import dogReducer, { DogAction } from '../../shared/reducers/dog'
import swrReducer, { SWRAction } from '../../shared/reducers/swr'
import persistanceMiddleware from './middlewares/persistance'
import globalReducer from '../../shared/reducers/global'
import swrMiddleware from './middlewares/swr'

const reducer = globalReducer(
	combineReducers({
		counter: counterReducer,
		toDos: toDosReducer,
		ui: UIReducer,
		dog: dogReducer,
		swr: swrReducer,
	}),
)

export type Action = CounterAction | ToDosAction | UIAction | DogAction | SWRAction
export type State = ReturnType<typeof reducer>

const store = configureStore<State, Action>({
	reducer,
	enhancers: [applyMiddleware(thunk, swrMiddleware, logger, persistanceMiddleware)],
})

export type Store = typeof store
export type Dispatch = Store['dispatch']

export default store
