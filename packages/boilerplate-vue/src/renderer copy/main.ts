export const main = async () => {
	window.reduxtron.subscribe(x =>
		document.getElementById('output')?.replaceChildren(x?.counter?.toString())
	)

	document
		.getElementById('decrement')
		?.addEventListener('click', () => window.reduxtron.dispatch({ type: 'COUNTER:DECREMENT' }))

	document
		.getElementById('increment')
		?.addEventListener('click', () => window.reduxtron.dispatch({ type: 'COUNTER:INCREMENT' }))

	const state = await window.reduxtron.getState()
	if (state.counter === undefined) return
	document.getElementById('output')?.replaceChildren(state.counter.toString())
}

main()
