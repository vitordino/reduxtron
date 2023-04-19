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
			className='py-4 px-4 m-4 bg-slate-2 dark:bg-slate-1 rounded-lg flex space-x-2'
		>
			<Input value={title} onChange={e => setTitle(e.target.value)} placeholder='new todo' />
			<Button disabled={!title} type='submit'>
				add
			</Button>
		</form>
	)
}

export default AddToDo