<script lang="ts" setup>
import { State } from 'shared/reducers'
import { ref, onBeforeMount } from 'vue'

const counter = ref<number | undefined>()

const dispatch = window.electron.dispatch
const onDecrement = () => dispatch({ type: 'COUNTER:DECREMENT' })
const onIncrement = () => dispatch({ type: 'COUNTER:INCREMENT' })

onBeforeMount(() => {
	const setCounter = (state: Partial<State>) => {
		counter.value = state.counter
	}
	window.electron.getState().then(setCounter)
	window.electron.subscribe(setCounter)
})
</script>

<template>
	<main className="h-screen flex flex-col items-center justify-center">
		<button
			className="border-gray-800 border-2 rounded px-4 py-1 hover:bg-gray-800 hover:text-white focus-visible:bg-gray-800 focus-visible:text-white"
			@click="onDecrement"
		>
			decrement
		</button>
		<pre>{{ counter ?? 'loading' }}</pre>
		<button
			className="border-gray-800 border-2 rounded px-4 py-1 hover:bg-gray-800 hover:text-white focus-visible:bg-gray-800 focus-visible:text-white"
			@click="onIncrement"
		>
			increment
		</button>
	</main>
</template>
