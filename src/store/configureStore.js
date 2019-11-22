import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import entriesReducer from '../reducers/entries';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import toolsReducer from '../reducers/tools';

// if the Redux DevTools exist, the composeEnhancers will be set to that, otherwise the default compose will be used
// this is needed in order to apply the 'Redux Chrome DevTools' properly, along with other middlewares we might have
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
		// applyMiddleware(thunk) //we would do this if we didn't have the Redux DevTools
		composeEnhancers(applyMiddleware(thunk)) //instead, we wrap the applyMiddleware call with composeEnhancers
	);

	return store;
}

