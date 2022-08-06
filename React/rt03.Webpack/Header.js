import React from "react";

function HeaderComp() {
  // JSX로 화면 만들기
  return (
    <header data-role="header">
      <h1>Header.vue</h1>
    </header>
  );
}

HeaderComp.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
};
HeaderComp.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
};

export default React.memo(HeaderComp); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
