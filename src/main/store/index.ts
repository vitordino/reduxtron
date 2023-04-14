import { configureStore } from '@reduxjs/toolkit'

import reducer, { State, Action, Store } from 'shared/reducers'
import middleware from 'main/store/middlewares'
import enhancers from 'main/store/enhancers'

const store: Store = configureStore<State, Action>({
	reducer,
	// @ts-expect-error idk why redux is complaining, it’s working fine
	middleware,
	enhancers,
})

export default store
