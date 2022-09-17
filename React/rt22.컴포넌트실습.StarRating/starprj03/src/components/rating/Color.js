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
import StarRating from "./StarRating";
import Star from "./Star";

// import { useDispatch, useSelector } from 'react-redux';
// import { BrowserRouter, Routes, Route, Link, NavLink, useParams, useLocation, useHistory, useNavigate } from 'react-router-dom';

// import { action함수 as actions, action상수 as types } from './action';

/* const {aaa, bbb, ...props} = props */
function Color({
  id,
  title,
  color,
  rating,
  callbackRateColor,
  callbackRemoveColor
}) {
  // 이벤트 핸들러 작성.
  const handlerRemove = () => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    callbackRemoveColor(id);
  };
  // 이벤트 핸들러 작성.
  const handlerRate = (rating) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    callbackRateColor(id, rating);
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <section className="color">
      <h1>{title}</h1>
      <button onClick={handlerRemove}>X</button>{" "}
      <div className="color" style={{ backgroundColor: color }}></div>
      <div>
        <StarRating
          starsSelected={rating}
          handlerRate={handlerRate}
        ></StarRating>
      </div>
    </section>
  );
}

Color.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.string,
  // 인자명: PropTypes.oneOf(['News', 'Photos']),
  id: PropTypes.string,
  titlte: PropTypes.string,
  color: PropTypes.string,
  rating: PropTypes.number,
  callbackRateColor: PropTypes.func,
  callbackRemoveColor: PropTypes.func
};
Color.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: '',
  // 인자명: 'News',
  id: "",
  titlte: "",
  color: "",
  rating: 0,
  callbackRateColor: () => {},
  callbackRemoveColor: () => {}
};

export default React.memo(Color); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
