import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ( { //we destructure the props that are passed as arguments
	isAuthenticated, 
	component: Component, //we rename component to Component since we are going to render it later
	...rest //we grab the rest of the props we didn't desctructure and put them into a variable called 'rest', it will contain everything but the destructured props above
} ) => ( 
	// we return the Route component if the user is authenticated
	<Route 
		// we pass the same props that were passed to PrivateRoute
		{...rest} 

		// this arrow function will implicitly return some JSX
		component={(props) => { //we get the props that were passed to Route, so we can pass them through to the individual components
			if(isAuthenticated) {
				return ( 
					//we call the component that got passed as prop if user is authenticated
					<div>
						<Component {...props} /> 
					</div>
				)
			} else {
				return <Redirect to="/" /> // if not authenticated, redirects to home
			}
		}} 
	/>
)

const mapStateToProps = (state) => {
	return {
		isAuthenticated: !!state.auth.uid
	}
}

export default connect(mapStateToProps)(PrivateRoute);