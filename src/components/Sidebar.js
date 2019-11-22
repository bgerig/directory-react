import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { closeSidebar } from '../actions/tools';
import atomicLogo from '../assets/images/atomic.png';
import cashLogo from '../assets/images/cash.png';
import spaceLogo from '../assets/images/space.png';
import synergyLogo from '../assets/images/synergy.png';
import steveLogo from '../assets/images/steve.png';
import leadershipLogo from '../assets/images/leadership.png';

// Sidebar component that returns different JSX if user is authenticated
const Sidebar = (props) => (
	<div className={`sidebar ${ props.sidebarStatus === 'open' ? 'sidebar-open' : ''}`}>
		<div className="sidebar__content">
			<div className="sidebar__item">
				<NavLink to="/" exact activeClassName="sidebar-link-is-active" onClick={props.closeSidebar}>Home</NavLink>
			</div>

			<div className="sidebar__section">
				<h3 className="sidebar__section-title">Teams:</h3>
				<div className="sidebar__item">
					<NavLink to="/teams/leadership" activeClassName="sidebar-link-is-active" onClick={props.closeSidebar}>
						<img src={leadershipLogo} width="130" alt="Leadership Logo"  />
					</NavLink>
				</div>
				<div className="sidebar__item">
					<NavLink to="/teams/atomic" activeClassName="sidebar-link-is-active" onClick={props.closeSidebar}>
						<img src={atomicLogo} width="100" alt="Atomic Logo"  />
					</NavLink>
				</div>
				<div className="sidebar__item">
					<NavLink to="/teams/cash" activeClassName="sidebar-link-is-active" onClick={props.closeSidebar}>
						<img src={cashLogo} width="70" alt="Cash Logo"  />
					</NavLink>
				</div>
				<div className="sidebar__item">
					<NavLink to="/teams/space" activeClassName="sidebar-link-is-active" onClick={props.closeSidebar}>
						<img src={spaceLogo} width="80" alt="Space Logo" />
					</NavLink>
				</div>
				<div className="sidebar__item">
					<NavLink to="/teams/steve" activeClassName="sidebar-link-is-active" onClick={props.closeSidebar}>
						<img src={steveLogo} width="110" alt="Steve Logo" />
					</NavLink>
				</div>
				<div className="sidebar__item">
					<NavLink to="/teams/synergy" activeClassName="sidebar-link-is-active" onClick={props.closeSidebar}>
						<img src={synergyLogo} width="130" alt="Synergy Logo" />
					</NavLink>
				</div>
			</div>

			<div className="sidebar__section">
				<h3 className="sidebar__section-title">General:</h3>
				<div className="sidebar__item">
					<NavLink to="/rooms" activeClassName="sidebar-link-is-active" onClick={props.closeSidebar}>Rooms</NavLink>
				</div>
				<div className="sidebar__item">
					<NavLink to="/other" activeClassName="sidebar-link-is-active" onClick={props.closeSidebar}>Other</NavLink>
				</div>
			</div>

			<div className="sidebar__section">
				{props.isAuthenticated && 
				<h3 className="sidebar__section-title">Admin:</h3> }
				{props.isAuthenticated &&
					<div className="sidebar__item">
						<NavLink to="/create" activeClassName="sidebar-link-is-active" onClick={props.closeSidebar}>Add Entry</NavLink>
					</div>
				}
			</div>
		</div>
	</div>
)

const mapStateToProps = (state) => {
	return {
		isAuthenticated: !!state.auth.uid,
		filters: state.filters,
		sidebarStatus: state.tools.sidebar
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		startLogout: () => dispatch(startLogout()),
		closeSidebar: () => dispatch(closeSidebar())
	}
}

// we wrap that component in a withRouter to remove the blocked updates, this is donde to allow the 'sidebar-link-is-active' class on NavLink to update
// https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));

