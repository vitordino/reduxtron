import { FormEvent, useState } from 'react'

import useDispatch from 'renderer/hooks/useDispatch'

const AddToDo = () => {
	const [title, setTitle] = useState('')
	const dispatch = useDispatch()

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		await dispatch({ type: 'CREATE_TO_DO', payload: title })
		setTitle('')
	}

	return (
		<form onSubmit={onSubmit}>
			<input value={title} onChange={e => setTitle(e.target.value)} />
			<button type='submit'>add</button>
		</form>
	)
}

export default AddToDo
