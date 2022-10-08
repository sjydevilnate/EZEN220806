// 6. reducer 만들기
// src/containers/counter/reducer.js
// 리듀서별로 상태값을 분리 할 수 있다.
// reducer 에서 state(불변 객체) 를 조작할 때는 immer 라이브러리를 사용하면 편리하다
// reducer 에서는 immer.produce( state, (draft)=>{...} )를 사용하여 state(불변 객체)를 처리한다
// state에서 객체를 참조할 때는 객체의 레퍼런스가 아니라 고유한 값(id)으로 참조해야 한다.
import { produce } from 'immer';
import { action상수 as types } from './action';

const setError = (state, payload) => {
  return produce(state, (draft) => {
    draft.error = payload;
  });
};

const setLoading = (state, payload) => {
  return produce(state, (draft) => {
    draft.isLoading = payload;
  });
};

const setTaskReducer = (state, payload) => {
  return produce(state, (draft) => {
    debugger;
    // draft.counter.push(payload);
    draft.counter = payload.counter;
    draft.isLoading = false;
  });
};

const state컨테이너명 = {
  error: null,
  isLoading: false,
  // counter: [],
  counter: 10,
  welcome: 'HELLO WORLD REDUX',
};

const reducerCounter = (state = state컨테이너명, action) => {
  switch (action.type) {
    case types.SET_ERROR:
      return setError(state, action.payload);
    case types.SET_LOADING:
      return setLoading(state, action.payload);
    case types.SET_TASK_REDUCER:
      debugger;
      return setTaskReducer(state, action.payload);
    default:
      return state;
  }
};

export default reducerCounter;
