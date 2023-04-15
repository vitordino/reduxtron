import { FormEvent, useState } from 'react'

import useDispatch from 'renderer/hooks/useDispatch'
import { Button } from 'renderer/components/Button'

const AddToDo = () => {
	const [title, setTitle] = useState('')
	const dispatch = useDispatch()

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		await dispatch({ type: 'TO_DO:CREATE', payload: title })
		setTitle('')
	}

	return (
		<form onSubmit={onSubmit}>
			<input type='text' value={title} onChange={e => setTitle(e.target.value)} />
			<Button type='submit'>add</Button>
		</form>
	)
}

export default AddToDo
