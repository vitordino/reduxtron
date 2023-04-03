import type { MenuItemConstructorOptions } from 'electron'
import type { Dispatch, State } from 'shared/reducers'

// on click actions
const pick = (dispatch: Dispatch) => () => dispatch({ type: 'FOLDER:PICK' })
const clear = (dispatch: Dispatch) => () => dispatch({ type: 'FOLDER:CLEAR' })

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
		{ type: 'separator' },
		{ label: `state: ${state.folder?.state}`, type: 'normal' },
		{ label: `path: ${state.folder?.path || 'empty'}`, type: 'normal' },
		{ label: `error: ${state.folder?.error || 'no error'}`, type: 'normal' },
		{ type: 'separator' },
		{
			label: 'clear',
			type: 'normal',
			click: clear(dispatch),
			enabled: state.folder?.state !== 'loading' && !!state.folder?.path,
		},
	],
})

export default TrayFolder
