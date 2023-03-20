// inspiration: https://swr.vercel.app/docs/api
import type { Reducer } from '@reduxjs/toolkit';

const DEDUPING_INTERVAL = 2000;

const shouldRevalidate = (item?: SWRItem): boolean => {
  if (!item) return true;
  if (item.state === 'loading') return false;
  if (item.state === 'revalidating') return false;
  const now = Date.now();

  if (
    item.revalidateOn.includes('stale') &&
    item.timestamp + DEDUPING_INTERVAL < now
  ) {
    return true;
  }

  return false;
};

export type SWRState = 'idle' | 'loading' | 'revalidating' | 'error';

export type RevalidateEvents = 'stale' | 'focus' | 'reconnect' | 'auth';

export type SWRItemOptions = {
  revalidateOn: RevalidateEvents[];
};

const DEFAULT_SWR_ITEM_OPTIONS: SWRItemOptions = {
  revalidateOn: ['stale', 'reconnect', 'focus'],
};

export type SWRItem = {
  state: SWRState;
  data: Record<string, unknown> | null | undefined;
  error: string | null;
  timestamp: number;
} & SWRItemOptions;

export type SWRStore = Record<string, SWRItem>;

export type SWRAction =
  | {
      type: 'SWR:FETCH_URL';
      payload: [string] | [string, SWRItemOptions];
    }
  | { type: 'SWR:FETCH_URL@LOADED'; payload: [string, SWRItem['data']] }
  | { type: 'SWR:FETCH_URL@ERROR'; payload: [string, SWRItem['error']] }
  // unused for now:
  | { type: 'SWR:FETCH_URL@LOADING'; payload: [string] }
  | { type: 'SWR:FETCH_URL@REVALIDATING'; payload: [string] }
  | {
      type: 'SWR:FETCH_URL@MUTATE';
      payload: [string] | [string, SWRItem['data']];
    };

const swrReducer: Reducer<SWRStore, SWRAction> = (
  state = {},
  { type, payload }
) => {
  if (!type.startsWith('SWR:')) return state;
  const key = payload[0];
  const item = state[key];
  switch (type) {
    case 'SWR:FETCH_URL': {
      const options = payload[1] || DEFAULT_SWR_ITEM_OPTIONS;
      if (!item) {
        return {
          ...state,
          [key]: {
            ...options,
            state: 'loading',
            timestamp: 0,
            data: undefined,
            error: null,
          },
        };
      }

      if (item?.data && !shouldRevalidate(item)) return state;
      const itemState = item.data ? 'revalidating' : 'loading';
      return { ...state, [key]: { ...options, ...item, state: itemState } };
    }

    case 'SWR:FETCH_URL@LOADING': {
      return {
        ...state,
        [key]: {
          ...item,
          data: undefined,
          error: null,
          state: 'loading',
        },
      };
    }

    case 'SWR:FETCH_URL@REVALIDATING': {
      return {
        ...state,
        [key]: {
          ...item,
          state: 'revalidating',
        },
      };
    }

    case 'SWR:FETCH_URL@LOADED': {
      const data = payload[1];
      return {
        ...state,
        [key]: {
          ...item,
          error: null,
          data,
          state: 'idle',
          timestamp: Date.now(),
        },
      };
    }

    case 'SWR:FETCH_URL@ERROR': {
      const error = payload[1];
      return {
        ...state,
        [key]: {
          ...item,
          error,
          data: undefined,
          state: 'error',
          timestamp: Date.now(),
        },
      };
    }

    case 'SWR:FETCH_URL@MUTATE': {
      const optimisticData = payload[1];
      return {
        ...state,
        [key]: {
          ...item,
          error: null,
          data: optimisticData,
          state: 'revalidating',
        },
      };
    }

    default:
      return state;
  }
};

export default swrReducer;