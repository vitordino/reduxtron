import compare from 'renderer/utils/compare'
import useStore from 'renderer/hooks/useStore'
import useDispatch from 'renderer/hooks/useDispatch'
import { Checkbox } from 'renderer/components/Checkbox'
import RenderCounter from 'renderer/components/RenderCounter'

const UI_CONTROLS = ['main-window', 'tray']

const UIControls = () => {
	const visible = useStore(x => x.ui?.visible, compare)
	const dispatch = useDispatch()

	return (
		<div>
			<RenderCounter />
			<ul>
				{UI_CONTROLS.map(x => (
					<li key={x}>
						<Checkbox
							id={`ui-visible-${x}`}
							checked={!!visible?.includes(x)}
							onChange={() => dispatch({ type: 'UI:TOGGLE_VISIBLE', payload: x })}
						/>
						<label htmlFor={`ui-visible-${x}`}>{x}</label>
					</li>
				))}
			</ul>
		</div>
	)
}

export default UIControls
