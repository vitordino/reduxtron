import { compare } from 'renderer/utils/compare'
import { useStore } from 'renderer/hooks/useStore'
import { useDispatch } from 'renderer/hooks/useDispatch'
import { Toolbar } from 'renderer/components/Toolbar'
import { Checkbox } from 'renderer/components/Checkbox'
import { VisibleId } from 'shared/reducers/settings'

const UI_ITEMS: VisibleId[] = ['index', 'todo-add', 'tray']

export const SettingsView = () => {
	const visible = useStore(x => x.settings?.visible, compare)
	const dispatch = useDispatch()

	return (
		<>
			<Toolbar>settings</Toolbar>
			<ul>
				{UI_ITEMS.map((x, i) => (
					<li key={x}>
						<Checkbox
							autoFocus={!i}
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
