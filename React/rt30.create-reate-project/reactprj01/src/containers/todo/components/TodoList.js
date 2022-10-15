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

const StyledTodoList = styled.div`
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */

  ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
  }

  li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
  }

  li.checked {
    background: #bbb;
    color: #fff;
    text-decoration: line-through;
  }

  .checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
  }

  .removeBtn {
    margin-left: auto;
    color: #de4343;
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }

  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
`;

function TodoList({ todoItems, callbackDoneToggle, callbackRemoveTodo }) {

  // 이벤트 핸들러 작성.
  const handlerDoneToggle = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(e.target);
    debugger;
    const id = Number(e.target.dataset.id); // data-id={item.id}
    const item = JSON.parse(e.target.dataset.item); // data-item={JSON.stringify(item)}

    e.stopPropagation(); // click 이벤트 취소. 버블링 막기

    // 부모 콜백 메서드 호출
    callbackDoneToggle(id);
  };
  const handlerRemoveTodo = (id) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    debugger;
    callbackRemoveTodo(id);
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  const lis =
    todoItems &&
    todoItems.map((item) => {
      return (
        <li
          key={item.id}
          className={item.done ? 'checked' : null}
          data-id={item.id}
          data-item={JSON.stringify(item)}
          onClick={handlerDoneToggle}
        >
          <i aria-hidden="true" className="checkBtn fas fa-check"></i>
          {item.todo}
          <span
            type="button"
            className="removeBtn"
            onClick={(e) => {
              e.stopPropagation(); // 이벤트 취소. 버블링 방지
              handlerRemoveTodo(item.id);
            }}
          >
            <i aria-hidden="true" className="far fa-trash-alt"></i>
          </span>
        </li>
      );
    });

  return (
    <StyledTodoList>
      <section>
        <ul>{lis}</ul>
      </section>
    </StyledTodoList>
  );
}

TodoList.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  todoItems: PropTypes.arrayOf(PropTypes.object),
  callbackDoneToggle: PropTypes.func.isRequired,
  callbackRemoveTodo: PropTypes.func.isRequired,
};
TodoList.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  todoItems: [],
  callbackDoneToggle: () => {},
  callbackRemoveTodo: () => {},
};

export default React.memo(TodoList); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
