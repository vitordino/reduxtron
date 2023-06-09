import type { MenuItemConstructorOptions } from 'electron'
import type { Dispatch, State } from 'shared/reducers'
import { WINDOW_PATHS, WindowPath } from 'shared/reducers/settings'
import { ToDo } from 'shared/reducers/toDos'

const ADD_TO_DO_PREFIX = 'add-to-do/'
const ADD_TO_DO_IDS = WINDOW_PATHS.filter(x => x.startsWith(ADD_TO_DO_PREFIX))

const openWindow = (dispatch: Dispatch, id: WindowPath) => () =>
	dispatch({ type: 'SETTINGS:CREATE_WINDOW', payload: { path: id } })

const toggleToDo = (dispatch: Dispatch, id: string) => () =>
	dispatch({ type: 'TO_DO:TOGGLE', payload: id })

const AddToDoWindowItem = (dispatch: Dispatch) => (id: WindowPath, open: boolean) =>
	({
		label: id.replace(ADD_TO_DO_PREFIX, ''),
		type: 'checkbox',
		checked: open,
		click: openWindow(dispatch, id),
	} as const)

const Item =
	(dispatch: Dispatch) =>
	({ id, title, completed }: ToDo): MenuItemConstructorOptions => ({
		label: title,
		type: 'checkbox',
		checked: completed,
		click: toggleToDo(dispatch, id),
	})

export const TrayToDo = (state: Partial<State>, dispatch: Dispatch): MenuItemConstructorOptions => {
	const items = state?.toDos?.items || []

	return {
		label: 'to do',
		type: 'submenu',
		submenu: [
			{
				label: 'add to do',
				type: 'submenu',
				submenu: [
					...ADD_TO_DO_IDS.map(x =>
						AddToDoWindowItem(dispatch)(
							x,
							Object.values(state.settings?.windows || {}).some(y => y.path === x),
						),
					),
				],
			},
			{ type: 'separator' },
			...items.map(Item(dispatch)),
		],
	}
}
