import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

import { useStore } from 'renderer/hooks/useStore'
import { useInterval } from 'renderer/hooks/useInterval'

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
	const selectedTodo = useSelectedToDo()
	return <pre>{JSON.stringify({ selectedTodo }, null, 2)}</pre>
}

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
)
