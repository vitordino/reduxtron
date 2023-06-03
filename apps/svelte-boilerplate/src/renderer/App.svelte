<script lang="ts">
	import { onMount } from 'svelte'

	let counter = undefined

	const dispatch = window.electron.dispatch
	const onDecrement = () => dispatch({ type: 'COUNTER:DECREMENT' })
	const onIncrement = () => dispatch({ type: 'COUNTER:INCREMENT' })

	onMount(() => {
		const setCounter = state => {
			counter = state.counter
		}
		const unsubscribe = window.electron.subscribe(setCounter)
		window.electron.getState().then(setCounter)
		return unsubscribe
	})
</script>

<main class="h-screen flex flex-col items-center justify-center">
	<button
		class="border-gray-800 border-2 rounded px-4 py-1 hover:bg-gray-800 hover:text-white focus-visible:bg-gray-800 focus-visible:text-white"
		on:click={onDecrement}
	>
		decrement
	</button>
	<pre>{counter ?? 'loading'}</pre>
	<button
		class="border-gray-800 border-2 rounded px-4 py-1 hover:bg-gray-800 hover:text-white focus-visible:bg-gray-800 focus-visible:text-white"
		on:click={onIncrement}
	>
		increment
	</button>
</main>
