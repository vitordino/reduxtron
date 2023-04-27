import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import type { IconType } from 'react-icons'
import { RxPencil2, RxGear, RxFile, RxCamera } from 'react-icons/rx'
import { preventKeyboardNavigation } from 'renderer/utils/keyboardNavigation'
import { focusById } from 'renderer/utils/focusChildElement'
import { getFocusable } from 'renderer/utils/getFocusable'

const topLinks = [
	{ to: '/to-do', text: 'to do', icon: RxPencil2 },
	{ to: '/dog', text: 'dog', icon: RxCamera },
	{ to: '/finder', text: 'finder', icon: RxFile },
]

const bottomLinks = [{ to: '/settings', text: 'settings', icon: RxGear }]

const keyboardLogoHandler = preventKeyboardNavigation('horizontal', ({ key }) => {
	if (key === 'ArrowRight') {
		const toolbar = getFocusable(document.getElementById('toolbar'))
		if (toolbar) return toolbar.focus?.()
		return focusById('view')
	}
})

const keyboardTopHandler = preventKeyboardNavigation('horizontal', ({ key }) => {
	if (key === 'ArrowRight') return focusById('view')
})

const keyboardBottomHandler = preventKeyboardNavigation('horizontal', ({ key }) => {
	if (key === 'ArrowRight') {
		const footer = getFocusable(document.getElementById('footer'))
		if (footer) return footer.focus?.()
		return focusById('view')
	}
})

const KEYBOARD_HANDLERS = {
	top: keyboardTopHandler,
	bottom: keyboardBottomHandler,
}

type SidebarLinkProps = {
	to: string
	icon: IconType
	text: ReactNode
	position: 'top' | 'bottom'
}

const SidebarLink = ({ to, icon: Icon, text, position }: SidebarLinkProps) => {
	const location = useLocation().pathname
	return (
		<NavigationMenu.Item className='lg:px-4'>
			<NavigationMenu.Link asChild {...KEYBOARD_HANDLERS[position]}>
				<Link
					to={to}
					data-current={location === to}
					className='relative group lg:w-full mt-0.5 py-2 px-2 h-7 flex items-center justify-center lg:justify-normal lg:rounded hover:bg-slate-6 cursor-pointer data-[current=true]:bg-slate-2'
				>
					<Icon className='icon-size text-sm text-slate-11 group-hover:text-slate-12' />
					<span className='hidden lg:block ml-2 text-slate-12'>{text}</span>
				</Link>
			</NavigationMenu.Link>
		</NavigationMenu.Item>
	)
}

export const Sidebar = () => (
	<NavigationMenu.Root id='sidebar'>
		<NavigationMenu.List asChild>
			<ul className='list-none inset-0 fixed flex flex-col flex-shrink-0 w-20 lg:w-56 font-sans text-sm border-r border-slate-6 dark:border-slate-1 justify-items-start z-100'>
				<div className='drag-region sticky top-0 flex-shrink-0 w-full h-9' />
				<div className='flex flex-col flex-grow-0 flex-shrink-0 py-1 px-5 lg:px-4'>
					<NavigationMenu.Item>
						<NavigationMenu.Link asChild>
							<Link
								to='/'
								className='group flex items-center justify-between rounded hover:bg-slate-6'
								{...keyboardLogoHandler}
							>
								<div className='flex items-center p-2'>
									<div className='flex text-sm items-center justify-center rounded-sm w-6 h-6 p-0.5 text-white bg-indigo-9 group-hover:bg-indigo-10 lg:x2.5'>
										<img src='images/logo.svg' />
									</div>
									<div className='group-hover:text-slate-12 text-sm font-medium hidden lg:block ml-2'>
										redux-electron
									</div>
								</div>
							</Link>
						</NavigationMenu.Link>
					</NavigationMenu.Item>
				</div>

				<div className='flex flex-col flex-shrink flex-grow overflow-y-auto lg:pt-2'>
					{topLinks.map(x => (
						<SidebarLink position='top' key={x.to} {...x} />
					))}
					<div className='flex-1' />
					<div className='sticky bottom-0 py-4 mt-4'>
						{bottomLinks.map(x => (
							<SidebarLink position='bottom' key={x.to} {...x} />
						))}
					</div>
				</div>
			</ul>
		</NavigationMenu.List>
	</NavigationMenu.Root>
)
