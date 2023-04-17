import useStore from 'renderer/hooks/useStore'
import useDispatch from 'renderer/hooks/useDispatch'
import RenderCounter from 'renderer/components/RenderCounter'
import { Button } from 'renderer/components/Button'

const Counter = () => {
	const counter = useStore(x => x.counter)
	const dispatch = useDispatch()
	return (
		<div>
			<RenderCounter />
			<Button
				size='square-md'
				onClick={() => dispatch({ type: 'COUNTER:DECREMENT' })}
				type='button'
			>
				-
			</Button>
			<code>{counter}</code>
			<Button
				intent='ghost'
				size='square-md'
				onClick={() => dispatch({ type: 'COUNTER:INCREMENT' })}
				type='button'
			>
				+
			</Button>
		</div>
	)
}

export default Counter
