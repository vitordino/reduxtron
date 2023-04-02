import type { MenuItemConstructorOptions } from 'electron'
import type { Dispatch, State } from '../../shared/reducers'

const toggleVisible = (dispatch: Dispatch, payload: string) => () =>
	dispatch({ type: 'UI:TOGGLE_VISIBLE', payload })

const UI_CONTROLS = ['main-window', 'tray']

const TrayUIControls = (state: State, dispatch: Dispatch): MenuItemConstructorOptions => ({
	label: 'ui',
	type: 'submenu',
	submenu: UI_CONTROLS.map(id => ({
		label: id,
		type: 'checkbox',
		checked: !!state.ui?.visible?.includes(id),
		click: toggleVisible(dispatch, id),
	})),
})

export default TrayUIControls
