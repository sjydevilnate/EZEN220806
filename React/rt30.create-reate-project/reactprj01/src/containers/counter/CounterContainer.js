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
`;

function CounterContainer({ ...props }) {
  // redux store 와 연동되는 경우에만 useDispatch(), useSelector() 사용
  const dispatch = useDispatch();
  const { error, isLoading, counter, welcome } = useSelector(
    (state) => state.counter,
  );

  // 페이지에 대한 경로와 query-string 정보를 추출하는 경우 useLocation() 훅 사용
  // const { pathname, search } = useLocation();

  // path 변수를 추출하는 경우 useParams() 사용. id === match.params.id */
  // const { id } = useParams();

  // 이전 경로 useHistory() 사용 */
  // const history = useHistory();

  // useState 를 사용한 컴포넌트의 상태값 설정
  const [header, setHeader] = useState('redux 사용 앱'); // 상태값이 기본타입인 경우
  // const [welcome, setWelcome] = useState('HELLO WORLD'); // 상태값이 기본타입인 경우
  // const [counter, setCounter] = useState(4); // 상태값이 기본타입인 경우
  const [callapi, setCallapi] = useState(false); // 상태값이 기본타입인 경우

  // ref 만들기.
  const refInputApi = useRef();

  // refIsMounted는 생명주기의 마운트와 업데이트를 구분하기 위한 ref
  const refIsMounted = useRef(false);
  useEffect(
    () => {
      if (refIsMounted.current) {
        // 업데이트 될 때마다 실행됨. 여러번. state 가 변경될 때마다
        // console.log('CounterContainer >> componentDidUpdate');
      } else {
        // 마운트 완료 후에 실행됨. 한번만. focus 줄때
        // console.log('CounterContainer >> componentDidMount');
        refIsMounted.current = true;
      }
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
    debugger;
    setCallapi(!callapi);
  };
  const handlerIncrement = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(e.target);
    // counter = counter + 1;
    // setCounter(counter + 1);
    const action = actions.setTaskReducer({ counter: counter + 1 });
    debugger;
    dispatch(action);
  };
  const handlerDecrement = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(e.target);
    // counter = counter - 1;
    // setCounter(counter - 1);
    const action = actions.setTaskReducer({ counter: counter - 1 });
    debugger;
    dispatch(action);
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
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
