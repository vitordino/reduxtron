import { createRoot } from 'react-dom/client'
import App from 'renderer/App'

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(<App />)
