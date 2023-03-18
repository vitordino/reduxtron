import { contextBridge, ipcRenderer } from 'electron';
import preloadReduxMiddleware from './preload-redux-middleware';

export type Channels = never;

const { handlers } = preloadReduxMiddleware(ipcRenderer);

const electronHandler = { ...handlers };

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
