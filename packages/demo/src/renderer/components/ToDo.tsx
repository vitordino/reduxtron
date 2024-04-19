import type { ToDo as TodoType } from 'src/shared/reducers/toDos'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch } from 'src/renderer/hooks/useDispatch'
import { Checkbox } from 'src/renderer/components/Checkbox'
import { Button } from 'src/renderer/components/Button'

export type ToDoProps = TodoType

export const ToDo = ({ id, title, completed }: ToDoProps) => {
	const dispatch = useDispatch()
	const toggle = () => dispatch({ type: 'TO_DO:TOGGLE', payload: id })
	const remove = () => dispatch({ type: 'TO_DO:REMOVE', payload: id })
	return (
		<div className='group flex items-center w-full px-3 py-2 space-x-3'>
			<Checkbox
				onKeyDown={e => {
					if (e.key !== 'Enter') return
					e.preventDefault()
					dispatch({
						type: 'SETTINGS:UPSERT_WINDOW_BY_ID_PROP',
						payload: { path: 'edit-to-do/index', props: { id } },
					})
				}}
				className='block'
				id={id}
				checked={completed}
				onChange={toggle}
			/>
			<div
				onClick={() =>
					dispatch({
						type: 'SETTINGS:UPSERT_WINDOW_BY_ID_PROP',
						payload: { path: 'edit-to-do/index', props: { id } },
					})
				}
				className='flex-1'
			>
				{title}
			</div>
			<Button className='block' intent='ghost' size='square-xs' type='button' onClick={remove}>
				<RxCross2 className='icon-size' />
			</Button>
		</div>
	)
}
