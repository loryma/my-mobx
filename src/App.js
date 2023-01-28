import './App.css';
import { observable, autorun } from "mobx";
import { observer } from 'mobx-react';
import './timer';

const obj = observable({ count: 0});
// setInterval(() => obj.count++, 500);

function App() {
  return (
    <div className="App">
      <div>{obj.count}</div>
    </div>
  );
}

export default observer(App);
