import { createUseStore } from 'reduxtron/zustand'
import { Action, Store } from 'shared/reducers'

export const useStore = createUseStore<Store, Action>(window.electron)
