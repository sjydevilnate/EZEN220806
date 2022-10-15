import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import { SidebarData } from '../constants/SidebarData';

const StyledSideBar = styled.div`
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */
  .home,
  .reports,
  .products {
    display: flex;
    height: 90vh;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
  }

  .navbar {
    background-color: #060b26;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .menu-bars {
    margin-left: 2rem;
    font-size: 2rem;
    background: none;
  }

  .nav-menu {
    background-color: #060b26;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: -100%;
    transition: 850ms;
    z-index: 100;
  }

  .nav-menu.active {
    left: 0;
    transition: 350ms;
  }

  .nav-text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 8px 0px 8px 16px;
    list-style: none;
    height: 60px;
  }

  .nav-text a {
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;
  }

  .nav-text a:hover {
    background-color: #1a83ff;
  }

  .nav-menu-items {
    width: 100%;
  }

  .navbar-toggle {
    background-color: #060b26;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  span {
    margin-left: 16px;
  }
`;

function SideBar({ ...props }) {
  // useState 를 사용한 컴포넌트의 상태값 설정
  const [isSidebar, setIsSidebar] = useState(false);

  // 이벤트 핸들러 작성.
  const handlerIsSidebar = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(e.target);
    // e.stopPropagation(); // 이벤트 버블링 방지. 이벤트 취소

    // isSidebar = !isSidebar;
    setIsSidebar(!isSidebar);
  };

  const handlerNavLink = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다d
    console.log(e.target);
    //  e.stopPropagation(); // 이벤트 버블링 방지. 이벤트 취소

    // setIsSidebar(false);
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  const style = {
    /* "color: rgb(255, 255, 255);" */
    color: 'rgb(255, 255, 255)',
  };

  return (
    <StyledSideBar>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar">
          <NavLink to="#" className="menu-bars">
            <FaIcons.FaBars onClick={handlerIsSidebar} />
          </NavLink>
        </div>
        {isSidebar && (
          <nav className="nav-menu active">
            <ul className="nav-menu-items" onClick={handlerIsSidebar}>
              <li className="navbar-toggle">
                <NavLink to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </NavLink>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={item.cName}
                    onClick={handlerNavLink}
                  >
                    <NavLink to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </IconContext.Provider>
    </StyledSideBar>
  );
}

SideBar.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.arrayOf(PropTypes.object),
};
SideBar.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
};

export default React.memo(SideBar); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
