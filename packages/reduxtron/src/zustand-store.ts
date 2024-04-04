import { type StoreApi, type UseBoundStore, create } from "zustand";
import type { AnyAction } from "redux";
import type { PreloadReduxBridgeReturn, AnyState } from "./types";

export type CreateUseStore = {
  <S extends AnyState, A extends AnyAction>(
    bridge: PreloadReduxBridgeReturn<S, A>["handlers"]
  ): UseBoundStore<StoreApi<Partial<S>>>;
};

export const createUseStore: CreateUseStore = <
  S extends AnyState,
  A extends AnyAction
>(
  bridge: PreloadReduxBridgeReturn<S, A>["handlers"]
): UseBoundStore<StoreApi<Partial<S>>> =>
  create<Partial<S>>((setState) => {
    // subscribe to changes
    bridge.subscribe(setState);
    // get initial state
    bridge.getState().then(setState);

    // we don’t need to fill it with state keys because they will all come from main
    // we don’t need any actions because all the state updates also comes from main
    return {};
  });
