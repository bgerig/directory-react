import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import entriesReducer from '../reducers/entries';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import toolsReducer from '../reducers/tools';

// enhancer to setup Redux DevTools chrome extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  // Store creation using two reducers combined
  const store = createStore(
    combineReducers({
      entries: entriesReducer,
      filters: filtersReducer,
      auth: authReducer,
      tools: toolsReducer,
    }),
    // applyMiddleware(thunk) // we would do this if we didn't want to use Redux DevTools chrome extension
    composeEnhancers(applyMiddleware(thunk)), // instead, we wrap the applyMiddleware call with composeEnhancers
  );

  return store;
};
