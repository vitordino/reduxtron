<script setup>
import { ref, onMounted } from 'vue'

const input = ref('')

const onInput = (e) => window.electron.dispatch({ type: 'TO_DO:SET_DRAFT', payload: e.target.value })

const onSubmit = (e) => {
  e.preventDefault();
  window.electron.dispatch({ type: 'TO_DO:COMMIT_DRAFT' })
}

onMounted(() => window.electron.subscribe(x => { input.value = x.toDos.draft }))
</script>

<template>
  <h1 style="margin: 0">vuey add todo</h1>
  <h2 style="font-size: 1.25rem; margin: 0; color: #42b883">powered by vue™</h2>
  <form @submit="onSubmit">
    <input @input="onInput" :value="input" />
    <button type="submit">add to do</button>
  </form>
</template>
