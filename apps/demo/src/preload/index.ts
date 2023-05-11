import { contextBridge, ipcRenderer } from 'electron'
import { preloadReduxBridge } from './preload-redux-bridge'
import { State, Action } from 'shared/reducers'

export const { handlers } = preloadReduxBridge<Partial<State>, Action>(ipcRenderer)

contextBridge.exposeInMainWorld('electron', handlers)
