<script lang="ts" setup>
  import { ref, onMounted } from 'vue'

  const counter = ref(0)

  const dispatch = window.electron.dispatch
  const onDecrement = () => dispatch({ type: 'COUNTER:DECREMENT' })
  const onIncrement = () => dispatch({ type: 'COUNTER:INCREMENT' })

  onMounted(() =>
    window.electron.subscribe(x => {
      counter.value = x.counter
    })
  )
</script>

<template>
  <main className='h-screen flex flex-col items-center justify-center'>
    <button className='border-gray-800 border-2 rounded px-4 py-1 hover:bg-gray-800 hover:text-white focus-visible:bg-gray-800 focus-visible:text-white' @click="onDecrement">
      decrement
    </button>
    <pre>{{counter}}</pre>
    <button className='border-gray-800 border-2 rounded px-4 py-1 hover:bg-gray-800 hover:text-white focus-visible:bg-gray-800 focus-visible:text-white' @click="onIncrement">
      increment
    </button>
  </main>
</template>
