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
import CrudListItem from './CrudListItem';
// import { useDispatch, useSelector } from 'react-redux';
// import { BrowserRouter, Routes, Route, Link, NavLink, useParams, useLocation, useHistory, useNavigate } from 'react-router-dom';

// import { action함수 as actions, action상수 as types } from './action';

/* const {aaa, bbb, ...props} = props */
function CrudList({ items, callbackDel, callbackUp, callbackDown, callbackSave }) {
  // const item = {
  //   id: 1,
  //   name: "슈퍼맨",
  //   power: 100
  // };

  const arr = items.map((item, index, array) => {
    return (
      <CrudListItem
        key={item.id}
        item={item}
        callbackDel={callbackDel}
        callbackUp={callbackUp}
        callbackDown={callbackDown}
        callbackSave={callbackSave}
      ></CrudListItem>
    );
  });

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <table>
      <caption>
        <b>CrudList Component</b>
      </caption>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>POWER</th>
          <th>CRUD</th>
        </tr>
      </thead>
      <tbody>{arr}</tbody>
    </table>
  );
}

CrudList.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.string,
  // 인자명: PropTypes.oneOf(['News', 'Photos']),
  items: PropTypes.arrayOf(PropTypes.object),
  callbackDel: PropTypes.func.isRequired,
  callbackUp: PropTypes.func.isRequired,
  callbackDown: PropTypes.func.isRequired,
  callbackSave: PropTypes.func.isRequired,
};

CrudList.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: '',
  // 인자명: 'News',
  items: [],
  callbackDel: () => {},
  callbackUp: () => {},
  callbackDown: () => {},
  callbackSave: () => {},
};

export default React.memo(CrudList); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
