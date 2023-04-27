import compare from 'renderer/utils/compare'
import useStore from 'renderer/hooks/useStore'
import useDispatch from 'renderer/hooks/useDispatch'
import { Toolbar } from 'renderer/components/Toolbar'
import { Checkbox } from 'renderer/components/Checkbox'
import RenderCounter from 'renderer/components/RenderCounter'

const UI_ITEMS = ['main-window', 'tray']

const SettingsView = () => {
	const visible = useStore(x => x.settings?.visible, compare)
	const dispatch = useDispatch()

	return (
		<>
			<Toolbar>settings</Toolbar>
			<RenderCounter />
			<ul>
				{UI_ITEMS.map(x => (
					<li key={x}>
						<Checkbox
							id={`ui-visible-${x}`}
							checked={!!visible?.includes(x)}
							onChange={() => dispatch({ type: 'SETTINGS:TOGGLE_VISIBLE', payload: x })}
						/>
						<label htmlFor={`ui-visible-${x}`}>{x}</label>
					</li>
				))}
			</ul>
		</>
	)
}

export default SettingsView
