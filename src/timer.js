import { observableObject } from './observableObject';
import { observableArray } from './observablArray';
import { autorun } from './autorun';

// const counter = observableObject({ count: 0 });
const obsArray = observableArray(['first']);

// console.log(counter);
console.log(obsArray);

// function listener() {
//   console.log(counter.count);
// };

function arrayListener() {
  console.log(obsArray.length);
  console.log('array', obsArray)
}

// autorun(listener);
autorun(arrayListener);

function increment() {
  // counter.count++;
  obsArray.push(Date.now());
}

setInterval(increment, 500);