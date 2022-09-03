import React from "react";
import PropTypes from "prop-types";

import Star from "./Star";

function StarRating({ starsSelected, totalStars, callbackOnRate }) {
  // 이벤트 핸들러 작성.
  const handlerClick = (i) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(window.event.target);
    callbackOnRate(i + 1);
  };

  // JSX로 화면 만들기
  return (
    <div>
      StarRating
      <div class="star-rating">
        {[1, 2, 3, 4, 5].map((value, index) => {
          return (
            <Star
              key={index}
              selected={index < starsSelected}
              onClick={() => handlerClick(index)}
            />
          );
        })}
        <p>
          별점: {starsSelected} / {totalStars}
        </p>
      </div>
    </div>
  );
}

StarRating.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  starsSelected: PropTypes.number.isRequired,
  totalStars: PropTypes.number.isRequired,
  callbackOnRate: PropTypes.func.isRequired
};
StarRating.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  starsSelected: 0,
  totalStars: 5,
  callbackOnRate: () => {}
};

export default React.memo(StarRating); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
