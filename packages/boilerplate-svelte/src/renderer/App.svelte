<script lang="ts">
	import { onMount } from 'svelte'

	let counter = undefined

	const dispatch = window.reduxtron.dispatch
	const onDecrement = () => dispatch({ type: 'COUNTER:DECREMENT' })
	const onIncrement = () => dispatch({ type: 'COUNTER:INCREMENT' })

	onMount(() => {
		const setCounter = state => {
			counter = state.counter
		}
		const unsubscribe = window.reduxtron.subscribe(setCounter)
		window.reduxtron.getState().then(setCounter)
		return unsubscribe
	})
</script>

<main>
	<button on:click={onDecrement}>decrement</button>
	<pre>{counter ?? 'loading'}</pre>
	<button on:click={onIncrement}>increment</button>
</main>
