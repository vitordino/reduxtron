import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { devToolsEnhancer } from '@redux-devtools/remote'
import { is } from '@electron-toolkit/utils'

import reducer, { State, Action, Middleware, Store } from 'shared/reducers'
import folderMiddleware from 'main/store/middlewares/folder'
import persistanceMiddleware from 'main/store/middlewares/persistance'
import swrMiddleware from 'main/store/middlewares/swr'
import uiMiddleware from 'main/store/middlewares/ui'

const middleware: Middleware[] = [
	thunk,
	swrMiddleware,
	folderMiddleware,
	persistanceMiddleware,
	uiMiddleware,
]

const devTools = devToolsEnhancer({
	port: 3001,
	secure: false,
	realtime: is.dev,
	suppressConnectErrors: true,
	hostname: 'localhost',
})

const store: Store = configureStore<State, Action>({
	reducer,
	// @ts-expect-error idk why redux is complaining, it’s working fine
	middleware,
	enhancers: [devTools],
})

export default store
