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

const StyledLoadingBox = styled.div`
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */
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
    /* left: calc(50% - 150px); */
    z-index: 200;
  }
`;

function LoadingBox() {
  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <StyledLoadingBox>
      <div className="loadingbox">
        <img className="loadingbar" src="/assets/images/loadingbar.gif"></img>
      </div>
    </StyledLoadingBox>
  );
}

LoadingBox.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.arrayOf(PropTypes.object),
};
LoadingBox.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
};

export default React.memo(LoadingBox); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
