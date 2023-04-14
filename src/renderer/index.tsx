import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from 'renderer/App'
import Counter from './components/Counter/Counter'

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(
	<StrictMode>
		<Counter />
		<App />
	</StrictMode>,
)
