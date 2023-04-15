import { RxBox } from 'react-icons/rx'

const Sidebar = () => (
	<div className='inset-0 relative bg-white flex flex-col flex-shrink-0 lg:w-56 font-sans text-sm text-gray-700 border-r border-gray-100 justify-items-start'>
		<div className='flex flex-col flex-grow-0 flex-shrink-0 p-3 lg:px-5 lg:py-3'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center p-1 rounded'>
					<div className='flex text-sm items-center justify-center rounded-sm w-6 h-6 p-0.5 text-white bg-indigo-600 lg:x2.5'>
						<img src='/images/logo.svg' />
					</div>
					<div className='text-sm font-medium hidden lg:block ml-2'>redux-electron</div>
				</div>
			</div>
		</div>

		<div className='flex flex-col flex-shrink flex-grow overflow-y-auto mb-0.5 lg:px-4'>
			<a
				href='/'
				className='group relative lg:w-full mt-0.5 py-2 px-2 h-7 flex items-center justify-center lg:justify-normal lg:rounded hover:bg-gray-100 cursor-pointer'
			>
				<RxBox className='lg:w-3.5 h-3.5 lg:x4 text-sm text-gray-500 group-hover:text-gray-600' />
				<span className='hidden lg:block ml-2'>Item 1</span>
			</a>
			<a
				href='/'
				className='group relative lg:w-full mt-0.5 py-2 px-2 h-7 flex items-center justify-center lg:justify-normal lg:rounded hover:bg-gray-100 cursor-pointer'
			>
				<RxBox className='lg:w-3.5 h-3.5 lg:x4 text-gray-500 group-hover:text-gray-600' />
				<span className='hidden lg:block ml-2'>Item 2</span>
			</a>
			<a
				href='/'
				className='group relative lg:w-full mt-0.5 py-2 px-2 h-7 flex items-center justify-center lg:justify-normal lg:rounded hover:bg-gray-100 cursor-pointer'
			>
				<RxBox className='lg:w-3.5 h-3.5 lg:x4 text-gray-500 group-hover:text-gray-600' />
				<span className='hidden lg:block ml-2'>Item 3</span>
			</a>
		</div>
	</div>
)

export default Sidebar
