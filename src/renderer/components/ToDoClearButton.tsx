import { KeyboardEvent } from 'react'
import { useDispatch } from 'renderer/hooks/useDispatch'
import { getLastFocusable } from 'renderer/utils/getFocusable'

const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
	if (e.key === 'ArrowUp') {
		const item = getLastFocusable(document.getElementById('to-do-list'), -2)
		if (item) return item.focus()
		return getLastFocusable(document.getElementById('add-to-do/vanilla'))?.focus()
	}
	if (e.key === 'ArrowLeft') {
		getLastFocusable(document.getElementById('footer'), -2)?.focus()
	}
}

export const ToDoClearButton = () => {
	const dispatch = useDispatch()
	const clear = () => dispatch({ type: 'TO_DO:SET', payload: [] })

	return (
		<button
			className='px-2 py-2 text-red-8 data-[state=on]:text-red-11 focus-visible:z-10 focus-visible:outline-none focus-visible:bg-red-4 focus-visible:dark:bg-red-4'
			onClick={clear}
			onKeyDown={onKeyDown}
		>
			clear
		</button>
	)
}
