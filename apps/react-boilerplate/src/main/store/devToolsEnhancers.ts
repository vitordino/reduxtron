import type { StoreEnhancer } from 'redux'
import { devToolsEnhancer as base } from '@redux-devtools/remote'
import { is } from '@electron-toolkit/utils'

export const devToolsEnhancer: StoreEnhancer = base({
	port: 3001,
	secure: false,
	realtime: is.dev,
	suppressConnectErrors: true,
	hostname: 'localhost',
})
