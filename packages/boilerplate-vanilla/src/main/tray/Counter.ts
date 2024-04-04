import { MenuItemConstructorOptions } from 'electron'

import type { Dispatch, State } from 'src/shared/reducers'

export const TrayCounter = (
	state: Partial<State>,
	dispatch: Dispatch
): MenuItemConstructorOptions[] => {
	return [
		{
			label: 'decrement',
			type: 'normal',
			click: () => dispatch({ type: 'COUNTER:DECREMENT' })
		},
		{
			label: `state: ${state.counter ?? 'loading'}`,
			type: 'normal',
			click: () => dispatch({ type: 'COUNTER:DECREMENT' })
		},
		{
			label: 'increment',
			type: 'normal',
			click: () => dispatch({ type: 'COUNTER:INCREMENT' })
		}
	]
}
