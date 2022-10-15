import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
  Fragment,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
// import { BrowserRouter, Routes, Route, NavLink, useParams, useLocation, useHistory, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { action함수 as actions, action상수 as types } from './action';

const StyledCounterContainer = styled.div`
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */
  margin: 0 auto;
  text-align: center;

  .loadingbox {
    position: absolute;
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(255, 0,0,0.5); */
    z-index: 100;
  }

  .loadingbox > .loadingbar {
    position: relative;
    padding: 0;
    margin: 0;
    top: calc(50% - 150px);
    left: calc(50% - 150px);
    z-index: 200;
  }
`;

function CounterContainer({ ...props }) {
  // redux store 와 연동되는 경우에만 useDispatch(), useSelector() 사용
  const dispatch = useDispatch();
  const { error, isLoading, counter, welcome } = useSelector(
    (state) => state.counter,
  );

  // useState 를 사용한 컴포넌트의 상태값 설정
  const [header, setHeader] = useState('redux 사용 앱'); // 상태값이 기본타입인 경우
  // const [welcome, setWelcome] = useState('HELLO WORLD'); // 상태값이 기본타입인 경우
  // const [counter, setCounter] = useState(4); // 상태값이 기본타입인 경우
  const [callapi, setCallapi] = useState(false); // 상태값이 기본타입인 경우

  // ref 만들기.
  const refInputApi = useRef();

  // refIsMounted는 생명주기의 마운트와 업데이트를 구분하기 위한 ref
  useEffect(
    () => {
      debugger;
      // 액션함수를 이용하여 api에 전달될 action 생성
      const action값 = actions.getTaskSaga({}); // 액션함수 사용하여 saga 로 보낼 정보 생성

      // 생성된 action 을 saga 로 보내기 위해 dispatch 호출하기
      dispatch(action값); // 외부 서버에서 데이터를 가져오라는 명령

      return () => {
        // 언마운트 직전에 한번만 실행됨.
        // console.log('CounterContainer >> componentWillUmount');
      };
    },
    [
      /* 연관배열: 메서드와 연관되는 상태(변수)명들을 기술 */
    ],
  );

  // callback 메서드 작성. callback 메서드는 부모의 공유 상태값을 변경하기 위해서 사용된다.
  const callback = useCallback(
    (param) => {
      // state 변경
    },
    [
      /* 연관배열: 메서드와 연관되는 상태(변수)명들을 기술 */
    ],
  );

  // 이벤트 핸들러 작성.
  const handlerChangeCallapi = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(e.target);
    setCallapi(!callapi);
  };
  const handlerIncrement = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(e.target);
    // counter = counter + 1;
    // setCounter(counter + 1);

    // reducer 를 사용할 때
    // const action = actions.setTaskReducer({ counter: counter + 1 });
    // dispatch(action); // saga 로 보내기

    debugger;
    // saga 를 사용할 때
    // http://localhost:5050/counter?step=1   ==> 1 씩 증가
    const payload = { step: +1 };
    const action = actions.setTaskSaga(payload); // 액션함수를 이용하여 전달될 action 생성
    dispatch(action); // saga 로 보내기
  };
  const handlerDecrement = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(e.target);
    // counter = counter - 1;
    // setCounter(counter - 1);

    // reducer를 사용할 때
    // const action = actions.setTaskReducer({ counter: counter - 1 });
    // dispatch(action);

    // saga 를 사용할 때
    // http://localhost:5050/counter?step=-1   ==> -1 씩 증가
    const payload = { step: -1 };
    const action = actions.setTaskSaga(payload); // 액션함수를 이용하여 전달될 action 생성
    dispatch(action); // saga 로 보내기
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  if (isLoading) {
    return (
      <div className="loadingbox">
        <img className="loadingbar" src="/assets/images/loadingbar.gif"></img>
      </div>
    );
  }
  return (
    <StyledCounterContainer>
      <div>
        <h1>{header}</h1>
        <h2>{welcome}</h2>
        <h3>{counter}</h3>
        <div>
          <input
            type="checkbox"
            defaultChecked={callapi}
            ref={refInputApi}
            onChange={handlerChangeCallapi}
          />
          외부 api 호출
        </div>
        <button onClick={handlerIncrement}>더해줘</button>
        <button onClick={handlerDecrement}>빼줘</button>
      </div>
    </StyledCounterContainer>
  );
}

CounterContainer.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
};

export default React.memo(CounterContainer); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
