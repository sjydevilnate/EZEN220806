// 8. 프로젝트용 store 만들기.
// src/store/index.js 수정
// 개별 saga 를 store 에 연결한다.
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import reducers from '../reducers';
import sagaCounter from '../containers/counter/saga';
// import saga컴포넌트목록 from '../containers/컴포넌트목록/saga';

const sagaMiddleware = createSagaMiddleware(); // saga 미들웨어 생성.
const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  /*preloadedState,*/ enhancers(applyMiddleware(sagaMiddleware, logger)),
);

// 스토어 생성 후 sagaMiddleware 에 개별 saga를 추가해야 합니다.
// 중요사항. 순서를 바꾸면 안된다. createSagaMiddleware() 후에 개별 saga를 추가해야 합니다.
sagaMiddleware.run(sagaCounter);
// sagaMiddleware.run(saga컴포넌트목록);

export default store;
