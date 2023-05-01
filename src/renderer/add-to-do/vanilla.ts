const form = document.getElementById('form') as HTMLFormElement | null
const input = document.getElementById('input') as HTMLInputElement | null

const commitDraft = () => window.electron.dispatch({ type: 'TO_DO:COMMIT_DRAFT' })
const setDraft = payload => window.electron.dispatch({ type: 'TO_DO:SET_DRAFT', payload })

form?.addEventListener('submit', e => {
	e.preventDefault()
	commitDraft()
})

// @ts-expect-error input event isn’t typed here
input?.addEventListener('input', e => setDraft(e?.target?.value))

window.electron.subscribe(newState => {
	if (!input) return
	input.value = newState.toDos.draft
})
