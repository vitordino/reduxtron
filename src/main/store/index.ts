import {
  combineReducers,
  configureStore,
  applyMiddleware,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import logger from './middlewares/logger';
import counterReducer, { CounterAction } from './reducers/counter';
import toDosReducer, { ToDosAction } from './reducers/toDos';
import UIReducer, { UIAction } from './reducers/ui';
import dogReducer, { DogAction } from './reducers/dog';
import dogMiddleware from './middlewares/dog';
import persistanceMiddleware from './middlewares/persistance';
import globalReducer from './reducers/global';

const reducer = globalReducer(
  combineReducers({
    counter: counterReducer,
    toDos: toDosReducer,
    ui: UIReducer,
    dog: dogReducer,
  })
);

export type Action = CounterAction | ToDosAction | UIAction | DogAction;
export type State = ReturnType<typeof reducer>;

const store = configureStore<State, Action>({
  reducer,
  enhancers: [
    applyMiddleware(thunk, logger, dogMiddleware, persistanceMiddleware),
  ],
});

export type Store = typeof store;
export type Dispatch = Store['dispatch'];

export default store;
