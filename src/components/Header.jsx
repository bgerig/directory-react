import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { startLogout } from '../actions/auth';
import { openSidebar, closeSidebar } from '../actions/tools';
import logo from '../assets/images/logo.png';

export const Header = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => !!state.auth.uid);
  const isSidebarOpen = useSelector((state) => state.tools.sidebar === 'open');

  const onStartLogout = () => dispatch(startLogout());

  const sidebarToggle = () => {
    if (isSidebarOpen) {
      dispatch(closeSidebar());
    } else {
      dispatch(openSidebar());
    }
  };

  return (
    <header className="header">
      <div
        className={`header__toggle hamburger hamburger--spin ${isSidebarOpen ? 'is-active' : ''}`}
        onClick={sidebarToggle}
      >
        <div className="hamburger-box">
          <div className="hamburger-inner"></div>
        </div>
      </div>
      <div className="header__logo">
        <a href="/">
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <div className="header__admin">
        {isAuthenticated ? (
          <button onClick={onStartLogout} className="btn btn-secondary">
            sign out
          </button>
        ) : (
          <NavLink to="/login">
            <button className="btn btn-secondary">sign in</button>
          </NavLink>
        )}
      </div>
    </header>
  );
};
