import React from "react";

function FooterComp() {
  // JSX로 화면 만들기
  return (
    <footer class="jumbotron text-center" style={{ marginBottom: 0 }}>
      <h1>Footer.vue</h1>
    </footer>
  );
}

FooterComp.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
};
FooterComp.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
};

export default React.memo(FooterComp); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
