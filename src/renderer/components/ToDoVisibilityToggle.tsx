import * as ToggleGroup from '@radix-ui/react-toggle-group'
import useStore from 'renderer/hooks/useStore'
import useDispatch from 'renderer/hooks/useDispatch'
import { VisibilityFilter } from 'shared/reducers/toDos'

const itemClasses =
	'px-2 py-2 text-slate-8 data-[state=on]:text-slate-11 focus-visible:z-10 focus-visible:outline-none focus-visible:bg-slate-4 focus-visible:dark:bg-slate-4'

const ToDoVisibilityToggle = () => {
	const value = useStore(x => x.toDos?.visibilityFilter)
	const dispatch = useDispatch()
	const setValue = (payload: VisibilityFilter) => {
		if (!payload) return
		dispatch({ type: 'TO_DO:CHANGE_VISIBILITY_FILTER', payload })
	}

	return (
		<ToggleGroup.Root type='single' value={value} onValueChange={setValue} className='inline-flex'>
			<ToggleGroup.Item className={itemClasses} value='SHOW_ALL'>
				all
			</ToggleGroup.Item>
			<ToggleGroup.Item className={itemClasses} value='SHOW_ACTIVE'>
				active
			</ToggleGroup.Item>
			<ToggleGroup.Item className={itemClasses} value='SHOW_COMPLETED'>
				completed
			</ToggleGroup.Item>
		</ToggleGroup.Root>
	)
}

export default ToDoVisibilityToggle
