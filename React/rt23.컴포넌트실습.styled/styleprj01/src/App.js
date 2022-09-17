import logo from "./logo.svg";
// import './App.css';
import styled, { css } from "styled-components";

const StyledApp = styled.div`
  .App {
    text-align: center;
  }

  .App-logo {
    height: 40vmin;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      animation: App-logo-spin infinite 20s linear;
    }
  }

  .App-header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .App-link {
    color: #61dafb;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const StyledCircle = styled.div`
  background: ${(props) => props.color || "black"};
  border-radius: 50%;

  width: 5rem;
  height: 5rem;

  ${(props) =>
    props.huge &&
    css`
      width: 10rem;
      height: 10rem;
    `}
`;

function App() {
  return (
    <StyledApp>
      <StyledCircle></StyledCircle>
      <StyledCircle color={"aqua"} huge={false}></StyledCircle>
      <StyledCircle color={"red"} huge={true}></StyledCircle>
    </StyledApp>
  );
}

export default App;
