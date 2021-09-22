import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class LoginPage extends Component {
	// this is a class component since we need to handle its state in order to store the values from the form
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			error: null
		}
	}

	// Class methods that will change the state values as input values change
	emailOnChange = (e) => {
		const email = e.target.value;
		this.setState(() => ({ email: email }));
	};
	passwordOnChange = (e) => {
		const password = e.target.value;
		this.setState(() => ({ password: password }));
	};

	onFormSubmit = (e) => {
		e.preventDefault();

		// the action startLogin returns a promise chain, that way we can use then() and catch() 
		// we have access to dispatch since components have access to it by default when connected to the Redux store through connect()
		this.props.dispatch(startLogin(this.state.email, this.state.password)).then().catch((error) => {
			this.setState(() => ({ error: error.message }));
		});
	}

	render() {
		return (
			<div className="login-container">
				<form className="login-form">
					<div className="login-card">
						<div className="login-card__logo">
							<img src={logo} alt="Logo" />
						</div>
						<h2 className="login-card__title">Sign In</h2>
						<input className="login-card__input" value={this.state.email} type="text" placeholder="Email" onChange={this.emailOnChange} /><br />
						<input className="login-card__input" value={this.state.password} type="password" placeholder="Password" onChange={this.passwordOnChange} /><br />
						{this.state.error && <p className="login-card__error">{this.state.error}</p>}
						<button className="btn btn-primary login-card__button" onClick={this.onFormSubmit}>Sign In</button>
						<NavLink to="/" className="login-card__back"><FontAwesomeIcon className="goback-icon" icon="arrow-circle-left" /> Go back to dashboard</NavLink>
					</div>
				</form>
			</div>
		)
	}
}
export default connect()(LoginPage);


// TO USE GOOGLE ACCOUNT SIGN IN INSTEAD OF EMAIL/PASSWORD
// const LoginPage = (props) => {
// 	return (
// 		<div>
// 			<h2>Login to L&S Directory</h2>
// 			<button onClick={ props.startLogin }>Login</button>
// 		</div>
// 	)
// }

//  creates functions that dispatch when called, and pass those functions as props to the LoginPage component
// Providing a mapDispatchToProps allows you to specify which actions your component might need to dispatch. 
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		startLogin: () => dispatch(startLogin())
// 	}
// }

// connects a React component to a Redux store.
// provides its connected component with the pieces of the data it needs from the redux store, and the functions it can use to dispatch actions to the store.
// connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)
// export default connect(undefined, mapDispatchToProps)(LoginPage);
