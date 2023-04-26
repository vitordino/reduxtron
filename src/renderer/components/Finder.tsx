import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useHotkeys } from 'react-hotkeys-hook'
import {
	RxChevronLeft,
	RxChevronRight,
	RxChevronUp,
	RxCross2,
	RxFile,
	RxLaptop,
} from 'react-icons/rx'

import useStore from 'renderer/hooks/useStore'
import useDispatch from 'renderer/hooks/useDispatch'
import { useFileSystemSWR } from 'renderer/hooks/useSWR'
import { Toolbar, ToolbarButton } from 'renderer/components/Toolbar'

const Finder = () => {
	const path = useStore(x => x?.folder?.present.path)
	const pathState = useStore(x => x?.folder?.present.state)
	const hasPast = useStore(x => !!x.folder?.past.length)
	const hasFuture = useStore(x => !!x.folder?.future.length)
	const { data } = useFileSystemSWR(path)
	const dispatch = useDispatch()
	useHotkeys('meta+[, backspace', () => dispatch({ type: 'FOLDER:UNDO' }))
	useHotkeys('meta+]', () => dispatch({ type: 'FOLDER:REDO' }))
	useHotkeys('meta+up', () => dispatch({ type: 'FOLDER:UP' }))
	useHotkeys('meta+down', () => {
		const focusedElement = document.activeElement
		const isFocusVisible = focusedElement?.matches(':focus-visible')
		const isFolder = focusedElement?.getAttribute('data-folder') == 'true'
		const name = focusedElement?.getAttribute('data-name')
		if (!isFocusVisible || !isFolder || !name) return
		return dispatch({ type: 'FOLDER:DOWN', payload: name })
	})

	const moveUp = () => dispatch({ type: 'FOLDER:UP' })

	const permutations = path?.split('/').reduce<Record<string, string>>((acc, curr, index, arr) => {
		if (!curr) return { ...acc, '/': '/' }
		return { ...acc, [curr]: arr.slice(0, index + 1).join('/') }
	}, {})

	const hasPermutations = Object.keys(permutations || {}).length > 1

	const handleSelectChange = e => dispatch({ type: 'FOLDER:SET', payload: e.target.value })

	const onFileClick = (folder: boolean, name: string) => () => {
		if (!folder || !name) return
		return dispatch({ type: 'FOLDER:DOWN', payload: name })
	}

	return (
		<>
			<Toolbar className='items-center pl-0 pr-0' orientation='horizontal'>
				<ToolbarButton disabled={!hasPast} onClick={() => dispatch({ type: 'FOLDER:UNDO' })}>
					<RxChevronLeft />
				</ToolbarButton>
				<ToolbarButton disabled={!hasFuture} onClick={() => dispatch({ type: 'FOLDER:REDO' })}>
					<RxChevronRight />
				</ToolbarButton>
				<ToolbarButton
					onClick={() => dispatch({ type: 'FOLDER:PICK' })}
					disabled={pathState === 'loading'}
				>
					<RxLaptop />
				</ToolbarButton>
				{hasPermutations && (
					<ToolbarButton asChild>
						<select
							value={path}
							onChange={handleSelectChange}
							className='no-drag-region cursor-pointer h-full focus:outline-none hover:text-slate-12 focus:slate-12 hover:bg-slate-5 focus:bg-slate-5 ring-indigo-8 px-0 mx-0'
						>
							{Object.entries(permutations || {}).map(([key, value]) => (
								<option key={value} value={value}>
									{key}
								</option>
							))}
						</select>
					</ToolbarButton>
				)}
				{!hasPermutations && <div className='px-3 flex-shrink-0'>finder</div>}
				<div className='flex-1' />
				<ToolbarButton onClick={moveUp} disabled={pathState === 'loading' || !path}>
					<RxChevronUp />
				</ToolbarButton>
				<ToolbarButton
					onClick={() => dispatch({ type: 'FOLDER:CLEAR' })}
					disabled={pathState === 'loading' || !path}
				>
					<RxCross2 />
				</ToolbarButton>
			</Toolbar>

			<NavigationMenu.Root>
				<NavigationMenu.List className='group divide-y divide-slate-4'>
					{data
						?.sort((a, b) => +b.folder - +a.folder)
						?.map(({ name, folder }, index) => (
							<NavigationMenu.Item key={name}>
								<NavigationMenu.NavigationMenuLink asChild>
									<button
										data-name={name}
										data-folder={folder}
										autoFocus={!index}
										onClick={onFileClick(folder, name)}
										className='flex items-center w-full px-3 py-2 space-x-3'
									>
										{folder ? <RxChevronRight /> : <RxFile />}
										<div>{name}</div>
									</button>
								</NavigationMenu.NavigationMenuLink>
							</NavigationMenu.Item>
						))}
				</NavigationMenu.List>
			</NavigationMenu.Root>
		</>
	)
}

export default Finder
