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
	return (
		<Reorder.Item
			data-dragging={isDragging}
			id={todo.id}
			value={todo}
			className='relative cursor-grab data-[dragging=true]:bg-slate-2 dark:data-[dragging=true]:bg-slate-1 data-[dragging=true]:cursor-grabbing'
			style={{ y }}
		>
			<ToDo {...todo} />
		</Reorder.Item>
	)
}

const ToDoList = () => {
	const toDos = useStore(x => x.toDos, compare)
	const dispatch = useDispatch()

	const setToDos = (payload?: typeof toDos) => {
		if (!payload) return
		dispatch({ type: 'TO_DO:SET', payload })
	}

	if (!toDos?.length) {
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
				className='group divide-y divide-slate-4 h-[fill-available] overflow-auto'
				axis='y'
				values={toDos}
				onReorder={setToDos}
			>
				{toDos.map(todo => (
					<ReorderTodoItem key={todo.id} todo={todo} />
				))}
			</Reorder.Group>
			<RenderCounter />
		</>
	)
}

export default ToDoList
