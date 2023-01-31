import { globalState } from "./GlobalState";

export class Reaction {
  constructor(callback) {
    this._callback = callback;
    this._observers = new Set([]);
    this._disposed = false;
  }

  addObserver(observer) {
    this._observers.add(observer);
  }

  removeObserver(observer) {
    this._observers.delete(observer);
  }

  track(trackedCallback) {
    if (this._disposed) return;
    const prevDerivation = globalState.trackingDerivation;

    globalState.trackingDerivation = this;
    trackedCallback();
    globalState.trackingDerivation = prevDerivation;

  }

  run() {
    return this._callback();
  }

  dispose() {
    this._disposed = true;
    this._clearObservers();
  }

  getDispose() {
    return this.dispose.bind(this);
  }

  _clearObservers() {
    this._observers.forEach((observer) => observer.dispose(this));
  }
}