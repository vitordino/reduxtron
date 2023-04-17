import { Reorder } from 'framer-motion'

import compare from 'renderer/utils/compare'
import useStore from 'renderer/hooks/useStore'
import useDispatch from 'renderer/hooks/useDispatch'
import RenderCounter from 'renderer/components/RenderCounter'
import ToDo from 'renderer/components/ToDo'

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
			<RenderCounter />
			<Reorder.Group
				className='group divide-y divide-slate-4'
				axis='y'
				values={toDos}
				onReorder={setToDos}
			>
				{toDos.map(item => (
					<Reorder.Item key={item.id} value={item}>
						<ToDo {...item} />
					</Reorder.Item>
				))}
			</Reorder.Group>
		</div>
	)
}

export default ToDoList
