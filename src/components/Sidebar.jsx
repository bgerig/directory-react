import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { closeSidebar } from '../actions/tools';
import atomicLogo from '../assets/images/atomic.png';
import cashLogo from '../assets/images/cash.png';
import spaceLogo from '../assets/images/space.png';
import synergyLogo from '../assets/images/synergy.png';
import steveLogo from '../assets/images/steve.png';
import leadershipLogo from '../assets/images/leadership.png';

export const Sidebar = () => {
  const isAuthenticated = useSelector((state) => !!state.auth.uid);
  const isSidebarOpen = useSelector((state) => state.tools.sidebar === 'open');

  return (
    <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar__content">
        <div className="sidebar__item">
          <SidebarNavLink to="/">Home</SidebarNavLink>
        </div>

        <div className="sidebar__section">
          <h3 className="sidebar__section-title">Teams:</h3>
          <div className="sidebar__item">
            <SidebarNavLink to="/teams/leadership">
              <img src={leadershipLogo} width="130" alt="Leadership Logo" />
            </SidebarNavLink>
          </div>
          <div className="sidebar__item">
            <SidebarNavLink to="/teams/atomic">
              <img src={atomicLogo} width="100" alt="Atomic Logo" />
            </SidebarNavLink>
          </div>
          <div className="sidebar__item">
            <SidebarNavLink to="/teams/cash">
              <img src={cashLogo} width="70" alt="Cash Logo" />
            </SidebarNavLink>
          </div>
          <div className="sidebar__item">
            <SidebarNavLink to="/teams/space">
              <img src={spaceLogo} width="80" alt="Space Logo" />
            </SidebarNavLink>
          </div>
          <div className="sidebar__item">
            <SidebarNavLink to="/teams/steve">
              <img src={steveLogo} width="110" alt="Steve Logo" />
            </SidebarNavLink>
          </div>
          <div className="sidebar__item">
            <SidebarNavLink to="/teams/synergy">
              <img src={synergyLogo} width="130" alt="Synergy Logo" />
            </SidebarNavLink>
          </div>
        </div>

        <div className="sidebar__section">
          <h3 className="sidebar__section-title">General:</h3>
          <div className="sidebar__item">
            <SidebarNavLink to="/rooms">Rooms</SidebarNavLink>
          </div>
          <div className="sidebar__item">
            <SidebarNavLink to="/other">Other</SidebarNavLink>
          </div>
        </div>

        {isAuthenticated && (
          <div className="sidebar__section">
            <h3 className="sidebar__section-title">Admin:</h3>
            <div className="sidebar__item">
              <SidebarNavLink to="/create">Add Entry</SidebarNavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const SidebarNavLink = ({ to, children }) => {
  const dispatch = useDispatch();

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? 'sidebar-link-is-active' : '')}
      onClick={handleCloseSidebar}
    >
      {children}
    </NavLink>
  );
};
