/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import { app, ipcMain } from "electron";
import { mainReduxBridge } from "reduxtron/main";
import { Window } from "main/window/window";
import { store } from "main/store";
import { tray } from "main/tray/tray";

const { unsubscribe } = mainReduxBridge(ipcMain, store);

tray.setState(store.getState());
tray.setDispatch(store.dispatch);
store.subscribe(() => tray.setState(store.getState()));

const mainWindow = new Window();

/**
 * Add event listeners...
 */
app.on("window-all-closed", () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app
  .whenReady()
  .then(async () => {
    app.on("activate", () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      mainWindow.create();
      mainWindow.focus();
    });

    app.on("quit", unsubscribe);

    mainWindow.create();
    mainWindow.focus();
    tray.create();
  })
  // eslint-disable-next-line no-console
  .catch(console.error);
