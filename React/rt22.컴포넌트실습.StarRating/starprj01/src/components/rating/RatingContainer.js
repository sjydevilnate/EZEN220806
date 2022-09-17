import React, { useState, useCallback } from "react";
import ColorList from "./ColorList";

import Color from "./Color";

function RatingContainer({ ...props }) {
  // useState 를 사용한 컴포넌트의 상태값 설정
  const [colors, setColors] = useState([
    {
      id: "8658c1d0-9eda-4a90-95e1-8001e8eb6036",
      title: "바닷빛 파랑",
      color: "#0070ff",
      rating: 3
    },
    {
      id: "f9005b4e-975e-433d-a646-79df172e1dbb",
      title: "토마토",
      color: "#d10012",
      rating: 2
    },
    {
      id: "58d9caee-6ea6-4d7b-9984-65b145031979",
      title: "잔디",
      color: "#67bf4f",
      rating: 1
    },
    {
      id: "a5685c39-6bdc-4727-9188-6c9a00bf7f95",
      title: "파티 핑크",
      color: "#ff00f7",
      rating: 5
    }
  ]);

  // callback 메서드 작성. callback 메서드는 부모의 공유 상태값을 변경하기 위해서 사용된다.
  const callbackRateColor = useCallback(
    (id, rating) => {
      // state 변경
      const newColors = colors.map((item) => {
        if (item.id === id) {
          item.rating = rating;
        }
        return item;
      });
      setColors(newColors); // colors = newColors;
    },
    [
      /* 조건 제어: 메서드와 연관되는 상태(변수)명들을 기술 */
      colors
    ]
  );
  const callbackRemoveColor = useCallback(
    (id) => {
      // state 변경
      const newColors = colors.filter((color) => color.id !== id);
      setColors(newColors); // colors = newColors;
    },
    [
      /* 조건 제어: 메서드와 연관되는 상태(변수)명들을 기술 */
      colors
    ]
  );

  // 이벤트 핸들러 작성.
  const handler = () => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(window.event.target);
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <div className="rating-container">
      <ColorList
        colors={colors}
        callbackRateColor={callbackRateColor}
        callbackRemoveColor={callbackRemoveColor}
      ></ColorList>
    </div>
  );
}

RatingContainer.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.string,
  // 인자명: PropTypes.oneOf(['News', 'Photos']),
};
RatingContainer.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: '',
  // 인자명: 'News',
};

export default React.memo(RatingContainer); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
