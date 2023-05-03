import type { ReactNode } from 'react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useHotkeys } from 'react-hotkeys-hook'
import {
	RxChevronLeft,
	RxChevronRight,
	RxChevronUp,
	RxCross2,
	RxFile,
	RxGroup,
	RxLaptop,
	RxValueNone,
} from 'react-icons/rx'

import { preventKeyboardNavigation } from 'renderer/utils/keyboardNavigation'
import { useStore } from 'renderer/hooks/useStore'
import { useDispatch } from 'renderer/hooks/useDispatch'
import { useFileSystemSWR } from 'renderer/hooks/useSWR'
import { Toolbar, ToolbarButton } from 'renderer/components/Toolbar'
import { EmptyState } from 'renderer/components/EmptyState'
import { Button } from 'renderer/components/Button'
import { Footer } from 'renderer/components/Footer'
import { focusById } from 'renderer/utils/focusChildElement'
import { FOCUSABLE_SELECTOR } from 'renderer/utils/getFocusable'

const FinderStatusItem = ({ children }: { children: ReactNode }) => (
	<p className='text-slate-10 px-4 h-full flex items-center border-r border-slate-4'>{children}</p>
)

const firstEnabledFocusableSelector = FOCUSABLE_SELECTOR.split(', ')
	.map(x => x + '[data-first-enabled="true"]')
	.join(', ')

const toolbarHandler = preventKeyboardNavigation('vertical', e => {
	if (e.key === 'ArrowDown') return focusById('view')
	if (e.key === 'ArrowLeft' && e.currentTarget.matches(firstEnabledFocusableSelector)) {
		return focusById('sidebar')
	}
})

const listItemHandler = preventKeyboardNavigation('horizontal', ({ key, currentTarget }) => {
	if (key === 'ArrowLeft') return focusById('sidebar')
	if (key === 'ArrowUp' && currentTarget.getAttribute('data-first') === 'true') {
		return focusById('toolbar')
	}
})

const emptyStateHandler = preventKeyboardNavigation('horizontal', ({ key, currentTarget }) => {
	if (key === 'ArrowLeft') return focusById('sidebar')
	if (key === 'ArrowUp') return focusById('toolbar')
})

export const Finder = () => {
	const path = useStore(x => x?.folder?.present?.path)
	const pathState = useStore(x => x?.folder?.present.state)
	const hasPast = useStore(x => !!x.folder?.past.length)
	const hasFuture = useStore(x => !!x.folder?.future.length)
	const { data, state } = useFileSystemSWR(path)
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

	const permutations = path?.split('/').reduce<Record<string, string>>((acc, curr, index, arr) => {
		if (!curr) return { ...acc, '/': '/' }
		return { ...acc, [curr]: arr.slice(0, index + 1).join('/') }
	}, {})

	const depth = path?.split('/').length

	const isEmpty = (state === 'idle' || state === 'initial') && !data?.length

	const moveUp = () => dispatch({ type: 'FOLDER:UP' })

	const handleSelectChange = e => dispatch({ type: 'FOLDER:SET', payload: e.target.value })

	const onFileClick = (folder: boolean, name: string) => () => {
		if (!folder || !name) return
		return dispatch({ type: 'FOLDER:DOWN', payload: name })
	}

	const onPickFolder = () => dispatch({ type: 'FOLDER:PICK' })

	const itemsCount = data?.length || 0
	const folderCount = data?.reduce((acc, curr) => acc + (curr.folder ? 1 : 0), 0) || 0
	const fileCount = itemsCount - folderCount

	return (
		<>
			<Toolbar className='items-center pl-0 pr-0' orientation='horizontal'>
				<ToolbarButton
					{...toolbarHandler}
					disabled={!hasPast}
					data-first-enabled={hasPast}
					onClick={() => dispatch({ type: 'FOLDER:UNDO' })}
				>
					<RxChevronLeft />
				</ToolbarButton>
				<ToolbarButton
					{...toolbarHandler}
					data-first-enabled={!hasPast}
					disabled={!hasFuture}
					onClick={() => dispatch({ type: 'FOLDER:REDO' })}
				>
					<RxChevronRight />
				</ToolbarButton>
				<ToolbarButton
					{...toolbarHandler}
					data-first-enabled={!hasPast && !hasFuture}
					onClick={onPickFolder}
					disabled={pathState === 'loading'}
				>
					<RxLaptop />
				</ToolbarButton>
				{!!depth && (
					<ToolbarButton asChild>
						<select
							value={path}
							data-first-enabled={!hasPast && !hasFuture && pathState === 'loading'}
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
				{!depth && <div className='px-3 flex-shrink-0'>finder</div>}
				<div className='flex-1' />
				<ToolbarButton
					{...toolbarHandler}
					onClick={moveUp}
					disabled={pathState === 'loading' || !path}
				>
					<RxChevronUp />
				</ToolbarButton>
				<ToolbarButton
					{...toolbarHandler}
					onClick={() => dispatch({ type: 'FOLDER:CLEAR' })}
					disabled={pathState === 'loading' || !path}
				>
					<RxCross2 />
				</ToolbarButton>
			</Toolbar>

			<NavigationMenu.Root id='view'>
				<NavigationMenu.List className='group divide-y divide-slate-4'>
					{data
						?.sort((a, b) => +b.folder - +a.folder)
						?.map(({ name, folder }, index) => (
							<NavigationMenu.Item key={name}>
								<NavigationMenu.NavigationMenuLink asChild>
									<button
										data-name={name}
										data-folder={folder}
										data-first={!index}
										autoFocus={!index}
										onClick={onFileClick(folder, name)}
										className='flex items-center w-full px-3 py-2 space-x-3 data-[folder=false]:cursor-default'
										{...listItemHandler}
									>
										{folder ? <RxChevronRight /> : <RxFile />}
										<div>{name}</div>
									</button>
								</NavigationMenu.NavigationMenuLink>
							</NavigationMenu.Item>
						))}
				</NavigationMenu.List>
				{isEmpty && (
					<EmptyState
						icon={depth ? RxGroup : RxValueNone}
						title={depth ? 'empty folder' : 'no folder selected'}
						description={depth ? 'it’s kinda lonely in here' : 'select a folder to navigate'}
					>
						<Button
							autoFocus
							className='mt-3'
							onClick={depth ? moveUp : onPickFolder}
							{...emptyStateHandler}
						>
							{depth ? 'go back' : 'pick a folder'}
						</Button>
					</EmptyState>
				)}
			</NavigationMenu.Root>
			<Footer>
				<FinderStatusItem>items: {itemsCount}</FinderStatusItem>
				<FinderStatusItem>folders: {folderCount}</FinderStatusItem>
				<FinderStatusItem>files: {fileCount}</FinderStatusItem>
			</Footer>
		</>
	)
}
