import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const NavBar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="mainHeader">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        {isAuthenticated && (
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        )}
        {!isAuthenticated ? (
          <>
            <li>
              <NavLink to="/in">Log In</NavLink>
            </li>
            <li>
              <NavLink to="/up">Sign Up</NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/out">Log Out</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
