import compare from 'renderer/utils/compare'
import useStore from 'renderer/store'
import useDispatch from 'renderer/hooks/useDispatch'
import RenderCounter from 'renderer/components/RenderCounter/RenderCounter'

const Folder = () => {
	const folder = useStore(x => x.folder, compare)
	const dispatch = useDispatch()
	const disabled = folder?.state === 'loading'
	return (
		<div>
			<RenderCounter />
			<button onClick={() => dispatch({ type: 'FOLDER:PICK' })} type='button' disabled={disabled}>
				pick folder
			</button>
			<button
				onClick={() => dispatch({ type: 'FOLDER:CLEAR' })}
				type='button'
				disabled={disabled || !folder?.path}
			>
				clear folder
			</button>
			<pre>{JSON.stringify(folder)}</pre>
		</div>
	)
}

export default Folder
