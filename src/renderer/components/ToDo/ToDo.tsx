import type { ToDo as TodoType } from 'shared/reducers/toDos'
import useDispatch from 'renderer/hooks/useDispatch'

const ToDo = ({ id, title, completed }: TodoType) => {
	const dispatch = useDispatch()
	const toggle = () => dispatch({ type: 'TO_DO:TOGGLE', payload: id })
	const remove = () => dispatch({ type: 'TO_DO:REMOVE', payload: id })
	return (
		<div>
			<input id={id} type='checkbox' checked={completed} onChange={toggle} />
			<label htmlFor={id}>{title} </label>
			<button type='button' onClick={remove}>
				🗑️
			</button>
		</div>
	)
}

export default ToDo
