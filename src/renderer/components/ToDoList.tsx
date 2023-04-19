import { Reorder, useMotionValue, MotionStyle } from 'framer-motion'

import compare from 'renderer/utils/compare'
import useStore from 'renderer/hooks/useStore'
import useActiveMotionValue from 'renderer/hooks/useActiveMotionStyle'
import useDispatch from 'renderer/hooks/useDispatch'
import RenderCounter from 'renderer/components/RenderCounter'
import ToDo, { ToDoProps } from 'renderer/components/ToDo'

const INACTIVE_ITEM_BG = 'transparent'
const ACTIVE_ITEM_BG = 'hsl(var(--slate4) / 1)'

const ReorderTodoItem = ({ todo }: { todo: ToDoProps }) => {
	const y = useMotionValue(0)
	const background = useActiveMotionValue(y, INACTIVE_ITEM_BG, ACTIVE_ITEM_BG)
	const zIndex = useActiveMotionValue(y, 0, 1)
	const cursor = useActiveMotionValue(y, 'grab', 'grabbing')
	const style: MotionStyle = { background, y, zIndex, position: 'relative', cursor }
	return (
		<Reorder.Item id={todo.id} value={todo} style={style}>
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
		<div>
			<Reorder.Group
				className='group divide-y divide-slate-4'
				axis='y'
				values={toDos}
				onReorder={setToDos}
			>
				{toDos.map(todo => (
					<ReorderTodoItem key={todo.id} todo={todo} />
				))}
			</Reorder.Group>
			<RenderCounter />
		</div>
	)
}

export default ToDoList
