import { globalState } from './GlobalState';
import { isPrimitive, isObservable, isPureObject, isArray } from './utils';
import { $$observable } from './constants';
import { observableObject } from './observableObject';
import { observableArray } from './observablArray';
import { Atom } from './Atom';

function enhancer(value) {
  if (isObservable(value)) return value;
  if (isPrimitive(value)) return value;
  if (isPureObject(value)) return observableObject(value);
  if (isArray(value)) return observableArray(value);
  return value;
}

export class ObservableValue extends Atom {
  constructor(value) {
    super();
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
}
