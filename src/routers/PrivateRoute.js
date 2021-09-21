import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = (props) => {
	const { isAuthenticated, component: Component, ...rest } = props;

	// if logged in, return passed component, otherwise redirect to home
	const componentToRender = (componentProps) => isAuthenticated ? <Component {...componentProps}/> : <Redirect to="/" />;

	return (
		<Route component={componentToRender} {...rest}/>
	);
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: !!state.auth.uid
	}
}

export default connect(mapStateToProps)(PrivateRoute);