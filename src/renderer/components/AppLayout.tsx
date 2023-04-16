import { Outlet } from 'react-router-dom'
import Sidebar from 'renderer/components/Sidebar'

const AppLayout = () => (
	<>
		<Sidebar />
		<main className='bg-white w-full'>
			<Outlet />
		</main>
	</>
)

export default AppLayout
