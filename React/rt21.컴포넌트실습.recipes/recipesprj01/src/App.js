import "./App.css";

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
import Menu from "./Menu";

function App() {
  const [data, setData] = useState([
    {
      name: "구운 연어",
      ingredients: [
        { name: "연어", amount: 500, measurement: "그램" },
        { name: "잣", amount: 1, measurement: "컵" },
        { name: "버터 상추", amount: 2, measurement: "컵" },
        {
          name: "옐로 스쿼시(Yellow Squash, 호박의 한 종류)",
          amount: 1,
          measurement: "개"
        },
        { name: "올리브 오일", amount: 0.5, measurement: "컵" },
        { name: "마늘", amount: 3, measurement: "쪽" }
      ],
      steps: [
        "오븐을 350도로 예열한다.",
        "유리 베이킹 그릇에 올리브 오일을 두른다.",
        "연어, 마늘, 잣을 그릇에 담는다.",
        "오븐에서 15분간 익힌다.",
        "옐로 스쿼시를 추가하고 다시 30분간 오븐에서 익힌다.",
        "오븐에서 그릇을 꺼내서 15분간 식힌다음에 상추를 곁들여서 내놓는다."
      ]
    },
    {
      name: "생선 타코",
      ingredients: [
        { name: "흰살생선", amount: 500, measurement: "그램" },
        { name: "치즈", amount: 1, measurement: "컵" },
        { name: "아이스버그 상추", amount: 2, measurement: "컵" },
        { name: "토마토", amount: 2, measurement: "개(큰것)" },
        { name: "또띠야", amount: 3, measurement: "개" }
      ],
      steps: [
        "생선을 그릴에 익힌다.",
        "또띠야 3장 위에 생선을 얹는다.",
        "또띠야에 얹은 생선 위에 상추, 토마토, 치즈를 얹는다."
      ]
    }
  ]);

  // JSX
  return <Menu recipes={data} title="맛있는 조리법" />;
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
