import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
  Fragment,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Routes, Route, NavLink } from 'react-router-dom';

import HomeContainer from '../containers/home/HomeContainer';
import CompStyle from '../containers/styled/CompStyle';
import RecipesContainer from '../containers/recipes/App';
import StarRatingContainer from '../containers/starrating/RatingContainer';
import CrudContainer from '../containers/crud/CrudContainer';
import TodoContainer from '../containers/todo/TodoContainer';
import CounterContainer from '../containers/counter/CounterContainer';

import SideBar from './SideBar';

const StyledPageHome = styled.div`
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */
  .active {
    color: red;
    background-color: aqua;
  }
  .inactive {
    background-color: none;
  }
`;

function PageHome({ ...props }) {
  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <StyledPageHome>
      {/*
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/styled">Styled</NavLink>
        </li>
        <li>
          <NavLink to="/service">service</NavLink>
        </li>
        <li>
          <NavLink to="/recipes">recipes</NavLink>
        </li>
        <li>
          <NavLink to="/starrating">starrating</NavLink>
        </li>
        <li>
          <NavLink to="/crud">crud</NavLink>
        </li>
        <li>
          <NavLink to="/todo">
            todo
          </NavLink>
        </li>
      </ul>
      */}
      <SideBar></SideBar>

      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/styled" element={<CompStyle />} />
        <Route path="/recipes" element={<RecipesContainer />} />
        <Route path="/starrating" element={<StarRatingContainer />} />
        <Route path="/crud" element={<CrudContainer />} />
        <Route path="/todo" element={<TodoContainer />} />
        <Route path="/counter" element={<CounterContainer />}></Route>
      </Routes>
    </StyledPageHome>
  );
}

PageHome.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.arrayOf(PropTypes.object),
};
PageHome.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
};

export default React.memo(PageHome); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
