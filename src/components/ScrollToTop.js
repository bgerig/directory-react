import { Component } from 'react';
import { withRouter } from 'react-router';

// <ScrollToTop> component  will scroll the window up on every navigation.
// this fixes the issue when you have a long content page and you navigate to, it stays scrolled down
// https://reacttraining.com/react-router/web/guides/scroll-restoration/scroll-to-top
class ScrollToTop extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			window.scrollTo(0, 0);
		}
	}

	render() {
		return this.props.children;
	}
}
export default withRouter(ScrollToTop);