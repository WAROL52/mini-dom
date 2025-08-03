export type FnDispose = () => void;
export type FnOnChange<T> = (newValue: T, oldValue: T) => void;
export type FnEffect = () => void;
export type FnMemo<T> = () => T;

class ReadOnlyState {
  constructor() {}
}

export type RState = typeof ReadOnlyState;

export class State<T> {
  #value: T;
  #listener: Map<FnDispose, FnOnChange<T>>;
  static #statesCalled: Set<State<any>> = new Set();
  static effect(fn: FnEffect) {
    const fnDisposes: Array<FnDispose> = [];
    const oldStates = this.#statesCalled;
    this.#statesCalled = new Set();
    fn();
    this.#statesCalled.forEach((state) => {
      fnDisposes.push(state.onChange(() => fn()));
    });
    this.#statesCalled = oldStates;
    return () => fnDisposes.forEach((fn) => fn());
  }
  constructor(value: T) {
    this.#value = value;
    this.#listener = new Map();
  }

  public get value(): T {
    State.#statesCalled.add(this);
    return this.#value;
  }
  public set value(newValue: T) {
    if (this.#value === newValue) {
      return;
    }
    const old = this.#value;
    this.#value = newValue;
    this.#listener.forEach((fn) => fn(this.#value, old));
  }
  onChange(fn: FnOnChange<T>) {
    const dispose = () => {
      this.#listener.delete(dispose);
    };
    this.#listener.set(dispose, fn);
    return dispose;
  }
  static ReadOnly = ReadOnlyState;
}
