import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import { openSidebar, closeSidebar } from "../actions/tools";
import logo from "../assets/images/logo.png";

const Header = (props) => {
    const { isAuthenticated, isSidebarOpen, closeSidebar, openSidebar, startLogout } = props;

    const sidebarToggle = () => {
        if (isSidebarOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    };

    return (
        <header className="header">
            <div className={`header__toggle hamburger hamburger--spin ${isSidebarOpen ? "is-active" : ""}`} onClick={sidebarToggle}>
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
                    <button onClick={startLogout} className="btn btn-secondary">
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

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.uid,
        isSidebarOpen: state.tools.sidebar === "open",
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startLogout: () => dispatch(startLogout()),
        openSidebar: () => dispatch(openSidebar()),
        closeSidebar: () => dispatch(closeSidebar()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
