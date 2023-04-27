import { contextBridge, ipcRenderer } from 'electron'
import { preloadReduxMiddleware } from './preload-redux-middleware'

export type Channels = never

const { handlers } = preloadReduxMiddleware(ipcRenderer)

contextBridge.exposeInMainWorld('electron', handlers)
