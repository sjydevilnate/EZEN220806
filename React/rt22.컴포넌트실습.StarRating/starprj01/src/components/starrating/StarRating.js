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
} from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Star from './Star';

function StarRating({ starsSelected, handlerRate, totalStars }) {
  const handlerClick = (i) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    handlerRate(i + 1);
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html

  const arr = [...Array(totalStars).keys()].map((val) => val + 1);
  return (
    <div className="star-rating">
      {arr.map((n, i) => {
        return (
          <Star
            key={i}
            index={i}
            selected={i < starsSelected}
            callbackClick={(i) => handlerClick(i)}
          />
        );
      })}
      <p>별점: {starsSelected} / 5</p>
    </div>
  );
}

StarRating.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.string,
  // 인자명: PropTypes.oneOf(['News', 'Photos']),
  starsSelected: PropTypes.number,
  handlerRate: PropTypes.func,
  totalStars: PropTypes.number
};
StarRating.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: '',
  // 인자명: 'News',
  starsSelected: 0,
  handlerRate: () => {},
  totalStars: 5
};

export default React.memo(StarRating); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
