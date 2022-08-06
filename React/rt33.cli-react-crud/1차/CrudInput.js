import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// import ReactRedux, { Provider, useDispatch, useSelector } from 'react-redux';
// import ReactRouterDOM, { BrowserRouter, Switch, Route, Redirect, Link, NavLink, useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
// import { takeEvery, put, call, all, fork, spawn } from 'redux-saga/effects';

function CrudInput({ doIns }) {
    const refUserName  = useRef(false);
    const refUserPower = useRef(false);

    // refIsMounted는 생명주기의 마운트와 업데이트를 구분하기 위한 ref
    const refIsMounted = useRef(false);
    useEffect( () => {
        if (refIsMounted.current){
            // 업데이트 될 때마다 실행됨. 여러번. state 가 변경될 때마다
            console.log('componentDidUpdate');
        }
        else {
            // 마운트 완료 후에 실행됨. 한번만. focus 줄때
            console.log('componentDidMount');
            refIsMounted.current = true;
        }
    });

    // 이벤트 핸들러 작성.
    const handlerIns = (event)=>{
        // 이벤트 핸들러는 화살표 함수로 만들면 this bind()를 생략해도 된다
        console.log(event.target);

        // 유효성 검사
        if(refUserName.current.value.trim() === ''){
            alert('이름을 입력하세요')
            refUserName.current.focus()
            event.preventDefault()
            return false
        }
        if(refUserName.current.value.trim() === ''){
            alert('파워를 입력하세요')
            refUserPower.current.focus()
            event.preventDefault()
            return false
        }
        if( isNaN( Number(refUserPower.current.value) ) ){
            alert('파워에 숫자를 입력하세요')
            refUserPower.current.value=""
            refUserPower.current.focus()
            event.preventDefault()
            return false
        }

        // ref 를 사용하여 현재 입력된 값을 가져온다.
        //const name = refUserName.current.value
        //const power = Number(refUserPower.current.value)
        const newitem = {
            id: null,
            name: refUserName.current.value,
            power: Number(refUserPower.current.value),
        }

        // 부모(CrudApp)에게 값을 넘긴다.
        doIns(newitem) // CrudApp.func.doIns(newitem) 호출

        // 초기화 방법1
        refUserName.current.value = ""
        refUserPower.current.value = 0
    }

    // JSX로 화면 만들기
    return (
        <div>
            <h1>Creat Read Update Delete</h1>
            <div>
                <label htmlFor="">Name : </label>
                <input type="text"
                    name="name"
                    ref={refUserName}
                    defaultValue={""}
                    placeholder="이름을 입력하세요"
                />
            </div>
            <div>
                <label htmlFor="">Power : </label>
                <input type="text"
                    name="power"
                    ref={refUserPower}
                    defaultValue={0}
                    placeholder="숫자만 입력하세요"
                />
            </div>
            <button onClick={handlerIns}>Add</button>
        </div>
    )
}

CrudInput.propsTypes = {
    /* props의 프로퍼티 타입 설정 */
    doIns: PropTypes.func.isRequired,
};
CrudInput.defaultProps = {
    /* props의 디폴트 값 설정 */
    doIns: () => {},
};

export default CrudInput;