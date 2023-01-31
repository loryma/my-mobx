import { $$observable } from "./constants";

export function is(constructor, val) {
  return (val != null && val.constructor === constructor) || val instanceof constructor;
}

export function isPureObject(arg) {
  return is(Object, arg) && !Array.isArray(arg);
}

export function isPrimitive(arg) {
  return !isPureObject(arg) && !isFunction(arg) && !isArray(arg);
}

export function isObservable(value) {
  console.log('isObs', value[$$observable]);
  if (value) return !!value[$$observable];

  return false;
};

export function isArray(arg) {
  return is(Array, arg);
}

export function isFunction(arg) {
  return is(Function, arg);
};