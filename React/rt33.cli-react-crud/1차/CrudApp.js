import React, { useState, useEffect, useRef, useCallback } from 'react';
// import PropTypes from 'prop-types';
// import ReactRedux, { Provider, useDispatch, useSelector } from 'react-redux';
// import ReactRouterDOM, { BrowserRouter, Switch, Route, Redirect, Link, NavLink, useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
// import { takeEvery, put, call, all, fork, spawn } from 'redux-saga/effects';
import CrudInput from '../components/crud/CrudInput';
import CrudList from '../components/crud/CrudList';


function CrudApp(props) {

    // 컴포넌트의 상태값 설정
    const [list, setList] = useState([
        { id: 1, name: "슈퍼맨", power: 100 },
        { id: 2, name: "아쿠아맨", power: 300 },
        { id: 3, name: "스파이더맨", power: 500 },
        { id: 4, name: "배트맨", power: 30 },
    ]);

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

    // callback 메서드 작성. callback 메서드는 부모의 공유 상태값을 변경하기 위해서 사용된다.
    const doIns = useCallback( (newitem)=>{
        // newitem 를 list 에 추가하기

        /*
        list에서 max(id) 구하는 방법
        방법 1. reduce() 메서드 사용.
            var maxObj = array.reduce( function(prev, next){
                return prev.id > next.id ? prev:  next  // 최대값 id가 있는 객체
                return prev.id < next.id ? prev:  next  // 최소값 id가 있는 객체
            })
            var newId  = maxObj.id + 1
        방법 2. map()과 Math.max()를 사용하는 방법
            var arrIds = array.map( function(el){
                return el.id
            })
            var newId  = Math.max(...arrIds) + 1
        */

        if( list.length>0) {
            const maxitem = list.reduce( (prev, next)=>{
                /*
                최대 id 값을 리턴한다.
                prev = { id: 1, name: "슈퍼맨", power: 100 };
                next = { id: 2, name: "아쿠아맨", power: 300 };
                */
                return prev.id > next.id ? prev : next;
            });
            newitem.id = maxitem.id + 1;
        }
        else {
            newitem.id = 1;
        }

        // 신규 리스트 생성 :  push() 나 스프레드 연산자 활용해서
        const newlist = [...list, newitem];
        setList(newlist);
    }, [list]);

    const doDel = useCallback( (item)=>{
        const r = window.confirm("정말로 삭제하시겠습니까?")
        if( !r ) return ;

        // 배열에서 삭제. splice 나 filter 를 사용한다
        // 삭제할 item을 제외한 배열 만들기.
        const id = item.id;
        const newlist = list.filter( (item)=>{
            return item.id !== id;
        });
        setList(newlist);
    }, [list]);
    const doUp = useCallback( (item)=>{
        //100씩 증가
        const id = item.id;
        const newlist = list.filter((item) => {
            if( item.id === id) {
                item.power = Number(item.power) + 100;
            }
            return item;
        });
        setList(newlist);
    }, [list]);
    const doDown = useCallback( (item)=>{
        //50씩 감소
        const id = item.id;
        const newlist = list.filter((item, index) => {
            if (item.id === id) {
                item.power = Number(item.power) - 50;
            }
            return item;
        });
        setList(newlist);
    }, [list]);
    const doSave = useCallback( (newitem)=>{
        const id = newitem.id;
        const newlist = list.map((item, index) => {
            if (item.id === id) {
                return newitem
            }
            return item;
        });
        setList(newlist);
    }, [list]);

    // JSX로 화면 만들기
    return (
        <div>
            <CrudInput doIns={doIns}></CrudInput>
            <hr />
            <CrudList list={list} doDel={doDel} doUp={doUp} doDown={doDown} doSave={doSave}></CrudList>
        </div>
    )
}

CrudApp.propsTypes = {
    /* props의 프로퍼티 타입 설정 */
};
CrudApp.defaultProps = {
    /* props의 디폴트 값 설정 */
};

export default CrudApp;