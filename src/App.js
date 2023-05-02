import './App.css';
import { observableObject } from './observableObject';
import { observer } from './observer';
// import './timer';

// const obj = observable({ count: 0});
// setInterval(() => obj.count++, 500);

const counter = observableObject({ count: 0 });

function App() {
  return (
    <div className="App">
      <button onClick={() => counter.count++}>
        Add
      </button>
      <button onClick={() => counter.count--}>
        Remove
      </button>
      <div>{counter.count}</div>
    </div>
  );
}

export default observer(App);
