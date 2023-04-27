import type { MenuItemConstructorOptions } from 'electron'
import nativePrompt from 'native-prompt'
import type { Dispatch, State } from 'shared/reducers'
import { ToDo } from 'shared/reducers/toDos'

const toggleToDo = (dispatch: Dispatch, id: string) => () =>
	dispatch({ type: 'TO_DO:TOGGLE', payload: id })

const Item =
	(dispatch: Dispatch) =>
	({ id, title, completed }: ToDo): MenuItemConstructorOptions => ({
		label: title,
		type: 'checkbox',
		checked: completed,
		click: toggleToDo(dispatch, id),
	})

const addToDo = (state: Partial<State>, dispatch: Dispatch) => async () => {
	const defaultText = state.toDos?.draft
	const payload = await nativePrompt('create to do', 'fill with content', { defaultText })
	if (!payload) return
	dispatch({ type: 'TO_DO:CREATE', payload })
	dispatch({ type: 'TO_DO:SET_DRAFT', payload: '' })
}

export const TrayToDo = (state: Partial<State>, dispatch: Dispatch): MenuItemConstructorOptions => {
	const items = state?.toDos?.items || []

	return {
		label: 'to do',
		type: 'submenu',
		submenu: [
			{ label: 'add to do', type: 'normal', click: addToDo(state, dispatch) },
			{ type: 'separator' },
			...items.map(Item(dispatch)),
		],
	}
}
