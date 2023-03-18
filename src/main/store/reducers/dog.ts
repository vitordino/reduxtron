import { Dispatch, Reducer } from '@reduxjs/toolkit';

export type Dog = {
  status?: 'fetching-breeds' | 'fetching-favorite' | 'idle' | 'error';
  allBreeds?: string[];
  favorite?: { name?: string; image?: string };
  error?: string;
};

export const loadAllBreeds = () => async (dispatch: Dispatch) => {
  console.log('loadAllBreeds 1');
  dispatch({ type: 'DOG:LOAD_ALL_BREEDS@LOADING' });
  console.log('loadAllBreeds 2');
  try {
    console.log('loadAllBreeds 3');
    const res = await fetch('https://dog.ceo/api/breeds/list/all');
    const json = await res.json();
    const payload = Object.keys(json?.message || {});
    dispatch({ type: 'DOG:LOAD_ALL_BREEDS@LOADED', payload });
  } catch (e) {
    dispatch({
      type: 'DOG:LOAD_ALL_BREEDS@FAILED',
      payload: e?.toString?.() || 'unknown',
    });
  }
};

export type DogAction =
  | { type: 'DOG:SELECT_FAVORITE_BREED'; payload: string }
  | { type: 'DOG:LOAD_FAVORITE_IMAGE'; payload: string }
  | { type: 'DOG:LOAD_FAVORITE_IMAGE@LOADING' }
  | { type: 'DOG:LOAD_FAVORITE_IMAGE@LOADED'; payload: string }
  | { type: 'DOG:LOAD_FAVORITE_IMAGE@ERROR'; payload: string }
  | { type: 'DOG:LOAD_ALL_BREEDS' }
  | { type: 'DOG:LOAD_ALL_BREEDS@LOADING' }
  | { type: 'DOG:LOAD_ALL_BREEDS@LOADED'; payload: string[] }
  | { type: 'DOG:LOAD_ALL_BREEDS@ERROR'; payload: string };

const dogReducer: Reducer<Dog | undefined, DogAction> = (
  state = {},
  action
) => {
  switch (action.type) {
    case 'DOG:LOAD_ALL_BREEDS@LOADING':
      return { ...state, error: undefined, status: 'fetching-breeds' };
    case 'DOG:LOAD_ALL_BREEDS@LOADED':
      return {
        ...state,
        error: undefined,
        status: 'idle',
        allBreeds: action.payload,
      };
    case 'DOG:LOAD_ALL_BREEDS@ERROR':
      return { ...state, status: 'error', error: action.payload };
    case 'DOG:SELECT_FAVORITE_BREED':
      return {
        ...state,
        error: undefined,
        favorite: { name: action.payload, image: undefined },
      };
    case 'DOG:LOAD_FAVORITE_IMAGE@LOADING':
      return {
        ...state,
        error: undefined,
        favorite: { ...state.favorite, image: undefined },
        status: 'fetching-favorite',
      };
    case 'DOG:LOAD_FAVORITE_IMAGE@ERROR':
      return {
        ...state,
        favorite: { ...state.favorite, image: undefined },
        error: action.payload,
        status: 'error',
      };
    case 'DOG:LOAD_FAVORITE_IMAGE@LOADED':
      return {
        ...state,
        favorite: { ...state.favorite, image: action.payload },
        error: undefined,
        status: 'idle',
      };
    default:
      return state;
  }
};

export default dogReducer;
