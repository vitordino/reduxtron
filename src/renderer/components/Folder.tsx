import compare from 'renderer/utils/compare'
import useStore from 'renderer/hooks/useStore'
import useDispatch from 'renderer/hooks/useDispatch'
import RenderCounter from 'renderer/components/RenderCounter'
import { Button } from 'renderer/components/Button'

const Folder = () => {
	const folder = useStore(x => x.folder, compare)
	const dispatch = useDispatch()
	const disabled = folder?.state === 'loading'
	return (
		<div>
			<RenderCounter />
			<Button onClick={() => dispatch({ type: 'FOLDER:PICK' })} type='button' disabled={disabled}>
				pick folder
			</Button>
			<Button
				onClick={() => dispatch({ type: 'FOLDER:CLEAR' })}
				type='button'
				intent='ghost'
				disabled={disabled || !folder?.path}
			>
				clear folder
			</Button>
			<pre>{JSON.stringify(folder)}</pre>
		</div>
	)
}

export default Folder
