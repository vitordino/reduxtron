import thunk from 'redux-thunk'

import { Middleware } from 'shared/reducers'
import folderMiddleware from 'main/store/middlewares/folder'
import persistanceMiddleware from 'main/store/middlewares/persistance'
import swrMiddleware from 'main/store/middlewares/swr'
import uiMiddleware from 'main/store/middlewares/ui'
import logger from './logger'

const middleware: Middleware[] = [
	thunk,
	swrMiddleware,
	folderMiddleware,
	logger,
	// persistanceMiddleware,
	uiMiddleware,
]

export default middleware
