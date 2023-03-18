import { Reducer } from '@reduxjs/toolkit';

export type uiState = { visible: string[] };

const addVisible = (state: uiState, payload: string) => {
  if (state.visible.includes(payload)) return state;
  return { ...state, visible: [...state.visible, payload] };
};

const removeVisible = (state: uiState, payload: string) => ({
  ...state,
  visible: state.visible.filter((x) => x !== payload),
});

const toggleVisible = (state: uiState, payload: string) => {
  if (state.visible.includes(payload)) return removeVisible(state, payload);
  return addVisible(state, payload);
};

const uiActions = {
  ADD_VISIBLE: addVisible,
  REMOVE_VISIBLE: removeVisible,
  TOGGLE_VISIBLE: toggleVisible,
} as const;

export type UIAction =
  | { type: 'ADD_VISIBLE'; payload: string }
  | { type: 'REMOVE_VISIBLE'; payload: string }
  | { type: 'TOGGLE_VISIBLE'; payload: string };

const uiReducer: Reducer<uiState, UIAction> = (
  state = { visible: [] },
  // @ts-expect-error
  action = { type: '' }
) => {
  if (!action?.type) return state;
  if (!(action.type in uiActions)) return state;
  return uiActions[action.type](state, action.payload);
};

export default uiReducer;
