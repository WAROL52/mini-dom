import { State, type FnEffect, type FnMemo } from "./state";

export function createState<T>(value: T) {
  return new State(value);
}

export function createEffect(fn: FnEffect) {
  return State.effect(fn);
}

export function createMemo<T>(fn: FnMemo<T>): State<T> {
  const state = createState<T | undefined>(undefined);
  createEffect(() => {
    state.value = fn();
  });
  return state as State<T>;
}
