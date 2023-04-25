import { dialog, OpenDialogOptions } from 'electron'
import { Middleware } from 'shared/reducers'

const properties: OpenDialogOptions['properties'] = [
	'openDirectory',
	'createDirectory',
	'promptToCreate',
]

const folderMiddleware: Middleware = store => next => async action => {
	if (action.type !== 'FOLDER:PICK') return next(action)
	const defaultPath = store.getState()?.folder?.path
	// get to initial loading state
	next(action)
	try {
		const { canceled, filePaths } = await dialog.showOpenDialog({ defaultPath, properties })
		if (canceled) return next({ type: 'FOLDER:PICK@ERROR', payload: 'canceled' })
		return next({ type: 'FOLDER:PICK@LOADED', payload: filePaths[0] })
	} catch (e) {
		return next({
			type: 'FOLDER:PICK@ERROR',
			payload: e?.toString?.() || 'unknown error',
		})
	}
}

export default folderMiddleware
