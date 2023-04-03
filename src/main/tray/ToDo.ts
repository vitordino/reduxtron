import type { MenuItemConstructorOptions } from 'electron'
import type { Dispatch, State } from 'shared/reducers'

const toggleToDo = (dispatch: Dispatch, id: string) => () =>
	dispatch({ type: 'TO_DO:TOGGLE', payload: id })

const TrayToDo = (state: Partial<State>, dispatch: Dispatch): MenuItemConstructorOptions => ({
	label: 'to do',
	type: 'submenu',
	submenu: (state.toDos || [])?.map(({ id, title, completed }) => ({
		label: title,
		type: 'checkbox',
		checked: completed,
		click: toggleToDo(dispatch, id),
	})),
})

export default TrayToDo
