import { ChangeEvent, FormEvent, KeyboardEvent } from 'react'
import { RxInput, RxPlus } from 'react-icons/rx'

import { focusById } from 'renderer/utils/focusChildElement'
import { useStore } from 'renderer/hooks/useStore'
import { useDispatch } from 'renderer/hooks/useDispatch'
import { Input } from 'renderer/components/Input'
import { Button } from 'renderer/components/Button'
import { FOCUSABLE_SELECTOR, getFocusable } from 'renderer/utils/getFocusable'

const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
	// @ts-expect-error react didn’t typed selectionStart + end + value
	if (e.key === 'ArrowLeft' && !e.target.selectionStart && !e.target.selectionEnd)
		return focusById('sidebar')
	// @ts-expect-error react didn’t typed selectionStart + end + value
	if (e.key === 'ArrowRight' && e.target.selectionStart === e.target?.value?.length) {
		const next = e.currentTarget.nextElementSibling as HTMLElement | null
		const nextIsFocusable = next?.matches(FOCUSABLE_SELECTOR)
		if (next && nextIsFocusable) return next.focus()
		return (e.currentTarget?.nextElementSibling?.nextElementSibling as HTMLElement | null)?.focus()
	}
	if (e.key === 'ArrowDown') {
		const toDoListFocusable = getFocusable(document.getElementById('to-do-list'))
		if (toDoListFocusable) return toDoListFocusable.focus()
		return focusById('footer')
	}
}
const onButtonKeyDown = e => {
	if (e.key === 'ArrowLeft') {
		const prev = e.currentTarget.previousElementSibling as HTMLElement | null
		const prevIsFocusable = prev?.matches(FOCUSABLE_SELECTOR)
		if (prev && prevIsFocusable) return prev.focus()
		return (
			e.currentTarget?.previousElementSibling?.previousElementSibling as HTMLElement | null
		)?.focus()
	}
	if (e.key === 'ArrowRight') {
		return (e.currentTarget.nextElementSibling as HTMLElement | null)?.focus()
	}
	if (e.key === 'ArrowDown') {
		const toDoListFocusable = getFocusable(document.getElementById('to-do-list'))
		if (toDoListFocusable) return toDoListFocusable.focus()
		return focusById('footer')
	}
}

export const AddToDo = () => {
	const draft = useStore(x => x.toDos?.draft) || ''
	const dispatch = useDispatch()

	const onTodoWindow = () =>
		dispatch({ type: 'SETTINGS:ADD_VISIBLE', payload: 'add-to-do/vanilla' })

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		if (!draft) return
		await dispatch({ type: 'TO_DO:COMMIT_DRAFT' })
		focusById('add-to-do/vanilla')
	}

	const onDraftChange = (e: ChangeEvent<HTMLInputElement>) =>
		dispatch({ type: 'TO_DO:SET_DRAFT', payload: e.target.value })

	return (
		<form
			onSubmit={onSubmit}
			className='p-4 border-b border-slate-4 bg-slate-2 flex space-x-2 sticky top-9 z-20'
			id='add-to-do/vanilla'
		>
			<Input
				id='add-to-do/vanilla-input'
				onKeyDown={onInputKeyDown}
				value={draft}
				onChange={onDraftChange}
				placeholder='new todo'
				autoFocus
			/>
			<Button
				size='square-md'
				id='add-to-do/vanilla-button'
				onKeyDown={onButtonKeyDown}
				disabled={!draft}
				type='submit'
			>
				<RxPlus />
			</Button>
			<Button
				size='square-md'
				id='add-to-do/vanilla-prompt'
				onKeyDown={onButtonKeyDown}
				onClick={onTodoWindow}
				type='button'
			>
				<RxInput />
			</Button>
		</form>
	)
}
