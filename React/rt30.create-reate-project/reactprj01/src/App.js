import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import RecipesContainer from './containers/recipes/App';
import StarRatingContainer from './containers/starrating/RatingContainer';
import CrudContainer from './containers/crud/CrudContainer';

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
        <li>
          <NavLink to="/recipes">recipes</NavLink>
        </li>
        <li>
          <NavLink to="/starrating">starrating</NavLink>
        </li>
        <li>
          <NavLink to="/crud">crud</NavLink>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<RecipesContainer />} />
        <Route path="/starrating" element={<StarRatingContainer />} />
        <Route path="/crud" element={<CrudContainer />} />
      </Routes>
    </div>
  );
}

export default App;
