import { contextBridge, ipcRenderer } from 'electron'
import { preloadReduxBridge } from 'reduxtron/preload'

import type { State, Action } from 'src/shared/reducers'

const { handlers } = preloadReduxBridge<Partial<State>, Action>(ipcRenderer)

contextBridge.exposeInMainWorld('reduxtron', handlers)
