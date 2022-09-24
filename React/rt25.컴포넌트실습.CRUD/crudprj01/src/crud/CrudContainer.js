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
import styled, { css } from "styled-components";

import CrudInput from "./CrudInput";
import CrudList from "./CrudList";

// import styled, { css } from 'styled-components';
// https://styled-components.com/docs/basics#adapting-based-on-props
const StyledCrudContainer = styled.div`
  .strong {
    color: red;
    font-weight: bold;
    font-size: 1.2em;
  }
  label {
    display: inline-block;
    width: 80px;
  }
  /* #app > div { */
  & > div {
    margin: 5px 0;
  }
`;

function CrudContainer({}) {
  const [items, setItems] = useState([
    { id: 1, name: "슈퍼맨", power: 100 },
    { id: 2, name: "아쿠아맨", power: 300 },
    { id: 3, name: "스파이더맨", power: 500 },
    { id: 4, name: "배트맨", power: 30 }
  ]);

  // ref 만들기.
  // const refInput = useRef();

  // callback 메서드 작성. callback 메서드는 부모의 공유 상태값을 변경하기 위해서 사용된다.
  const callbackDel = useCallback(
    (param) => {
      // items 배열에서 삭제. Array.filter() 를 사용한다
      debugger;
      const newItems = items.filter((item) => {
        if (item.id === param.id) {
          return false; // 빼라
        } else {
          return true; // 넣어라.
        }
      });
      setItems(newItems); // items = newItems;
    },
    [
      /* 메서드와 연관되는 상태(변수)명들을 기술 */
      items
    ]
  );

  const callbackUp = useCallback(
    (param) => {
      //100씩 증가. Array.map() 을 사용한다
      // item.power = item.power + 100;
      debugger;
      const newItems = items.map((item) => {
        if (item.id === param.id) {
          item.power = item.power + 100;
        }
        return item;
      });
      setItems(newItems); // items = newItems;
    },
    [
      /* 메서드와 연관되는 상태(변수)명들을 기술 */
      items
    ]
  );

  const callbackDown = useCallback(
    (param) => {
      // 50씩 감소.  Array.map() 을 사용한다
      // item.power = item.power - 50;
      debugger;
      const newItems = items.map((item) => {
        if (item.id === param.id) {
          item.power = item.power - 50;
        }
        return item;
      });
      setItems(newItems); // items = newItems;
    },
    [
      /* 메서드와 연관되는 상태(변수)명들을 기술 */
      items
    ]
  );

  const callbackSave = useCallback(
    (item) => {
      // newitem 으로 바뀐 새로운 배열 만들기. Array.map() 을 사용한다
      // ...생략
      debugger;
    },
    [
      /* 메서드와 연관되는 상태(변수)명들을 기술 */
    ]
  );

  const callbackAdd = useCallback(
    (newitem) => {
      // items에서 최대 id 값을 구하는 방법.
      // 방법1. items.map()과 items.reduce()를 사용하여 max id를 찾는 방법
      const maxid = items
        .map((item) => item.id) // [1,2,3,4]
        .reduce((pvalue, cvalue) => {
          if (pvalue > cvalue) return pvalue;
          else return cvalue;
        }, 0); // 4

      const obj = {
        id: maxid + 1,
        name: newitem.name,
        power: newitem.power
      };

      // items.push(obj) === [...items, obj]
      setItems([...items, obj]);
    },
    [
      /* 메서드와 연관되는 상태(변수)명들을 기술 */
      items
    ]
  );

  // 이벤트 핸들러 작성.
  const handler = () => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(window.event.target);
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <StyledCrudContainer>
      <h1>Creat Read Update Delete</h1>
      <CrudInput callbackAdd={callbackAdd}></CrudInput>
      <hr />
      <CrudList
        items={items}
        callbackDel={callbackDel}
        callbackUp={callbackUp}
        callbackDown={callbackDown}
        callbackSave={callbackSave}
      ></CrudList>
    </StyledCrudContainer>
  );
}

CrudContainer.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.string,
  // 인자명: PropTypes.oneOf(['News', 'Photos']),
};
CrudContainer.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: '',
  // 인자명: 'News',
};

export default React.memo(CrudContainer); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
