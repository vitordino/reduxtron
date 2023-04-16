import { Outlet } from 'react-router-dom'
import Sidebar from 'renderer/components/Sidebar'

const AppLayout = () => (
	<>
		<Sidebar />
		<Outlet />
	</>
)

export default AppLayout
