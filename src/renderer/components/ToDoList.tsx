import { Reorder, useMotionValue } from 'framer-motion'

import compare from 'renderer/utils/compare'
import useStore from 'renderer/hooks/useStore'
import useDispatch from 'renderer/hooks/useDispatch'
import useIsAnimating from 'renderer/hooks/useIsAnimating'
import RenderCounter from 'renderer/components/RenderCounter'
import ToDo, { ToDoProps } from 'renderer/components/ToDo'

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

const ToDoList = () => {
	const items = useStore(x => x.toDos?.items, compare)
	const dispatch = useDispatch()

	const setToDos = (payload?: typeof items) => {
		if (!payload) return
		dispatch({ type: 'TO_DO:SET', payload })
	}

	if (!items?.length) {
		return (
			<div>
				<RenderCounter />
				empty todo list
			</div>
		)
	}

	return (
		<>
			<Reorder.Group
				className='group divide-y divide-slate-4 overflow-y-scroll flex-1'
				axis='y'
				values={items}
				onReorder={setToDos}
				layoutScroll
			>
				{items.map(todo => (
					<ReorderTodoItem key={todo.id} todo={todo} />
				))}
			</Reorder.Group>
			<RenderCounter />
		</>
	)
}

export default ToDoList
