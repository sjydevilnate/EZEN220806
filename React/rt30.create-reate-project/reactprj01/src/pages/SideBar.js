import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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
    debugger;
    // isSidebar = !isSidebar;
    setIsSidebar(!isSidebar);
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  const style = {
    /* "color: rgb(255, 255, 255);" */
    color: 'rgb(255, 255, 255)',
  };

  return (
    <StyledSideBar>
      <div id="root">
        <div className="navbar">
          <span className="menu-bars" onClick={handlerIsSidebar}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: 'rgb(255, 255, 255)' }}
            >
              <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
            </svg>
          </span>
        </div>
        {isSidebar && (
          <nav className="nav-menu active">
            <ul className="nav-menu-items">
              <li className="navbar-toggle">
                <span className="menu-bars" onClick={handlerIsSidebar}>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: 'rgb(255, 255, 255)' }}
                  >
                    <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                  </svg>
                </span>
              </li>
              <li className="nav-text">
                <NavLink to="/recipes" onClick={handlerNavLink}>
                  <span>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 1024 1024"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: 'rgb(255, 255, 255)' }}
                    >
                      <path d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z"></path>
                    </svg>
                    <span>recipes</span>
                  </span>
                </NavLink>
              </li>
              <li className="nav-text">
                <NavLink to="/starrating" onClick={handlerNavLink}>
                  <span>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: 'rgb(255, 255, 255)' }}
                    >
                      <path d="M124 80v322c0 7.7-6.3 14-14 14s-14-6.3-14-14V112H80c-17.7 0-32 14.3-32 32v288c0 17.7 14.3 32 32 32h353.1c17 0 30.9-13.8 30.9-30.9V80c0-17.7-14.3-32-32-32l-278 2c-17.7 0-30 12.3-30 30zm66 32h84c7.7 0 14 6.3 14 14s-6.3 14-14 14h-84c-7.7 0-14-6.3-14-14s6.3-14 14-14zm0 160h148c7.7 0 14 6.3 14 14s-6.3 14-14 14H190c-7.7 0-14-6.3-14-14s6.3-14 14-14zm196 108H190c-7.7 0-14-6.3-14-14s6.3-14 14-14h196c7.7 0 14 6.3 14 14s-6.3 14-14 14zm0-160H190c-7.7 0-14-6.3-14-14s6.3-14 14-14h196c7.7 0 14 6.3 14 14s-6.3 14-14 14z"></path>
                    </svg>
                    <span>starrating</span>
                  </span>
                </NavLink>
              </li>
              <li className="nav-text">
                <NavLink to="/crud" onClick={handlerNavLink}>
                  <span>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 576 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: 'rgb(255, 255, 255)' }}
                    >
                      <path d="M504.717 320H211.572l6.545 32h268.418c15.401 0 26.816 14.301 23.403 29.319l-5.517 24.276C523.112 414.668 536 433.828 536 456c0 31.202-25.519 56.444-56.824 55.994-29.823-.429-54.35-24.631-55.155-54.447-.44-16.287 6.085-31.049 16.803-41.548H231.176C241.553 426.165 248 440.326 248 456c0 31.813-26.528 57.431-58.67 55.938-28.54-1.325-51.751-24.385-53.251-52.917-1.158-22.034 10.436-41.455 28.051-51.586L93.883 64H24C10.745 64 0 53.255 0 40V24C0 10.745 10.745 0 24 0h102.529c11.401 0 21.228 8.021 23.513 19.19L159.208 64H551.99c15.401 0 26.816 14.301 23.403 29.319l-47.273 208C525.637 312.246 515.923 320 504.717 320zM408 168h-48v-40c0-8.837-7.163-16-16-16h-16c-8.837 0-16 7.163-16 16v40h-48c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h48v40c0 8.837 7.163 16 16 16h16c8.837 0 16-7.163 16-16v-40h48c8.837 0 16-7.163 16-16v-16c0-8.837-7.163-16-16-16z"></path>
                    </svg>
                    <span>crud</span>
                  </span>
                </NavLink>
              </li>
              <li className="nav-text">
                <NavLink to="/todo" onClick={handlerNavLink}>
                  <span>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: 'rgb(255, 255, 255)' }}
                    >
                      <path d="M337.454 232c33.599 0 61.092-27.002 61.092-60 0-32.997-27.493-60-61.092-60s-61.09 27.003-61.09 60c0 32.998 27.491 60 61.09 60zm-162.908 0c33.599 0 61.09-27.002 61.09-60 0-32.997-27.491-60-61.09-60s-61.092 27.003-61.092 60c0 32.998 27.493 60 61.092 60zm0 44C126.688 276 32 298.998 32 346v54h288v-54c0-47.002-97.599-70-145.454-70zm162.908 11.003c-6.105 0-10.325 0-17.454.997 23.426 17.002 32 28 32 58v54h128v-54c0-47.002-94.688-58.997-142.546-58.997z"></path>
                    </svg>
                    <span>todo</span>
                  </span>
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
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
