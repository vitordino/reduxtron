import { create } from "zustand";
import { PreloadReduxBridgeReturn } from "./preload";
import { AnyAction } from "redux";

type AnyState = Record<string, unknown>;

export const createUseStore = <S extends AnyState, A extends AnyAction>(
  bridge: PreloadReduxBridgeReturn<S, A>["handlers"]
) =>
  create<Partial<S>>((setState) => {
    // subscribe to changes
    bridge.subscribe(setState);
    // get initial state
    bridge.getState().then(setState);

    // we don’t need to fill it with state keys because they will all come from main
    // we don’t need any actions because all the state updates also comes from main
    return {};
  });
