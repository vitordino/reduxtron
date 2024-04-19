import { StrictMode, useState, ChangeEvent, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

import { useStore } from 'src/renderer/hooks/useStore'
import { useInterval } from 'src/renderer/hooks/useInterval'
import { useDispatch } from 'src/renderer/hooks/useDispatch'

const useWindowId = () => {
	const [state, setState] = useState<string | null>(null)
	useInterval(() => window.windowId && setState(window.windowId), state ? null : 10)
	return state
}

const useWindowProps = () => {
	const windowId = useWindowId()
	const props = useStore(x => (windowId ? x.settings?.windows?.[windowId]?.props : undefined))
	return props
}

const useSelectedToDo = () => {
	const props = useWindowProps()
	const toDoItems = useStore(x => x.toDos?.items)
	if (!props?.id || typeof props.id !== 'string') return
	return toDoItems?.find(x => x.id === props.id)
}

const App = () => {
	const windowId = useWindowId()
	const [hasData, setHasData] = useState(false)
	const selectedTodo = useSelectedToDo()
	const dispatch = useDispatch()

	const hasSelected = !!selectedTodo

	useEffect(() => {
		if (hasSelected && !hasData) setHasData(true)
		if (!hasSelected && hasData && windowId)
			dispatch({ type: 'SETTINGS:DESTROY_WINDOW', payload: windowId })
	}, [windowId, hasData, setHasData, hasSelected, dispatch])

	if (!selectedTodo) return null
	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<input
				type='checkbox'
				checked={selectedTodo.completed}
				onChange={() => dispatch({ type: 'TO_DO:TOGGLE', payload: selectedTodo.id })}
			/>
			<input
				type='text'
				value={selectedTodo.title}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'TO_DO:CHANGE_TITLE', payload: [selectedTodo.id, e.target.value] })
				}
			/>
			<button onClick={() => dispatch({ type: 'TO_DO:REMOVE', payload: selectedTodo.id })}>
				x
			</button>
		</div>
	)
}

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
)
