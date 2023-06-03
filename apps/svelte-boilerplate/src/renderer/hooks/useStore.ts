import { createUseStore } from 'reduxtron/zustand-store'
import { Action, State } from 'shared/reducers'

export const useStore = createUseStore<State, Action>(window.electron)
