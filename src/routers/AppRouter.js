import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import createHistory from 'history/createBrowserHistory';
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

// history provides an API that lets you manage the history stack, navigate, confirm navigation, and persist state between sessions.
// creates a history object
export const history = createHistory();

const AppRouter = () => (
	// instead of using <BrowserRouter> which comes with its own history object, we use <Router> and pass our own custom history from the history npm plugin
	// window.scrollTo is added so the window starts scrolling from the top every time a component is rendered
	<Router history={history}>
		<ScrollToTop>
			{/* <Header /> */}
			{/* Renders Header component in every route except on /login */}
			{/* <Route path="/" render={ ( props ) => ( props.location.pathname !== "/login") && <Header /> } /> */}
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
		</ScrollToTop>
	</Router>
);
export default AppRouter;