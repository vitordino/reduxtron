import { create } from 'zustand'
import type { State } from 'shared/reducers'

const useStore = create<Partial<State>>(setState => {
	window.electron.subscribe(setState)
	// TODO: use a initial getState instead
	// @ts-expect-error dispatch an invalid action so it gets the initial state
	window.electron.dispatch({ type: '' })

	// we don’t need to fill it with state keys because they will all come from main
	// we don’t need any actions because all the state updates also comes from main
	return {}
})

export default useStore
