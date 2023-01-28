import { globalState } from './GlobalState';
import { isPrimitive, isObservable } from './utils';
import { $$observable } from './constants';

function enhancer(value) {
  if (isObservable(value)) return value;
  if (isPrimitive(value)) return value;
  return value;
}

export class ObservableValue {
  constructor(value) {
    this._observers = new Set();
    this[$$observable] = true;
    this._value = enhancer(value);
  }

  get() {
    if (globalState.trackingDerivation) {
      this.observe(globalState.trackingDerivation);
    }
    return this._value;
  }

  set(newValue) {
    this._value = enhancer(newValue);
    this._notify();
  }

  observe(reaction) {
    this._observers.add(reaction);
  }

  dispose(reaction) {
    this._observers.delete(reaction);
  }

  _notify() {
    this._observers.forEach((reaction) => reaction());
  }
}