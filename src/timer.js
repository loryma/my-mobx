import { ObservableValue } from './ObservableValue';
import { autorun } from './autorun';

const counter = new ObservableValue(0);

function listener() {
  console.log(counter.get());
};

autorun(listener);

function increment() {
  counter.set(counter.get() + 1);
}

setInterval(increment, 500);