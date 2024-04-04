import { configureStore } from '@reduxjs/toolkit'

import { reducer, State, Action, Store } from 'src/shared/reducers'

// @ts-expect-error ignore for now
export const store: Store = configureStore<State, Action>({ reducer })
