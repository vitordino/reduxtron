import type { ToDo as TodoType } from 'shared/reducers/toDos'
import { RxCross2 } from 'react-icons/rx'
import useDispatch from 'renderer/hooks/useDispatch'
import { Checkbox } from 'renderer/components/Checkbox'
import { Button } from 'renderer/components/Button'

const ToDo = ({ id, title, completed }: TodoType) => {
	const dispatch = useDispatch()
	const toggle = () => dispatch({ type: 'TO_DO:TOGGLE', payload: id })
	const remove = () => dispatch({ type: 'TO_DO:REMOVE', payload: id })
	return (
		<div className='group flex items-center w-full px-3 py-2'>
			<Checkbox className='block' id={id} checked={completed} onChange={toggle} />
			<div className='mx-3 flex-1'>{title}</div>
			<Button className='block' intent='ghost' size='square-xs' type='button' onClick={remove}>
				<RxCross2 className='icon-size' />
			</Button>
		</div>
	)
}

export default ToDo
