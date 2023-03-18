import path from 'path';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import MenuBuilder from './main-window-native-menu';
import { resolveHtmlPath, getAssetPath } from '../utils';
import mainDebugMiddleware from './main-window-debug-middleware';
import store from '../store';

const { isDebug, installExtensions } = mainDebugMiddleware();

class MainWindow {
  constructor() {
    this.instance = null;
    ipcMain.on('subscribe', async (state: unknown) =>
      this.instance?.webContents?.send('subscribe', state)
    );
    if (isDebug) installExtensions();
  }

  private instance: BrowserWindow | null;

  public create = async () => {
    if (this.instance) return;

    this.instance = new BrowserWindow({
      show: false,
      width: 1024,
      height: 728,
      icon: getAssetPath('icon.png'),
      webPreferences: {
        preload: app.isPackaged
          ? path.join(__dirname, '../preload.js')
          : path.join(__dirname, '../../../.erb/dll/preload.js'),
      },
    });

    this.instance.loadURL(resolveHtmlPath('index.html'));

    this.instance.on('ready-to-show', () => {
      if (!this.instance) {
        throw new Error('"this.instance" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        this.instance.minimize();
      } else {
        this.instance.show();
      }
    });

    this.instance.on('closed', () => {
      store.dispatch({ type: 'REMOVE_VISIBLE', payload: 'main-window' });
    });

    const menuBuilder = new MenuBuilder(this.instance);
    menuBuilder.buildMenu();

    // Open urls in the user's browser
    this.instance.webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url);
      return { action: 'deny' };
    });
  };

  public destroy = () => {
    this.instance?.destroy();
    this.instance = null;
  };

  public get isVisible() {
    return !!this.instance;
  }
}

export default new MainWindow();
