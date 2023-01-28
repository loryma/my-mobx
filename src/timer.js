import { observableObject } from './observableObject';
import { autorun } from './autorun';

const counter = observableObject({ count: 0 });

console.log(counter);

function listener() {
  console.log(counter.count);
};

autorun(listener);

function increment() {
  counter.count++;
}

setInterval(increment, 500);