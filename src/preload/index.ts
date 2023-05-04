import { contextBridge, ipcRenderer } from 'electron'
import { preloadReduxMiddleware } from './preload-redux-middleware'
import { State, Action } from 'shared/reducers'

export const { handlers } = preloadReduxMiddleware<Partial<State>, Action>(ipcRenderer)

contextBridge.exposeInMainWorld('electron', handlers)
