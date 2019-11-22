import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import { startSetEntries } from './actions/entries';
import { login, logout } from './actions/auth';
import configureStore from './store/configureStore';
import { firebase } from './firebase/firebase';

import LoadingScreen from './components/LoadingScreen';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faBars, faSearch, faCaretDown, faTrashAlt, faEdit, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

import 'normalize.css/normalize.css';
import './assets/scss/styles.scss';
// import * as serviceWorker from './serviceWorker';

// initializes FontAwesome icons to be used
library.add(faCheckSquare, faBars, faSearch, faCaretDown, faTrashAlt, faEdit, faArrowCircleLeft)

// creates Redux store
const store = configureStore();

// Main app JSX to render
const jsx = (
	// the Provider component is a react-redux component used to connect React with Redux and manage states
	// it  wraps the React application and makes the Redux state available to all container components in the application’s hierarchy
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

//we render a loading message while the entries are fetched from the database
ReactDOM.render(<LoadingScreen />, document.getElementById('root')); 

// dispatchs the startSetEntries action to get entries from the database
store.dispatch(startSetEntries()).then(() => {
	// once the data is retrieved, the actual app is rendered
	ReactDOM.render(jsx, document.getElementById('root'));
});

// sets an observer on the Auth object
firebase.auth().onAuthStateChanged((user) => {
	// checks if user is logged in
	if (user){

		// dispatches the login action to set the Auth state on the redux store with the user ID
		store.dispatch(login(user.uid)); 

		// conditional to only redirect to hompepage if the user is at the login page and successfully logs in
		if (history.location.pathname === '/login') {
			history.push('/');
		}

	} else {
		// dispatches the logout action to change the Auth state on the redux store
		store.dispatch(logout());
		history.push('/');
	}
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app
// serviceWorker.unregister();


// const demoState = {
// 	entries: [{
// 		id: 'JWNANGBKIWNBAGYTT82HB4990JABFWWR',
// 		entryType: 'employee',
// 		team: 'space',
// 		discipline: 'digital',
// 		position: 'web developer',
// 		firstName: 'William',
// 		lastName: 'Johnson',
// 		phoneNumber: '4123421208',
// 		dob: '0',
// 	}],
// 	filters: {
// 		text: '',
// 		sortBy: 'firstName', //firstName, lastName, position, team, or discipline
// 	}
// };

// first name
// last name
// photo
// phone extension
// cell number
// hometown
// college
// spouse / so
// children
// email
// office/location

// room