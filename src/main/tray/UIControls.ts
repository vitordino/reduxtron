import type { MenuItemConstructorOptions } from 'electron';
import store, { State } from '../store';

const toggleVisible = (payload: string) =>
  store.dispatch({ type: 'TOGGLE_VISIBLE', payload });

const UI_CONTROLS = ['main-window', 'tray'];

const TrayUIControls = (state: State): MenuItemConstructorOptions => ({
  label: 'ui',
  type: 'submenu',
  submenu: UI_CONTROLS.map((id) => ({
    label: id,
    type: 'checkbox',
    checked: !!state.ui?.visible?.includes(id),
    click: () => toggleVisible(id),
  })),
});

export default TrayUIControls;
