import React from "react";
import PropTypes from "prop-types";

function Star({ selected, callbackOnClick }) {
  const onClick = (e) => {
    console.log(e.target);
    // 부모의 state 변경
    callbackOnClick();
  };
  // JSX로 화면 만들기
  const aaa = selected ? "star selected" : "star";
  <div className={aaa} onClick={onClick}></div>;
}

Star.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  callbackOnClick: PropTypes.func.isRequired
};
Star.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  selected: false,
  callbackOnClick: () => {}
};

export default React.memo(Star); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
