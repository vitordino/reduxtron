import { configureStore } from '@reduxjs/toolkit'

import { reducer, State, Action, Store } from 'shared/reducers'
import { devToolsEnhancer } from 'main/store/devToolsEnhancers'
import { loggerMiddleware } from 'main/store/loggerMiddleware'

export const store: Store = configureStore<State, Action>({
	reducer,
	middleware: [loggerMiddleware],
	enhancers: [devToolsEnhancer],
})
