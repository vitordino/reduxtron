import { Outlet } from 'react-router-dom'
import Sidebar from 'renderer/components/Sidebar'

const AppLayout = () => (
	<>
		<Sidebar />
		<div className='fixed ml-20 lg:ml-56 w-screen min-h-screen bg-slate-1 dark:bg-slate-2 shadow-slate-8 dark:shadow-slate-2 shadow-xl' />
		<main className='relative ml-20 lg:ml-56 w-full min-h-screen flex flex-col overflow-hidden'>
			<div className='h-9' />
			<Outlet />
		</main>
	</>
)

export default AppLayout
