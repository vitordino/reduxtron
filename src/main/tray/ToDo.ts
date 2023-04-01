import { MenuItemConstructorOptions } from 'electron'
import store, { State } from '../store'

const toggleToDo = (id: string) => () => store.dispatch({ type: 'TO_DO:TOGGLE', payload: id })

const TrayToDo = (state: State): MenuItemConstructorOptions => ({
	label: 'to do',
	type: 'submenu',
	submenu: state.toDos.map(({ id, title, completed }) => ({
		label: title,
		type: 'checkbox',
		checked: completed,
		click: toggleToDo(id),
	})),
})

export default TrayToDo
