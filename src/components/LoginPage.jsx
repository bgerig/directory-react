import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { startLogin } from "../actions/auth";
import logo from "../assets/images/logo.png";

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: null,
        };
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    };

    onFormSubmit = (e) => {
        e.preventDefault();

        const { dispatch } = this.props;
        const { email, password } = this.state;

        dispatch(startLogin(email, password))
            .then()
            .catch((error) => {
                this.setState({ error: error.message });
            });
    };

    render() {
        return (
            <div className="login-container">
                <form className="login-form">
                    <div className="login-card">
                        <div className="login-card__logo">
                            <img src={logo} alt="Logo" />
                        </div>
                        <h2 className="login-card__title">Sign In</h2>

                        <input
                            className="login-card__input"
                            name="email"
                            value={this.state.email}
                            type="text"
                            placeholder="Email"
                            onChange={this.onChange}
                        />
                        <br />
                        <input
                            className="login-card__input"
                            name="password"
                            value={this.state.password}
                            type="password"
                            placeholder="Password"
                            onChange={this.onChange}
                        />
                        <br />

                        {this.state.error && <p className="login-card__error">{this.state.error}</p>}

                        <button className="btn btn-primary login-card__button" onClick={this.onFormSubmit}>
                            Sign In
                        </button>

                        <NavLink to="/" className="login-card__back">
                            <FontAwesomeIcon className="goback-icon" icon="arrow-circle-left" /> Go back to dashboard
                        </NavLink>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect()(LoginPage);
