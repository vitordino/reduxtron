import type { MenuItemConstructorOptions } from 'electron'
import type { Dispatch, State } from '../../shared/reducers'

// on click actions
const pick = (dispatch: Dispatch) => () => dispatch({ type: 'FOLDER:PICK' })

const TrayFolder = (state: Partial<State>, dispatch: Dispatch): MenuItemConstructorOptions => ({
	label: 'folder',
	type: 'submenu',
	submenu: [
		{
			label: 'pick',
			type: 'normal',
			click: pick(dispatch),
			enabled: state.folder?.state !== 'loading',
		},
		{ label: `state: ${state.folder?.state}`, type: 'normal' },
		{ label: `path: ${state.folder?.path || 'empty'}`, type: 'normal' },
		{ label: `error: ${state.folder?.error || 'no error'}`, type: 'normal' },
	],
})

export default TrayFolder
