import thunk from 'redux-thunk'

import { Middleware } from 'shared/reducers'
import { folderMiddleware } from 'main/store/middlewares/folder'
import { persistanceMiddleware } from 'main/store/middlewares/persistance'
import { swrMiddleware } from 'main/store/middlewares/swr'
import { uiMiddleware } from 'main/store/middlewares/ui'

export const middleware: Middleware[] = [
	thunk,
	swrMiddleware,
	folderMiddleware,
	persistanceMiddleware,
	uiMiddleware,
]
