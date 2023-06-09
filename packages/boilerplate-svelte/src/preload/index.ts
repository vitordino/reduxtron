import { contextBridge, ipcRenderer } from 'electron'
import { preloadReduxBridge } from 'reduxtron/preload'

import type { State, Action } from 'shared/reducers'

export const { handlers } = preloadReduxBridge<Partial<State>, Action>(ipcRenderer)

contextBridge.exposeInMainWorld('electron', handlers)
