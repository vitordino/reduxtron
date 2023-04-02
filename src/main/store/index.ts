import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import reducer, { State, Action } from '../../shared/reducers'
import folderMiddleware from './middlewares/folder'
import logger from './middlewares/logger'
import persistanceMiddleware from './middlewares/persistance'
import swrMiddleware from './middlewares/swr'
import uiMiddleware from './middlewares/ui'

const store = configureStore<State, Action>({
	reducer,
	enhancers: [
		applyMiddleware(
			thunk,
			swrMiddleware,
			folderMiddleware,
			logger,
			persistanceMiddleware,
			uiMiddleware,
		),
	],
})

export default store
