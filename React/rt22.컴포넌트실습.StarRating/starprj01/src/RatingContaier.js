import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
  Fragment,
  forwardRef,
  useImperativeHandle
} from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";

import ColorList from "./ColorList";

/* const {aaa, bbb, ...props} = props */
function RatingContaier({ ...props }) {
  // useState 를 사용한 컴포넌트의 상태값 설정
  const [변수명, set변수명] = useState("기본값"); // 상태값이 기본타입인 경우
  const [state, setState] = useState({ id: 0, name: "", age: 0 }); // 상태값이 참조타입 경우

  // useReducer 를 사용한 컴포넌트의 상태값 설정. 리듀서는 현재 상태를 받아서 새 상태를 반환하는 함수다
  const [리듀서, set리듀서] = useReducer(
    (oldvalue, newvalue) => ({ ...oldvalue, ...newvalue }),
    { id: 0, name: "", age: 0 }
  ); // 리듀서(reducer) 방식의 상태값 설정

  // ref 만들기.
  // const refInput = useRef();

  // refIsMounted는 생명주기의 마운트와 업데이트를 구분하기 위한 ref
  const refIsMounted = useRef(false);
  useEffect(
    () => {
      if (refIsMounted.current) {
        // 업데이트 될 때마다 실행됨. 여러번. state 가 변경될 때마다
        // console.log('RatingContaier >> componentDidUpdate');
      } else {
        // 마운트 완료 후에 실행됨. 한번만. focus 줄때
        // console.log('RatingContaier >> componentDidMount');
        refIsMounted.current = true;
      }
      return () => {
        // 언마운트 직전에 한번만 실행됨.
        // console.log('RatingContaier >> componentWillUmount');
      };
    },
    [
      /* 조건 제어: 메서드와 연관되는 상태(변수)명들을 기술 */
    ]
  );

  // callback 메서드 작성. callback 메서드는 부모의 공유 상태값을 변경하기 위해서 사용된다.
  const callback = useCallback(
    (param) => {
      // state 변경
    },
    [
      /* 조건 제어: 메서드와 연관되는 상태(변수)명들을 기술 */
    ]
  );

  // 이벤트 핸들러 작성.
  const handler = () => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(window.event.target);
  };

  // JSX로 화면 만들기
  return (
    <div>
      RatingContaier
      <div class="color-list">
        <section class="color">
          <h1>바닷빛 파랑</h1>
          <button>X</button>
          <div
            class="color"
            style={{ backgroundColor: "rgb(0, 112, 255)" }}
          ></div>
          <div>
            <div class="star-rating">
              <div class="star selected"></div>
              <div class="star selected"></div>
              <div class="star selected"></div>
              <div class="star"></div>
              <div class="star"></div>
              <p>별점: 3 / 5</p>
            </div>
          </div>
        </section>
      </div>
      <ColorList></ColorList>
    </div>
  );
}

RatingContaier.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
};
RatingContaier.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
};

export default React.memo(RatingContaier); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
