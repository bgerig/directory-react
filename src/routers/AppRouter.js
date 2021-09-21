import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import ScrollToTop from '../components/ScrollToTop';
import DirectoryDashboardPage from '../components/DirectoryDashboardPage';
import AddEntryPage from '../components/AddEntryPage';
import EditEntryPage from '../components/EditEntryPage';
import TeamPage from '../components/TeamPage';
import RoomsPage from '../components/RoomsPage';
import OtherPage from '../components/OtherPage';
import EntryDetailsPage from '../components/EntryDetailsPage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';

// creates a history object using the history API
export const history = createHistory();

const AppRouter = () => (
	// instead of using <BrowserRouter> which comes with its own history object, we use <Router> and pass our own custom history object
	<Router history={history}>
		<ScrollToTop />
		<Switch>
			<Route exact path="/" component={DirectoryDashboardPage} />
			<PrivateRoute path="/create" component={AddEntryPage} />
			<PrivateRoute path="/edit/:id" component={EditEntryPage} />
			<Route path="/details/:id" component={EntryDetailsPage} />
			<Route path="/teams/:team" component={TeamPage} />
			<Route path="/rooms" component={RoomsPage} />
			<Route path="/other" component={OtherPage} />
			<Route path="/login" component={LoginPage} />
			<Route component={NotFoundPage} />
		</Switch>
	</Router>
);
export default AppRouter;