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
import Color from './Color';

function ColorList({ colors, callbackRateColor, callbackRemoveColor }) {
  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <div className="color-list">
      {colors.map((item, index, array) => {
        // item = { id, title, color, rating }
        return (
          <Color key={item.id} {...item} callbackRateColor={callbackRateColor} callbackRemoveColor={callbackRemoveColor}></Color>
        );
      })}
    </div>
  );
}

ColorList.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.string,
  // 인자명: PropTypes.oneOf(['News', 'Photos']),
  colors: PropTypes.arrayOf(PropTypes.object).isRequired,
  callbackRateColor: PropTypes.func.isRequired,
  callbackRemoveColor: PropTypes.func.isRequired,
};
ColorList.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: '',
  // 인자명: 'News',
  colors: [],
  callbackRateColor: () => {},
  callbackRemoveColor: () => {},
};

export default React.memo(ColorList); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
