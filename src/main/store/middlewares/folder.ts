import { dialog, OpenDialogOptions } from 'electron'
import { Middleware } from 'shared/reducers'

const properties: OpenDialogOptions['properties'] = [
	'openDirectory',
	'createDirectory',
	'promptToCreate',
]

const folderMiddleware: Middleware = store => next => async action => {
	if (action.type !== 'FOLDER:PICK') return next(action)
	// get to initial loading state
	next(action)
	const defaultPath = store.getState()?.folder?.path
	try {
		const { canceled, filePaths } = await dialog.showOpenDialog({ defaultPath, properties })
		if (canceled) return next({ type: 'FOLDER:PICK@ERROR', payload: 'canceled' })
		const payload = filePaths[0]
		return next({ type: 'FOLDER:PICK@LOADED', payload })
	} catch (e) {
		return next({
			type: 'FOLDER:PICK@ERROR',
			payload: e?.toString?.() || 'unknown error',
		})
	}
}

export default folderMiddleware
