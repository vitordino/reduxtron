import { Action, State } from 'src/shared/reducers'
import { createUseStore } from 'reduxtron/zustand-store'

export const useStore = createUseStore<State, Action>(window.reduxtron)
const dispatch = window.reduxtron.dispatch

const App = () => {
	const counter = useStore(x => x.counter)
	const decrement = () => dispatch({ type: 'COUNTER:DECREMENT' })
	const increment = () => dispatch({ type: 'COUNTER:INCREMENT' })
	return (
		<main>
			<button onClick={decrement}>decrement</button>
			{counter || 0}
			<button onClick={increment}>increment</button>
		</main>
	)
}

export default App
