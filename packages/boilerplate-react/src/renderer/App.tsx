import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { useStore } from 'renderer/hooks/useStore'
import { useDispatch } from 'renderer/hooks/useDispatch'

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button = (props: ButtonProps) => (
	<button
		{...props}
		className='border-gray-800 border-2 rounded px-4 py-1 hover:bg-gray-800 hover:text-white focus-visible:bg-gray-800 focus-visible:text-white'
	/>
)

export const App = () => {
	const counter = useStore(x => x.counter)
	const dispatch = useDispatch()
	const onDecrement = () => dispatch({ type: 'COUNTER:DECREMENT' })
	const onIncrement = () => dispatch({ type: 'COUNTER:INCREMENT' })
	return (
		<main className='h-screen flex flex-col items-center justify-center'>
			<Button onClick={onDecrement}>decrement</Button>
			<pre>{counter ?? 'loading'}</pre>
			<Button onClick={onIncrement}>increment</Button>
		</main>
	)
}
