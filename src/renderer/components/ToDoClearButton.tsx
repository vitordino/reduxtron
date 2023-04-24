import useDispatch from 'renderer/hooks/useDispatch'

const ToDoClearButton = () => {
	const dispatch = useDispatch()
	const clear = () => dispatch({ type: 'TO_DO:SET', payload: [] })

	return (
		<button
			className='px-2 py-2 text-red-8 data-[state=on]:text-red-11 focus-visible:z-10 focus-visible:outline-none focus-visible:bg-red-4 focus-visible:dark:bg-red-4'
			onClick={clear}
		>
			clear
		</button>
	)
}

export default ToDoClearButton
