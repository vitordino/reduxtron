import { IpcRenderer } from 'electron';
import { State, Action } from './store';

type PreloadReduxMiddleware = (ipcRenderer: IpcRenderer) => {
  handlers: {
    dispatch: (action: Action) => void;
    subscribe: (callback: (newState: State) => void) => () => void;
  };
};

const preloadReduxMiddleware: PreloadReduxMiddleware = (ipcRenderer) => ({
  handlers: {
    dispatch: (action) => ipcRenderer.send('dispatch', action),
    subscribe: (callback) => {
      const subscription = (_: unknown, state: State) => callback(state);
      ipcRenderer.on('subscribe', subscription);
      return () => {
        ipcRenderer.off('subscribe', subscription);
      };
    },
  },
});

export default preloadReduxMiddleware;
