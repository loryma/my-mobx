import { globalState } from './GlobalState';

export class Atom {
  constructor() {
    this._observers = new Set([]);
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

  _reportObserved() {
    if (globalState.trackingDerivation)  {
      this.observe(globalState.trackingDerivation);
    }
  }
};
