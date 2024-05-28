import { NavLink, Outlet } from 'react-router-dom';

export default function About() {
  return (
    <div>
      <div className="component">About Page</div>
      <nav className="mainHeader">
        <ul>
          <li>
            <NavLink to="bio">Bio</NavLink>
          </li>
          <li>
            <NavLink to="detail">Detail</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
