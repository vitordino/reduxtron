import { configureStore } from '@reduxjs/toolkit'

import { reducer, State, Action, Store } from 'src/shared/reducers'
import { middleware } from 'src/main/store/middlewares'
import { enhancers } from 'src/main/store/enhancers'

export const store: Store = configureStore<State, Action>({
	reducer,
	// @ts-expect-error idk why redux is complaining, it’s working fine
	middleware,
	enhancers,
})
