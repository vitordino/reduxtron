<script>
	const commitDraft = () => window.electron.dispatch({ type: 'TO_DO:COMMIT_DRAFT' })
	const setDraft = payload => window.electron.dispatch({ type: 'TO_DO:SET_DRAFT', payload })

	const onSubmit = e => {
		e.preventDefault()
		commitDraft()
	}

	const onInput = e => setDraft(e?.target?.value)

	let inputValue = ''
	window.electron.subscribe(x => {
		inputValue = x.toDos.draft
	})
</script>

<div>
	<h1 style="margin: 0">svelty add todo</h1>
	<h2 style="font-size: 1.25rem; margin: 0; color: #ff3e00">powered by svelte™</h2>
	<form id="form" on:submit={onSubmit}>
		<input bind:value={inputValue} on:input={onInput} id="input" />
		<button type="submit">add to do</button>
	</form>
</div>
