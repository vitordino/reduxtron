import type { MenuItemConstructorOptions } from 'electron'
import type { Dispatch, State } from 'shared/reducers'
import { VisibleId } from 'shared/reducers/settings'

const toggleVisible = (dispatch: Dispatch, payload: VisibleId) => () =>
	dispatch({ type: 'SETTINGS:TOGGLE_VISIBLE', payload })

const UI_CONTROLS: VisibleId[] = ['index', 'add-to-do', 'tray']

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
