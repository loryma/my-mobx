import { ObservableValue } from "./ObservableValue";
import { isFunction } from './utils';

export class ObservableValue {
  constructor(target) {
    this._target = target;
    this._values = Object.fromEntries(
      Object.entries(target)
        .map(([key, value]) => [key, new ObservableValue(value)])
    )
  }

  get(target, property) {
    if (!this._hasPropery(property)) return;
    if (isFunction(target[property])) return target[property];

    return this._values[property].get();
  }

  set(target, property, value) {
    if (this._hasPropery(property)) {
      this._values[property].set(value);
      return true;
    }

    if (isFunction(target[property])) {
      target[property] = value;
      return true;
    }

    this._values[property] = new ObservableValue(value);
    target[property] = value;

    return true;
  }

  _hasPropery(property) {
    return property in this._target;
  }
}