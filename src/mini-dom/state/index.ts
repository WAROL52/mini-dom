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

const count = createState(0);

const double = createMemo(() => (count.value % 10 == 0 ? count.value * 2 : 0));

createEffect(() => {
  console.log("double", double.value);
});

createEffect(() => {
  console.log("count", count.value);
  console.log("count", count);
});
