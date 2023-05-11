import type { StoreEnhancer } from 'redux'
import { devToolsEnhancer } from '@redux-devtools/remote'
import { is } from '@electron-toolkit/utils'

const devTools = devToolsEnhancer({
	port: 3001,
	secure: false,
	realtime: is.dev,
	suppressConnectErrors: true,
	hostname: 'localhost',
})

export const enhancers: [StoreEnhancer] = [devTools]
