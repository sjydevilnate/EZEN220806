import React from 'react';
import PropTypes from 'prop-types';
// import ReactRedux, { Provider, useDispatch, useSelector } from 'react-redux';
// import ReactRouterDOM, { BrowserRouter, Switch, Route, Redirect, Link, NavLink, useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
// import { takeEvery, put, call, all, fork, spawn } from 'redux-saga/effects';

import CrudListItem from './CrudListItem';

function CrudList({ list, doDel, doUp, doDown, doSave }) {

    const arrs = list.map((item, index)=>{
        // item = {id:"", name:"", power:""}
        return(
            <CrudListItem
                key={index}
                index={index}
                item={ item}
                doDel={doDel}
                doUp={doUp}
                doDown={doDown}
                doSave={doSave}
                >
            </CrudListItem>
        );
    })

    // JSX로 화면 만들기
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>POWER</th>
                    <th>CRUD</th>
                </tr>
            </thead>
            <tbody>
                {arrs}
            </tbody>
        </table>
    )
}

CrudList.propsTypes = {
    // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
    // 인자명: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    doDel: PropTypes.func.isRequired,
    doUp: PropTypes.func.isRequired,
    doDown: PropTypes.func.isRequired,
    doSave: PropTypes.func.isRequired,
};
CrudList.defaultProps = {
    // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
    // 인자명: () => {},
    list: [],
    doDel: () => {},
    doUp: () => {},
    doDown: () => {},
    doSave: () => {},
};

export default CrudList;