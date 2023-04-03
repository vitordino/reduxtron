import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { State } from 'shared/reducers'

// we don’t need to fill it with state keys because they will all come from main
// we don’t need any actions because all the state updates also comes from main
const useStore = create(devtools<Partial<State>>(_ => ({})))

window.electron.subscribe(useStore.setState)

// @ts-expect-error dispatch an invalid action so it gets the initial state
// TODO: use a initial getState instead
window.electron.dispatch({ type: '' })

export default useStore
