import type { MenuItemConstructorOptions } from 'electron'
import type { Dispatch, State } from 'src/shared/reducers'
import { FSData, KEY_PREFIX_MAP, SWRItem } from 'src/shared/reducers/swr'

// on click actions
const pick = (dispatch: Dispatch) => () => dispatch({ type: 'FOLDER:PICK' })
const goBack = (dispatch: Dispatch) => () => dispatch({ type: 'FOLDER:UNDO' })
const goForward = (dispatch: Dispatch) => () => dispatch({ type: 'FOLDER:REDO' })
const enclosingFolder = (dispatch: Dispatch) => () => dispatch({ type: 'FOLDER:UP' })
const selectFolder = (dispatch: Dispatch, payload: string) => () =>
	dispatch({ type: 'FOLDER:DOWN', payload })
const clear = (dispatch: Dispatch) => () => dispatch({ type: 'FOLDER:CLEAR' })

const fsPrefix = KEY_PREFIX_MAP['SWR:FETCH_FS']

export const TrayFinder = (
	state: Partial<State>,
	dispatch: Dispatch,
): MenuItemConstructorOptions => {
	const swrKey = fsPrefix + state?.folder?.present.path
	const swrEntry = state.swr?.[swrKey] as SWRItem<FSData> | undefined
	const items = swrEntry?.data || []
	if (!swrEntry) dispatch({ type: 'SWR:FETCH_FS', payload: [swrKey] })
	return {
		label: 'finder',
		type: 'submenu',
		submenu: [
			{
				label: `[${state.folder?.present?.state}] ${state.folder?.present?.path || 'empty'}`,
				type: 'normal',
				click: pick(dispatch),
				enabled: state.folder?.present?.state !== 'loading',
			},
			{ type: 'separator' },
			{
				label: 'go back',
				type: 'normal',
				click: goBack(dispatch),
				enabled: !!state.folder?.past?.length,
			},
			{
				label: 'go forward',
				type: 'normal',
				click: goForward(dispatch),
				enabled: !!state.folder?.future?.length,
			},
			{
				label: 'enclosing folder',
				type: 'normal',
				click: enclosingFolder(dispatch),
				enabled: !!state.folder?.present?.path && state.folder?.present?.state !== 'loading',
			},
			{
				label: 'clear',
				type: 'normal',
				click: clear(dispatch),
				enabled: state.folder?.present?.state !== 'loading' && !!state.folder?.present?.path,
			},
			{ type: 'separator' },
			{
				label: 'items',
				type: 'submenu',
				submenu: items
					?.sort((a, b) => +b.folder - +a.folder)
					?.map(({ name, folder }) => ({
						label: `${folder ? '📁' : '📝'} ${name}`,
						type: 'normal',
						click: folder ? selectFolder(dispatch, name) : undefined,
						disabled: !folder,
					})),
			},
		],
	}
}
