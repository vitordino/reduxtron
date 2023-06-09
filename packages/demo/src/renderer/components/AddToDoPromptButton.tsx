import { RxCheck, RxInput } from 'react-icons/rx'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { focusById } from 'renderer/utils/focusChildElement'
import { useStore } from 'renderer/hooks/useStore'
import { useDispatch } from 'renderer/hooks/useDispatch'
import { Button } from 'renderer/components/Button'
import { FOCUSABLE_SELECTOR, getFocusable } from 'renderer/utils/getFocusable'
import { WINDOW_PATHS, WindowPath } from 'shared/reducers/settings'
import { compare } from 'renderer/utils/compare'

const ADD_TO_DO_PREFIX = 'add-to-do/'
const ADD_TO_DO_PATHS = WINDOW_PATHS.filter(x => x.startsWith(ADD_TO_DO_PREFIX))

// keyboard handlers
const onButtonKeyDown = e => {
	if (e.key === 'ArrowLeft') {
		const prev = e.currentTarget.previousElementSibling as HTMLElement | null
		const prevIsFocusable = prev?.matches(FOCUSABLE_SELECTOR)
		if (prev && prevIsFocusable) return prev.focus()
		return (
			e.currentTarget?.previousElementSibling?.previousElementSibling as HTMLElement | null
		)?.focus()
	}
	if (e.key === 'ArrowRight') {
		return (e.currentTarget.nextElementSibling as HTMLElement | null)?.focus()
	}
	if (e.key === 'ArrowDown') {
		e.preventDefault()
		const toDoListFocusable = getFocusable(document.getElementById('to-do-list'))
		if (toDoListFocusable) return toDoListFocusable.focus()
		return focusById('footer')
	}
}

export const AddToDoPromptButton = () => {
	const windows = useStore(x => x.settings?.windows || {}, compare)
	const getIsVisible = (path: WindowPath) => Object.values(windows).some(x => x.path === path)
	const dispatch = useDispatch()
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<Button
					size='square-md'
					id='add-to-do-prompt'
					onKeyDown={onButtonKeyDown}
					type='button'
					aria-label='open add to do windows'
					className='flex-shrink-0'
				>
					<RxInput />
				</Button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal className='z-100'>
				<DropdownMenu.Content
					className='z-100 min-w-[220px] bg-slate-1 rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade'
					sideOffset={4}
				>
					{ADD_TO_DO_PATHS.map(path => (
						<DropdownMenu.CheckboxItem
							key={path}
							className='group leading-none text-indigo-11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[highlighted]:outline-none data-[disabled]:text-mauve-8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-9 data-[highlighted]:text-indigo-1 dark:data-[highlighted]:text-indigo-12'
							checked={getIsVisible(path)}
							onClick={e => {
								e.preventDefault()
								dispatch({ type: 'SETTINGS:UPSERT_WINDOW_BY_PATH', payload: { path } })
							}}
						>
							<DropdownMenu.ItemIndicator className='absolute left-0 w-[25px] inline-flex items-center justify-center'>
								<RxCheck />
							</DropdownMenu.ItemIndicator>
							{path.replace(ADD_TO_DO_PREFIX, '')}
						</DropdownMenu.CheckboxItem>
					))}
					<DropdownMenu.Arrow className='fill-slate-1' />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	)
}
