/* eslint global-require: off, no-console: off */
import { Middleware, applyMiddleware, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/remote'

import reducer, { State, Action, Dispatch } from 'shared/reducers'
import folderMiddleware from 'main/store/middlewares/folder'
import logger from 'main/store/middlewares/logger'
import persistanceMiddleware from 'main/store/middlewares/persistance'
import swrMiddleware from 'main/store/middlewares/swr'
import uiMiddleware from 'main/store/middlewares/ui'

// const initDevTools = async () => {
// 	const { default: reduxDevTools } = await import('@redux-devtools/cli')
// 	console.log('reduxdevtools', typeof reduxDevTools)
// 	reduxDevTools({ port: 3001, host: 'localhost', secure: false, open: 'electron' })
// }

// initDevTools()

const middleware: Middleware[] = [
	thunk,
	logger,
	swrMiddleware,
	folderMiddleware,
	persistanceMiddleware,
	uiMiddleware,
]

const store = configureStore<State, Action>({
	reducer,
	enhancers: [
		// @ts-expect-error
		composeWithDevTools<State, Action>({
			port: 3001,
			secure: false,
			realtime: true,
			suppressConnectErrors: false,
			hostname: 'localhost',
		})(applyMiddleware(...middleware)),
	],
})

export default store
