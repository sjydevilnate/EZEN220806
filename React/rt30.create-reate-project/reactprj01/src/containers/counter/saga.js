// src/containers/counter/saga.js
import { takeLatest, put, call, all, delay } from 'redux-saga/effects';
import { action함수 as actions, action상수 as types } from './action';
import * as api from './api';

/* saga 이펙트 함수 설명

 * saga 실행 순서 : TCP(take[Latest}, call, put)

 * takeLatest      마지막 요청만 처리. 기존에 진행 중인 작업은 취소됨.
 *                 클릭 실수로 2번 했을때, 앞 이벤트 무시 마지막 이벤트 실행(보통 이거 많이씀)
 * takeEvery       들어오는 모든 작업을 처리한다. 중복 실행됨. 이벤트 계속 리슨
 * takeLeading     첫번째 요청만 실행, 이후 요청은 무시
 * take            한번만 실행되고 이벤트 삭제됨
 *
 * call            call은 함수를 동기식으로 실행한다(동기식: 외부 api가 리턴할때까지 기다림).
 *                 함수의 첫 번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수이다.
 *
 * put             특정 액션을 dispatch 한다.
 *
 * delay           설정된 시간 이후에 resolve하는 Promise객체를 리턴한다.
 * all             all함수를 사용해서 제너레이터 함수를 배열의 형태로 인자로 넣어주면,
 *                 제너레이터 함수들이 병행적으로 동시에 실행되고, 전부 resolve될때까지 기다린다. 받은 이펙트를 등록 (실행 아님, 등록임!!)
 *                 Promise.all과 비슷하다고 보면된다.
 */

export function* getPromise(action) {
  try {
    yield put(actions.setLoading(true)); // 액션 디스패치
    // yield delay(2000); // 2초 기다리기
    const result = yield call(api.getPromise, action.payload);

    // 액션함수를 이용하여 전달될 payload 생성
    const payload = actions.setTaskReducer(result.data);
    yield put(payload); // payload를 리듀서로 dispatch 하기
    yield put(actions.setError(''));
  } catch (e) {
    console.log(e);
    yield put(actions.setError(e));
  }
  yield put(actions.setLoading(false)); // 액션 디스패치
}

export function* getTaskSaga(action) {
  try {
    yield put(actions.setLoading(true)); // 액션 디스패치
    // yield delay(2000); // 2초 기다리기
    debugger;
    const result = yield call(api.callApi, action.payload);
    // 액션함수를 이용하여 전달될 payload 생성
    debugger;
    const payload = { counter: result.data };
    yield put(actions.setTaskReducer(payload)); // payload를 리듀서로 dispatch 하기
    yield put(actions.setError(''));
  } catch (e) {
    console.log(e);
    yield put(actions.setError(e));
  }
  yield put(actions.setLoading(false)); // 액션 디스패치
}

export function* setTaskSaga(action) {
  try {
    yield put(actions.setLoading(true)); // 액션 디스패치
    // yield delay(2000); // 2초 기다리기
    debugger;
    const result = yield call(api.callApi, action.payload);
    // 액션함수를 이용하여 전달될 payload 생성
    debugger;
    const payload = { counter: result.data };
    yield put(actions.setTaskReducer(payload)); // payload를 리듀서로 dispatch 하기
    yield put(actions.setError(''));
  } catch (e) {
    console.log(e);
    yield put(actions.setError(e));
  }
  yield put(actions.setLoading(false)); // 액션 디스패치
}

export function* actionWatcher() {
  // yield takeLatest(types.GET_PROMISE, getPromise);
  yield takeLatest(types.GET_TASK_SAGA, getTaskSaga);
  yield takeLatest(types.SET_TASK_SAGA, setTaskSaga);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
