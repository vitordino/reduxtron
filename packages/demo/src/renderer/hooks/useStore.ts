import { createUseStore } from 'reduxtron/zustand-store'
import { State, Action } from 'src/shared/reducers'

export const useStore = createUseStore<State, Action>(window.electron)
