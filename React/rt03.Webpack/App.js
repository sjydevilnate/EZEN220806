import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import "./App.css";

function App() {
  // JSX로 화면 만들기
  return (
    <div class="container">
      <Header></Header>

      <section id="page1" data-role="page">
        <div class="content" data-role="content">
          컨텐츠
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
}

App.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
};
App.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
};

export default React.memo(App); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
