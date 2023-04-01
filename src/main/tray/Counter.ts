import type { MenuItemConstructorOptions } from 'electron'
import store, { State } from '../store'

// on click actions
const decrement = () => store.dispatch({ type: 'COUNTER:DECREMENT' })
const increment = () => store.dispatch({ type: 'COUNTER:INCREMENT' })

const TrayCounter = (state: State): MenuItemConstructorOptions => ({
	label: 'counter',
	type: 'submenu',
	submenu: [
		{ label: 'decrement', type: 'normal', click: decrement },
		{ label: state.counter.toString(), type: 'normal' },
		{ label: 'increment', type: 'normal', click: increment },
	],
})

export default TrayCounter
