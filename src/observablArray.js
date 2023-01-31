import { $$observableAdmin } from "./constants";
import { ObservableArray } from "./ObservableArray";

const arrayMethods = {
 push(...items) {
   const internalReactiveInstance = this[$$observableAdmin];
   internalReactiveInstance.spliceWithArray(internalReactiveInstance.getValues().length, 0, ...items);
   return internalReactiveInstance.getValues().length;
 },
};

export class ArrayHandlers {
 get(target, property, _) {
   const arrayMethod = arrayMethods[property];
   if (arrayMethod) return arrayMethod.bind(target);

   return target[$$observableAdmin].get(target, property);
 }

 set(target, property, value) {
   const reactiveField = target[$$observableAdmin];

   if (property === "length") return reactiveField.setLength(value);
   return reactiveField.set(target, property, value);
 }
}

export function observableArray(target) {
 Object.defineProperty(target, $$observableAdmin, {
   enumerable: false,
   configurable: false,
   writable: false,
   value: new ObservableArray(target),
 });

 return new Proxy(target, new ArrayHandlers(target));
}
