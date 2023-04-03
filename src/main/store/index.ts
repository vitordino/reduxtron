import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import reducer, { State, Action } from 'shared/reducers'
import folderMiddleware from 'main/store/middlewares/folder'
import logger from 'main/store/middlewares/logger'
import persistanceMiddleware from 'main/store/middlewares/persistance'
import swrMiddleware from 'main/store/middlewares/swr'
import uiMiddleware from 'main/store/middlewares/ui'

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
