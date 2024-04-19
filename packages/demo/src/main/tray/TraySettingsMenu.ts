import type { MenuItemConstructorOptions } from 'electron'
import type { Dispatch, State } from 'src/shared/reducers'
import { WINDOW_PATHS } from 'src/shared/reducers/settings'

export const TraySettingsMenu = (
	state: Partial<State>,
	dispatch: Dispatch,
): MenuItemConstructorOptions => ({
	label: 'settings',
	type: 'submenu',
	submenu: [
		...WINDOW_PATHS.map(
			path =>
				({
					label: path,
					type: 'checkbox',
					checked: Object.values(state.settings?.windows || {}).some(x => x.path === path),
					click: () => dispatch({ type: 'SETTINGS:TOGGLE_WINDOWS_BY_PATH', payload: { path } }),
				}) as const,
		),
		{ type: 'separator' },
		{
			type: 'checkbox',
			label: 'tray',
			checked: state.settings?.tray.visible,
			click: () => dispatch({ type: 'SETTINGS:TOGGLE_TRAY_VISIBLE' }),
		},
	],
})
