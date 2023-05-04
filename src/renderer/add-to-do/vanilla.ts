const form = document.getElementById('form') as HTMLFormElement | null
const input = document.getElementById('input') as HTMLInputElement | null

form?.addEventListener('submit', e => {
	e.preventDefault()
	window.electron.dispatch({ type: 'TO_DO:COMMIT_DRAFT' })
})

input?.addEventListener('input', e => {
	// @ts-expect-error input event isn’t typed here
	window.electron.dispatch({ type: 'TO_DO:SET_DRAFT', payload: e?.target?.value })
})

window.electron.subscribe(newState => {
	if (!input) return
	input.value = newState.toDos.draft
})

export {}
