import { $$observableAdmin } from "./constants";
import { ObservableObject } from "./ObservabelObject";

function observableObject(target) {
  Object.defineProperty(target, $$observableAdmin, {
    enumarable: false,
    configurable: false,
    writable: false,
    value: new ObservableObject(target),
  });

  return new Proxy(target, {
    get(...args) {
        return target[$$observableAdmin].get(...args);
    },
    set(...args) {
        return target[$$observableAdmin].set(...args);
    }
  });
};

export { observableObject };