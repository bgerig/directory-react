import React from 'react';
import ReactDOM from 'react-dom/client';
import { onAuthStateChanged } from 'firebase/auth';
import { Provider } from 'react-redux';
import { App } from './App';
import { login, logout } from './actions/auth';
import configureStore from './store/configureStore';
import { auth } from './firebase/firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheckSquare,
  faBars,
  faSearch,
  faCaretDown,
  faTrashAlt,
  faEdit,
  faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import 'normalize.css/normalize.css';
import './assets/scss/styles.scss';

library.add(faCheckSquare, faBars, faSearch, faCaretDown, faTrashAlt, faEdit, faArrowCircleLeft);

export const store = configureStore();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

// Initialize the Firebase auth listener
const initAuthListener = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.dispatch(login(user.uid));
    } else {
      store.dispatch(logout());
    }
  });
};

initAuthListener();
