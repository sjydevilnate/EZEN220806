// 7. 프로젝트용 reducer 합치기.
// src/reducers/index.js
// reducer 별로 만들어진 state 를 store에서 하나의 state로 합친다.
// Redux.combineReducers() 사용하면 여러개의 리듀서를 하나로 합치기는 것이 가능하다.
import { combineReducers } from 'redux';

import reducerCounter from '../containers/counter/reducer';
// import reducer컴포넌트목록 from '../containers/컴포넌트목록/reducer';

const reducers = combineReducers({
  counter: reducerCounter,
  // 상태값목록: reducer컴포넌트목록,
});

export default reducers;
