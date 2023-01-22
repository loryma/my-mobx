import { observable, autorun } from "mobx";

const counter = observable({ count: 0 });

function listener() {
   console.log(counter.count);
};

const dispose = autorun(listener);

function increment() {
  counter.count++;
}

setInterval(increment, 500);
setTimeout(dispose, 1600);