import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { openSidebar, closeSidebar } from '../actions/tools';
import logo from '../assets/images/logo.png';

// Header component that returns different JSX if user is authenticated
class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			startLogout: props.startLogout,
			closeSidebar: props.closeSidebar,
			openSidebar: props.openSidebar,
		}
	}

	sidebarToggle = () => {
		if (this.props.sidebarStatus === 'open') {
			this.state.closeSidebar();
		}
		else if (this.props.sidebarStatus === 'closed') {
			this.state.openSidebar();
		}
	}

	render() {
		return (
			<header className="header">
				<div onClick={this.sidebarToggle} className={`header__toggle hamburger hamburger--spin ${this.props.sidebarStatus === 'open' ? 'is-active' : ''}`}>
					<div className="hamburger-box">
						<div className="hamburger-inner"></div>
					</div>
				</div>
				<div className="header__logo">
					<a href="https://l-s.com/" target="_blank" rel="noopener noreferrer"><img src={logo} alt="Logo" /></a>
				</div>
				<div className="header__admin">
					{this.props.isAuthenticated ?
						<button onClick={this.state.startLogout} className="btn btn-secondary">sign out</button> :
						<NavLink to="/login"><button className="btn btn-secondary">sign in</button></NavLink>
					}
				</div>
			</header>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: !!state.auth.uid,
		sidebarStatus: state.tools.sidebar
	}
}

// we pass these dispatch actions as props so we can use them inside our component
const mapDispatchToProps = (dispatch) => {
	return {
		startLogout: () => dispatch(startLogout()),
		openSidebar: () => dispatch(openSidebar()),
		closeSidebar: () => dispatch(closeSidebar()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

