import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { useStore } from 'src/renderer/hooks/useStore'
import { useDispatch } from 'src/renderer/hooks/useDispatch'
import type { VisibilityFilter } from 'src/shared/reducers/toDos'
import { preventKeyboardNavigation } from 'src/renderer/utils/keyboardNavigation'
import { getFocusable, getLastFocusable } from 'src/renderer/utils/getFocusable'

const itemClasses =
	'px-2 py-2 text-slate-8 data-[state=on]:text-slate-11 focus-visible:z-10 focus-visible:outline-none focus-visible:bg-slate-4 focus-visible:dark:bg-slate-4'

const k = preventKeyboardNavigation('vertical', e => {
	if (e.key === 'ArrowUp') {
		const item = getLastFocusable(document.getElementById('to-do-list'), -2)
		if (item) return item.focus()
		return getFocusable(document.getElementById('add-to-do'))?.focus()
	}
	if (e.currentTarget.matches(':first-child') && e.key === 'ArrowLeft') {
		e.preventDefault()
		getLastFocusable(document.getElementById('sidebar'))?.focus()
	}
	if (e.currentTarget.matches(':last-child') && e.key === 'ArrowRight') {
		e.preventDefault()
		getLastFocusable(document.getElementById('view'))?.focus()
	}
})

export const ToDoVisibilityToggle = () => {
	const value = useStore(x => x.toDos?.visibilityFilter)
	const dispatch = useDispatch()
	const setValue = (payload: VisibilityFilter) => {
		if (!payload) return
		dispatch({ type: 'TO_DO:CHANGE_VISIBILITY_FILTER', payload })
	}

	return (
		<ToggleGroup.Root type='single' value={value} onValueChange={setValue} className='inline-flex'>
			<ToggleGroup.Item {...k} className={itemClasses} value='SHOW_ALL'>
				all
			</ToggleGroup.Item>
			<ToggleGroup.Item {...k} className={itemClasses} value='SHOW_ACTIVE'>
				active
			</ToggleGroup.Item>
			<ToggleGroup.Item {...k} className={itemClasses} value='SHOW_COMPLETED'>
				completed
			</ToggleGroup.Item>
		</ToggleGroup.Root>
	)
}
