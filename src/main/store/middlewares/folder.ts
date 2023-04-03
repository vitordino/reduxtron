import { dialog } from 'electron/main'
import { Middleware } from 'shared/reducers'

const folderMiddleware: Middleware = _store => next => async action => {
	if (action.type !== 'FOLDER:PICK') return next(action)
	// get to initial loading state
	next(action)
	try {
		const res = await dialog.showOpenDialog({
			properties: ['openDirectory', 'createDirectory', 'promptToCreate'],
		})
		if (res.canceled) {
			return next({ type: 'FOLDER:PICK@ERROR', payload: 'canceled' })
		}
		const payload = res.filePaths[0]
		return next({ type: 'FOLDER:PICK@LOADED', payload })
	} catch (e) {
		return next({
			type: 'FOLDER:PICK@ERROR',
			payload: e?.toString?.() || 'unknown error',
		})
	}
}

export default folderMiddleware
