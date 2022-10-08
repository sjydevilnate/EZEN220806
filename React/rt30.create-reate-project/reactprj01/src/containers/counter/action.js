const prefix = `counter`; // action상수에는 접두사를 붙인다.

export const action상수 = {
  GET_ERROR: `${prefix}/GET_ERROR`,
  SET_ERROR: `${prefix}/SET_ERROR`,
  GET_LOADING: `${prefix}/GET_LOADING`,
  SET_LOADING: `${prefix}/SET_LOADING`,
  GET_TASK_SAGA: `${prefix}/GET_TASK_SAGA`,
  SET_TASK_SAGA: `${prefix}/SET_TASK_SAGA`,
  GET_TASK_REDUCER: `${prefix}/GET_TASK_REDUCER`,
  SET_TASK_REDUCER: `${prefix}/SET_TASK_REDUCER`,
};

export const action함수 = {
  getError() {
    return {
      type: action상수.GET_ERROR,
    };
  },
  setError(error) {
    return {
      type: action상수.SET_ERROR,
      payload: error,
    };
  },
  getLoading() {
    return {
      type: action상수.GET_LOADING,
    };
  },
  setLoading(isLoading) {
    return {
      type: action상수.SET_LOADING,
      payload: isLoading,
    };
  },
  getTaskSaga(payload) {
    return {
      type: action상수.GET_TASK_SAGA,
      payload,
    };
  },
  setTaskSaga(payload) {
    return {
      type: action상수.SET_TASK_SAGA,
      payload,
    };
  },
  getTaskReducer(payload) {
    return {
      type: action상수.GET_TASK_REDUCER,
      payload,
    };
  },
  setTaskReducer(payload) {
    return {
      type: action상수.SET_TASK_REDUCER,
      payload,
    };
  },
};
