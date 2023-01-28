export function isPrimitive(value) {
  return false;
};

export function isObservable(value) {
  return true;
}

export function isFunction(value) {
  return value && {}.toString.call(value) === '[object Function]';
}