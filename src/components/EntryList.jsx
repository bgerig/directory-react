import React, { Component } from 'react';
import { connect } from 'react-redux';
import EntryListItem from './EntryListItem';
import { setTextFilter, sortByFirstName, sortRoomsByName, sortOtherByName } from '../actions/filters';
import { getVisibleEntries } from '../selectors/entries';

class EntryList extends Component {  //we destructure the props object being passed

	// Resets filters every time the component updates, since the component is never re-mounted
	componentDidUpdate(prevProps) {
		// Only resets filter if filtering
		if(prevProps.team !== this.props.team) {
			this.props.dispatch(setTextFilter({text: ''}));
			if (this.props.type === 'room') {
				this.props.dispatch(sortRoomsByName());
			} else if (this.props.type === 'other') {
				this.props.dispatch(sortOtherByName());
			} else {
				this.props.dispatch(sortByFirstName());
			}
		}
	}

	// Resets filters when the component is mounted
	componentWillMount() {
		this.props.dispatch(setTextFilter({text: ''}));
		if (this.props.type === 'room') {
			this.props.dispatch(sortRoomsByName());
		} else if (this.props.type === 'other') {
			this.props.dispatch(sortOtherByName());
		} else {
			this.props.dispatch(sortByFirstName());
		}
	}

	render() {
		return (
			<div className="entry-list">
				{ this.props.entries.length === 0 &&
					<div className="entry-list__message">
						<h3>sorry mate, no entries found</h3>
					</div>
				}
				{this.props.entries.map((entry) => {
					return <EntryListItem entry={entry} key={entry.id}  />
				})}
			</div>
		)
	}
};

// Maps store state to props to be passed to the EntryList component
// We can get any property from the store and pass it down as props
const mapStateToProps = (state, props) => (
	{
		entries: getVisibleEntries(state.entries, state.filters, props.type, props.team),
	}
);

// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
// Creates a higher-order component (HOC) for making container components out of base React components
// More info: Presentational vs Container Components [https://redux.js.org/basics/usage-with-react#presentational-and-container-components]
// Any component connected to the Redux store through connect() is reactive, which means it 'subscribes' to the store and it re-renders when the state changes
// in this case, the EntryList component is reactive, so it updates automatically when the store state is updated
const EntryListConnected = connect(mapStateToProps)(EntryList);

export default EntryListConnected;