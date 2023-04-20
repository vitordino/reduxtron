import { FormEvent, useState } from 'react'

import useDispatch from 'renderer/hooks/useDispatch'
import { Input } from 'renderer/components/Input'
import { Button } from 'renderer/components/Button'

const AddToDo = () => {
	const [title, setTitle] = useState('')
	const dispatch = useDispatch()

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		if (!title) return
		await dispatch({ type: 'TO_DO:CREATE', payload: title })
		setTitle('')
	}

	return (
		<form
			onSubmit={onSubmit}
			className='p-4 border-b border-slate-4 bg-slate-2 flex space-x-2 sticky top-9 z-10'
		>
			<Input value={title} onChange={e => setTitle(e.target.value)} placeholder='new todo' />
			<Button disabled={!title} type='submit'>
				add
			</Button>
		</form>
	)
}

export default AddToDo
