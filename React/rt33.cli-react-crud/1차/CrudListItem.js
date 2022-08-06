import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// import ReactRedux, { Provider, useDispatch, useSelector } from 'react-redux';
// import ReactRouterDOM, { BrowserRouter, Switch, Route, Redirect, Link, NavLink, useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
// import { takeEvery, put, call, all, fork, spawn } from 'redux-saga/effects';
function CrudListItem( { item, doDel, doUp, doDown, doSave } ) {
    // 컴포넌트의 상태값 설정
    const [isEditMode, setIsEditMode] = useState( false ); // 상태값이 기본타입인 경우

    const refUserName  = useRef();
    const refUserPower = useRef();

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
    const handlerDel = (event)=>{
        // 이벤트 핸들러는 화살표 함수로 만들면 this bind()를 생략해도 된다
        console.log(event.target);

        // state 변경. state 어디에 있나? 부모 있다. 부모 메서드 호출
        // 부모 콜백 메서드 호출
        doDel(item);
    }
    const handlerUp = (event)=>{
        // 이벤트 핸들러는 화살표 함수로 만들면 this를 bind() 생략해도 된다
        console.log(event.target)

        // CrudApp.doUp() 메서드 호출
        doUp(item);
    }
    const handlerDown = (event) => {
        // 이벤트 핸들러는 화살표 함수로 만들면 this를 bind() 생략해도 된다
        console.log(event.target)

        doDown(item); // CrudApp.doDown()
    }
    const handlerEdit = (event) => {
        // 이벤트 핸들러는 화살표 함수로 만들면 this를 bind() 생략해도 된다
        console.log(event.target)

        //isEditMode 바꾼다.
        //isEditMode = !isEditMode;
        setIsEditMode(!isEditMode);
    }
    const handlerSave = (event) => {
        // 이벤트 핸들러는 화살표 함수로 만들면 this를 bind() 생략해도 된다
        console.log(event.target)

        //isEditMode = !isEditMode;
        setIsEditMode(!isEditMode);

        // newitem 만들기
        let newitem = item;
        newitem.name = refUserName.current.value;
        newitem.power = Number(refUserPower.current.value);

        // 부모 콜백 메서드 호출.
        doSave( newitem );
    }

    // power가 300이상인 사람은 글자색을 red로 bold스타일로 출력
    const strong = item && item.power>=300 ? "strong":"";

    // 화면 표시
    const formView = (
        <tr key={item.id} className={strong}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.power}</td>
            <td>
                <button onClick={handlerDel}>Del</button>
                <button onClick={handlerUp}>Power Up</button>
                <button onClick={handlerDown}>Power Down</button>
                <button onClick={handlerEdit}>Edit</button>
            </td>
        </tr>
    );

    // 화면 수정
    const formEdit = (
        <tr key={item.id} className={strong}>
            <td>{item.id}</td>
            <td>
                <input type="text"
                        name="name"
                        ref={refUserName}
                        defaultValue={item.name} />
            </td>
            <td>
                <input type="text"
                        name="power"
                        ref={refUserPower}
                        defaultValue={item.power} />
            </td>
            <td>
                <button onClick={handlerUp}>Power Up</button>
                <button onClick={handlerDown}>Power Down</button>
                <button onClick={handlerSave}>Save</button>
            </td>
        </tr>
    );

    if( isEditMode ){
        return formEdit;
    }
    else {
        return formView;
    }
}

CrudListItem.propsTypes = {
    // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
    // 인자명: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    doDel: PropTypes.func.isRequired,
    doUp: PropTypes.func.isRequired,
    doDown: PropTypes.func.isRequired,
    doSave: PropTypes.func.isRequired,
};
CrudListItem.defaultProps = {
    // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
    // 인자명: () => {},
};

export default CrudListItem;