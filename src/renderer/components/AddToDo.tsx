import { ChangeEvent, FormEvent } from 'react'

import useDispatch from 'renderer/hooks/useDispatch'
import { Input } from 'renderer/components/Input'
import { Button } from 'renderer/components/Button'
import useStore from 'renderer/hooks/useStore'

const AddToDo = () => {
	const draft = useStore(x => x.toDos?.draft) || ''
	const dispatch = useDispatch()

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		if (!draft) return
		await dispatch({ type: 'TO_DO:COMMIT_DRAFT' })
	}

	const onDraftChange = (e: ChangeEvent<HTMLInputElement>) =>
		dispatch({ type: 'TO_DO:SET_DRAFT', payload: e.target.value })

	return (
		<form
			onSubmit={onSubmit}
			className='p-4 border-b border-slate-4 bg-slate-2 flex space-x-2 sticky top-9 z-20'
		>
			<Input value={draft} onChange={onDraftChange} placeholder='new todo' />
			<Button disabled={!draft} type='submit'>
				add
			</Button>
		</form>
	)
}

export default AddToDo
