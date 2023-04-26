import { Reorder, useMotionValue } from 'framer-motion'

import { VisibilityFilter } from 'shared/reducers/toDos'
import compare from 'renderer/utils/compare'
import useStore from 'renderer/hooks/useStore'
import useDispatch from 'renderer/hooks/useDispatch'
import useIsAnimating from 'renderer/hooks/useIsAnimating'
import ToDo, { ToDoProps } from 'renderer/components/ToDo'
import EmptyState from 'renderer/components/EmptyState'

const ReorderTodoItem = ({ todo }: { todo: ToDoProps }) => {
	const y = useMotionValue(0)
	const isDragging = useIsAnimating(y)
	const style = { y, '--tw-divide-opacity': isDragging ? 0 : 1 } as const
	return (
		<Reorder.Item
			data-dragging={isDragging}
			id={todo.id}
			value={todo}
			className='relative cursor-grab data-[dragging=true]:ring-1 ring-slate-4 data-[dragging=true]:border-transparent data-[dragging=true]:bg-slate-2 dark:data-[dragging=true]:bg-slate-1 data-[dragging=true]:cursor-grabbing'
			style={style}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<ToDo {...todo} />
		</Reorder.Item>
	)
}

const getFilteredItems = (items?: ToDoProps[], visibilityFilter?: VisibilityFilter) => {
	if (visibilityFilter === 'SHOW_COMPLETED') return items?.filter(x => x.completed)
	if (visibilityFilter === 'SHOW_ACTIVE') return items?.filter(x => !x.completed)
	return items
}

const TODO_EMPTY_STATE_TITLE_BY_VISIBILITY_FILTER: Record<VisibilityFilter, string> = {
	SHOW_ALL: 'no to do items',
	SHOW_ACTIVE: 'no active to dos items',
	SHOW_COMPLETED: 'no completed to dos items',
}

const TODO_EMPTY_STATE_DESCRIPTION_BY_VISIBILITY_FILTER: Record<VisibilityFilter, string> = {
	SHOW_ALL: 'use the input above to create one',
	SHOW_ACTIVE: 'change to the "all" or "completed" filter bellow',
	SHOW_COMPLETED: 'change to the "all" or "active" filter bellow',
}

const ToDoList = () => {
	const visibilityFilter = useStore(x => x.toDos?.visibilityFilter)
	const items = useStore(x => x.toDos?.items, compare)
	const dispatch = useDispatch()

	const filteredItems = getFilteredItems(items, visibilityFilter)

	const setToDos = (payload?: typeof items) => {
		if (!payload) return
		dispatch({ type: 'TO_DO:SET', payload })
	}

	if (!items?.length) {
		return (
			<EmptyState
				title={TODO_EMPTY_STATE_TITLE_BY_VISIBILITY_FILTER['SHOW_ALL']}
				description={TODO_EMPTY_STATE_DESCRIPTION_BY_VISIBILITY_FILTER['SHOW_ALL']}
			/>
		)
	}

	if (!filteredItems?.length) {
		return (
			<EmptyState
				title={TODO_EMPTY_STATE_TITLE_BY_VISIBILITY_FILTER[visibilityFilter || 'SHOW_ALL']}
				description={
					TODO_EMPTY_STATE_DESCRIPTION_BY_VISIBILITY_FILTER[visibilityFilter || 'SHOW_ALL']
				}
			/>
		)
	}
	return (
		<>
			<Reorder.Group
				className='group divide-y divide-slate-4 overflow-y-scroll flex-1 overscroll-contain'
				axis='y'
				values={filteredItems}
				onReorder={setToDos}
				layoutScroll
			>
				{filteredItems.map(todo => (
					<ReorderTodoItem key={todo.id} todo={todo} />
				))}
			</Reorder.Group>
		</>
	)
}

export default ToDoList
