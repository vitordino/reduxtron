import type { MenuItemConstructorOptions } from 'electron'
import type { Dispatch, State } from 'shared/reducers'

const toggleVisible = (dispatch: Dispatch, payload: string) => () =>
	dispatch({ type: 'SETTINGS:TOGGLE_VISIBLE', payload })

const UI_CONTROLS = ['main-window', 'tray']

export const TraySettingsMenu = (
	state: Partial<State>,
	dispatch: Dispatch,
): MenuItemConstructorOptions => ({
	label: 'settings',
	type: 'submenu',
	submenu: UI_CONTROLS.map(id => ({
		label: id,
		type: 'checkbox',
		checked: !!state.settings?.visible?.includes(id),
		click: toggleVisible(dispatch, id),
	})),
})
