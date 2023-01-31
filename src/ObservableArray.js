import { isObservable, isPrimitive } from './utils';
import { $$observable } from './constants';
import { ObservableValue } from './ObservableValue';
import { globalState } from './GlobalState';
import { Atom } from './Atom';

function arrayEnhancer(items) {
  return items.map((targetElement) => {
    if (isPrimitive(targetElement)) return targetElement;
    return new ObservableValue(targetElement);
  });
};

export class ObservableArray extends Atom {
  constructor(target) {
    super();
    this._observers = new Set();
    this[$$observable] = true;
    this._target = target;
    this._values = arrayEnhancer(target);
  }

  get(target, propety) {
    if (globalState.trackingDerivation) {
      this.observe(globalState.trackingDerivation);
    }

    const observableValue = this._getValue(propety);
    if (isObservable(observableValue)) return observableValue.get();
    return observableValue;
  }

  set(target, property, value) {
    this.spliceWithArray(property, 0, value);
    return true;
  }

  _getValue(property) {
    return this._values[property];
  }

  spliceWithArray(start, deleteCount, ...items) {
    this._values.splice(start, deleteCount || 0, ...arrayEnhancer(items));
    const spliceValues = this._target.splice(start, deleteCount || 0, ...items);

    this._notify();
    return spliceValues;
  }

  setLength(newLenght) {
    const isValuesSetSuccess = Reflect.set(this._values, 'length', newLenght);
    const isTargetSetSuccess = Reflect.set(this._target, 'length', newLenght);

    this._notify();
    return isValuesSetSuccess && isTargetSetSuccess;
  }

  getValues() {
    return this._values;
  }
}