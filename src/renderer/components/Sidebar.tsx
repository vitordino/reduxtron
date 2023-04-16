import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { IconType } from 'react-icons'
import { RxPlus, RxPencil2, RxMix, RxFile } from 'react-icons/rx'

const links = [
	{ to: '/counter', text: 'counter', icon: RxPlus },
	{ to: '/to-do', text: 'to do', icon: RxPencil2 },
	{ to: '/ui', text: 'ui', icon: RxMix },
	{ to: '/folder', text: 'folder', icon: RxFile },
]

type SidebarLinkProps = {
	to: string
	icon: IconType
	text: ReactNode
}

const SidebarLink = ({ to, icon: Icon, text }: SidebarLinkProps) => (
	<a
		href={to}
		className='group relative lg:w-full mt-0.5 py-2 px-2 h-7 flex items-center justify-center lg:justify-normal lg:rounded hover:bg-gray-100 cursor-pointer'
	>
		<Icon className='lg:w-3.5 h-3.5 lg:x4 text-sm text-gray-500 group-hover:text-gray-600' />
		<span className='hidden lg:block ml-2'>{text}</span>
	</a>
)

const isMac = window.__PLATFORM__ === 'darwin'
const Sidebar = () => (
	<div className='inset-0 relative flex flex-col flex-shrink-0 lg:w-56 font-sans text-sm text-gray-700 border-r border-gray-100 justify-items-start'>
		{isMac && <div className='pt-6' />}
		<div className='flex flex-col flex-grow-0 flex-shrink-0 p-3 lg:px-4 lg:py-3'>
			<Link to='/' className='group flex items-center justify-between rounded hover:bg-gray-100'>
				<div className='flex items-center p-2'>
					<div className='flex text-sm items-center justify-center rounded-sm w-6 h-6 p-0.5 text-white bg-indigo-600 lg:x2.5'>
						<img src='/images/logo.svg' />
					</div>
					<div className='group-hover:text-gray-600 text-sm font-medium hidden lg:block ml-2'>
						redux-electron
					</div>
				</div>
			</Link>
		</div>

		<div className='flex flex-col flex-shrink flex-grow overflow-y-auto mb-0.5 lg:px-4'>
			{links.map(x => (
				<SidebarLink key={x.to} {...x} />
			))}
		</div>
	</div>
)

export default Sidebar
