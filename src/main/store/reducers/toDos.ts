import { Reducer } from '@reduxjs/toolkit';
import { uid } from 'uid';

export type ToDo = { id: string; title: string; completed: boolean };

const createToDo = (state: ToDo[], title: string) => [
  ...state,
  { id: uid(), completed: false, title },
];

const removeToDo = (state: ToDo[], id: string) =>
  state.filter((x) => x.id !== id);

const toggleToDo = (state: ToDo[], id: string) => {
  const indexToChange = state.findIndex((x) => x.id === id);
  const selected = state[indexToChange];
  return [
    ...state.slice(0, indexToChange),
    { ...selected, completed: !selected.completed },
    ...state.slice(indexToChange + 1),
  ];
};

const setToDos = (state: ToDo[], newState: ToDo[]) => newState;

const toDoActions = {
  CREATE_TO_DO: createToDo,
  REMOVE_TO_DO: removeToDo,
  TOGGLE_TO_DO: toggleToDo,
  SET_TO_DOS: setToDos,
} as const;

export type ToDosAction =
  | { type: 'CREATE_TO_DO'; payload: string }
  | { type: 'REMOVE_TO_DO'; payload: string }
  | { type: 'TOGGLE_TO_DO'; payload: string }
  | { type: 'SET_TO_DOS'; payload: ToDo[] };

const toDosReducer: Reducer<ToDo[], ToDosAction> = (
  state = [],
  // @ts-expect-error
  action = { type: '' }
) => {
  if (!action?.type) return state;
  if (action.type in toDoActions) {
    // @ts-expect-error
    return toDoActions[action.type](state, action.payload);
  }

  return state;
};

export default toDosReducer;
