import type { MenuItemConstructorOptions } from 'electron'
import type { Dispatch, State } from '../../shared/reducers'

// on click actions
const decrement = (dispatch: Dispatch) => () => dispatch({ type: 'COUNTER:DECREMENT' })
const increment = (dispatch: Dispatch) => () => dispatch({ type: 'COUNTER:INCREMENT' })

const TrayCounter = (state: Partial<State>, dispatch: Dispatch): MenuItemConstructorOptions => ({
	label: 'counter',
	type: 'submenu',
	submenu: [
		{ label: 'decrement', type: 'normal', click: decrement(dispatch) },
		{ label: state.counter?.toString(), type: 'normal' },
		{ label: 'increment', type: 'normal', click: increment(dispatch) },
	],
})

export default TrayCounter
