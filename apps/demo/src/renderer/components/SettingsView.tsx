import { compare } from 'renderer/utils/compare'
import { useStore } from 'renderer/hooks/useStore'
import { useDispatch } from 'renderer/hooks/useDispatch'
import { Toolbar } from 'renderer/components/Toolbar'
import { Checkbox } from 'renderer/components/Checkbox'
import { WINDOW_PATHS, WindowPath } from 'shared/reducers/settings'

export const SettingsView = () => {
	const trayVisible = useStore(x => x.settings?.tray.visible)
	const windows = useStore(x => x.settings?.windows, compare)
	const dispatch = useDispatch()
	const windowValues = Object.values(windows || {})
	const getChecked = (path: WindowPath) => windowValues.some(x => x.path === path)
	const onWindowClick = (path: WindowPath) => () =>
		dispatch({ type: 'SETTINGS:TOGGLE_WINDOWS_BY_PATH', payload: { path } })

	return (
		<>
			<Toolbar>settings</Toolbar>
			<ul>
				{WINDOW_PATHS.map((path, i) => (
					<li key={path}>
						<Checkbox
							autoFocus={!i}
							id={`ui-visible-${path}`}
							checked={getChecked(path)}
							onChange={onWindowClick(path)}
						/>
						<label htmlFor={`ui-visible-${path}`}>{path}</label>
					</li>
				))}
				<li>
					<Checkbox
						checked={!!trayVisible}
						id='ui-visible-tray'
						onChange={() => dispatch({ type: 'SETTINGS:TOGGLE_TRAY_VISIBLE' })}
					/>
					<label htmlFor='ui-visible-tray'>tray</label>
				</li>
			</ul>
		</>
	)
}
