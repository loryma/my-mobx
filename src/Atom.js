import { globalState } from './GlobalState';

export class Atom {
  constructor() {
    this._observers = new Set([]);
  }

  observe(reaction) {
    this._observers.add(reaction);
    reaction.addObserver(this);
  }

  dispose(reaction) {
    this._observers.delete(reaction);
    reaction.removeObserver(this);
  }

  _notify() {
    this._observers.forEach((reaction) => reaction.run());
  }

  _reportObserved() {
    if (globalState.trackingDerivation)  {
      this.observe(globalState.trackingDerivation);
    }
  }
};
