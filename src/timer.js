import { observable, autorun } from "mobx";

const counter = observable({ count: 0 });

console.log(counter);

function listener() {
   console.log(counter.count);
};

autorun(listener);

function increment() {
  counter.count++;
}

//каждые полсекунды будет инкрементироваться счетчик
setInterval(increment, 500)