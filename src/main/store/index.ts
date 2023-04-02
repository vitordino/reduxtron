import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import reducer, { State, Action } from '../../shared/reducers'
import logger from './middlewares/logger'
import persistanceMiddleware from './middlewares/persistance'
import swrMiddleware from './middlewares/swr'

const store = configureStore<State, Action>({
	reducer,
	enhancers: [applyMiddleware(thunk, swrMiddleware, logger, persistanceMiddleware)],
})

export default store
