import { contextBridge, ipcRenderer } from 'electron'
import { preloadReduxMiddleware } from './preload-redux-middleware'
import { Action, Store } from 'shared/reducers'

const { handlers } = preloadReduxMiddleware<Store, Action>(ipcRenderer)

contextBridge.exposeInMainWorld('electron', handlers)
