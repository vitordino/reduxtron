import { Outlet } from 'react-router-dom'
import Sidebar from 'renderer/components/Sidebar'

const AppLayout = () => (
	<>
		<Sidebar />
		<main className='relative bg-slate-1 dark:bg-slate-2 w-full h-full overflow-hidden shadow-slate-8 dark:shadow-slate-2 shadow-xl flex flex-col'>
			<Outlet />
		</main>
	</>
)

export default AppLayout
