import { memo, RefObject, useRef } from 'react'
import { RxHamburgerMenu, RxBox } from 'react-icons/rx'
import cn from 'clsx'

type LeftMenuProps = {
	showMenu: boolean
	onCloseMenu?: () => void
}

const LeftMenu = ({ showMenu, onCloseMenu }: LeftMenuProps) => {
	const ref = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>

	const classes = cn(
		'absolute lg:static inset-0 transform duration-300 lg:relative lg:translate-x-0 bg-white flex flex-col flex-shrink-0 w-56 font-sans text-sm text-gray-700 border-r border-gray-100 lg:shadow-none justify-items-start',
		{
			'-translate-x-full ease-out shadow-none': !showMenu,
			'translate-x-0 ease-in shadow-xl': showMenu,
		},
	)

	return (
		<div className={classes} ref={ref}>
			<button
				className='flex-shrink-0 px-5 ml-2 lg:hidden h-14 focus:outline-none'
				onClick={onCloseMenu}
			>
				<RxHamburgerMenu className='w-3.5 text-gray-500 hover:text-gray-800' />
			</button>

			<div className='flex flex-col flex-grow-0 flex-shrink-0 px-5 py-3'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center p-1 rounded'>
						<div className='flex text-sm items-center justify-center rounded-sm w-4.5 h-4.5 text-white bg-indigo-600 mr-2.5'>
							<img src='/images/logo.svg' />
						</div>
						<div className='text-sm font-medium'>redux-electron</div>
					</div>
				</div>
			</div>

			<div className='flex flex-col flex-shrink flex-grow overflow-y-auto mb-0.5 px-4'>
				<a
					href='/'
					className='group relative w-full mt-0.5 py-2 px-2 h-7 flex items-center rounded hover:bg-gray-100 cursor-pointer'
				>
					<RxBox className='w-3.5 h-3.5 mr-4 text-sm text-gray-500 group-hover:text-gray-600' />
					<span>Inbox</span>
				</a>
				<a
					href='/'
					className='group relative w-full mt-0.5 py-2 px-2 h-7 flex items-center rounded hover:bg-gray-100 cursor-pointer'
				>
					<RxBox className='w-3.5 h-3.5 mr-4 text-gray-500 group-hover:text-gray-600' />
					<span>Issues</span>
				</a>
				<a
					href='/'
					className='group relative w-full mt-0.5 py-2 px-2 h-7 flex items-center rounded hover:bg-gray-100 cursor-pointer'
				>
					<RxBox className='w-3.5 h-3.5 mr-4 text-gray-500 group-hover:text-gray-600' />
					<span>Views</span>
				</a>
			</div>
		</div>
	)
}

export default memo(LeftMenu)
