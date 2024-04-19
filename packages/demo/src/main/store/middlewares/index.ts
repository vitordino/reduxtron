import thunk from 'redux-thunk'

import { Middleware } from 'src/shared/reducers'
import { folderMiddleware } from 'src/main/store/middlewares/folder'
import { persistanceMiddleware } from 'src/main/store/middlewares/persistance'
import { swrMiddleware } from 'src/main/store/middlewares/swr'
import { uiMiddleware } from 'src/main/store/middlewares/ui'

export const middleware: Middleware[] = [
	thunk,
	swrMiddleware,
	folderMiddleware,
	persistanceMiddleware,
	uiMiddleware,
]
