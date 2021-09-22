import React from 'react';
import loader from '../assets/images/loader.gif';

const LoadingScreen = () => (
	<div className="loading-screen">
		<div className="loading-screen__loader"><img src={loader} alt="Loader Icon"/></div>
		<h3>Loading...</h3>
	</div>
)
export default LoadingScreen;
