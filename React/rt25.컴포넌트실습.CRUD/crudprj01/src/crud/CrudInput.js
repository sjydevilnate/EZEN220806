import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer
} from 'react';
import PropTypes from 'prop-types';
function CrudInput({ callbackAdd }) {
  // ref 만들기.
  const refInputName = useRef();
  const refInputPower = useRef();

  // 이벤트 핸들러 작성.
  const handlerAdd = (event) => {
    console.log(event.target);

    // name 유효성 검사
    if (!refInputName.current.value || !refInputName.current.value.trim()) {
      alert('name 입력 하시오');
      refInputName.current.focus();
      event.stopPropagation();
      event.preventDefault();
      return false;
    }

    // Power 유효성 검사
    if (!refInputPower.current.value || !refInputPower.current.value.trim()) {
      alert('power 입력 하시오');
      refInputPower.current.focus();
      event.stopPropagation();
      event.preventDefault();
      return false;
    }

    // power 값을 숫자로 바꾸시오.(문자열를 숫자로)
    const power = Number(refInputPower.current.value);
    const newItem = {
      name: refInputName.current.value,
      power: power
    };

    // CrudContainer.callbackAdd(obj) 호출.
    callbackAdd(newItem);

    // input 태그에 남아있는 입력값 지우기.
    refInputName.current.value = null;
    refInputPower.current.value = null;
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <div>
      <h2>CrudInput Component</h2>
      <div>
        <label htmlFor="">Name : </label>
        <input
          type="text"
          name="name"
          placeholder="이름을 입력하세요"
          defaultValue={''}
          ref={refInputName}
        />
      </div>
      <div>
        <label htmlFor="">Power : </label>
        <input
          type="number"
          name="power"
          placeholder="숫자를 입력하세요"
          defaultValue={0}
          ref={refInputPower}
        />
      </div>
      <button type="button" onClick={handlerAdd}>
        Add
      </button>
    </div>
  );
}

CrudInput.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.string,
  // 인자명: PropTypes.oneOf(['News', 'Photos']),
  callbackAdd: PropTypes.func.isRequired
};
CrudInput.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: '',
  // 인자명: 'News',
  callbackAdd: () => {}
};

export default React.memo(CrudInput); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
