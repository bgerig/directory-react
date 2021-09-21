import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import { startSetEntries } from "./actions/entries";
import { login, logout } from "./actions/auth";
import configureStore from "./store/configureStore";
import { firebase } from "./firebase/firebase";
import LoadingScreen from "./components/LoadingScreen";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare, faBars, faSearch, faCaretDown, faTrashAlt, faEdit, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import "normalize.css/normalize.css";
import "./assets/scss/styles.scss";

// initialize FontAwesome icons needed
library.add(faCheckSquare, faBars, faSearch, faCaretDown, faTrashAlt, faEdit, faArrowCircleLeft);

// render loading screen while the entries are fetched from the database
ReactDOM.render(<LoadingScreen />, document.getElementById("root"));

// create Redux store
const store = configureStore();

// dispatch the startSetEntries action to get entries from the database
store.dispatch(startSetEntries()).then(() => {
    // render app once entries are retrieved
    ReactDOM.render(
        // wrap our app with Provider to make the Redux store available
        <Provider store={store}>
            <AppRouter />
        </Provider>,
        document.getElementById("root")
    );
});

// set observer on Firebase's auth object
firebase.auth().onAuthStateChanged((user) => {
    // check if user is logged in
    if (user) {
        // dispatch login action to update redux store with the user ID
        store.dispatch(login(user.uid));

        // redirect to homepage if user was at login page
        if (history.location.pathname === "/login") {
            history.push("/");
        }
    } else {
        // dispatch the logout action to update the auth state on the redux store
        store.dispatch(logout());
        history.push("/");
    }
});

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
