import type { Middleware } from '@reduxjs/toolkit';

const dogMiddleware: Middleware = (store) => (next) => async (action) => {
  if (action.type !== 'DOG:SELECT_FAVORITE_BREED') return next(action);
  // get favorite name into state
  const result = next(action);
  const favoriteName = store.getState()?.dog?.favorite?.name;
  if (!favoriteName) return result;
  try {
    next({ type: 'DOG:LOAD_FAVORITE_IMAGE@LOADING' });
    const res = await fetch(
      `https://dog.ceo/api/breed/${favoriteName}/images/random`
    );
    const json = await res.json();
    return next({
      type: 'DOG:LOAD_FAVORITE_IMAGE@LOADED',
      payload: json.message || 'oops',
    });
  } catch (e) {
    return next({
      type: 'DOG:LOAD_FAVORITE_IMAGE@ERROR',
      payload: e?.toString?.() || 'unknown error',
    });
  }
};

export default dogMiddleware;
