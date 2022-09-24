import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">home</NavLink>
        </li>
        <li>
          <NavLink to="/service">service</NavLink>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
