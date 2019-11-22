import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByFirstName, sortByLastName, sortByPosition, sortByTeam, sortByExtension, 
		sortRoomsByName, sortRoomsByExtension, sortOtherByName, sortOtherByExtension } from '../actions/filters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EntryListFilters = (props) => (
	<div className="entry-list-filters">
		<div className="entry-list-filters__search">
			<div className="input-w-icon-container">
				<input className="input-w-icon-container__input" name="search" type="text" placeholder="Search..." value={props.filters.text} autoComplete="off"
					onChange={(e) => {
						// dispatch() is passed automatically as a prop by connect()
						props.dispatch(setTextFilter({text: e.target.value}));
					}} />
				<span className="input-w-icon-container__icon"><FontAwesomeIcon icon="search" /></span>
			</div>
		</div>
		<div className="entry-list-filters__sort">
			<label>Sort By:</label>
			<div className="input-w-icon-container">
				{props.type === 'person' &&
				<select className="input-w-icon-container__input" name="sort" value={props.filters.sortBy} 
					onChange={(e) => {
						switch (e.target.value) {
							case 'firstName':
								props.dispatch(sortByFirstName());
								break;
							case 'lastName':
								props.dispatch(sortByLastName())
								break;
							case 'position':
								props.dispatch(sortByPosition())
								break;
							case 'team':
								props.dispatch(sortByTeam())
								break;
							case 'phoneExtension':
								props.dispatch(sortByExtension())
								break;
							default:
								return;
						}
					}}
				>
					<option value="firstName">First Name</option>
					<option value="lastName">Last Name</option>
					{/* <option value="position">Position</option> */}
					<option value="team">Team</option>
					<option value="phoneExtension">Phone Extension</option>
				</select> }

				{props.type === 'room' &&
				<select className="input-w-icon-container__input" name="sort" value={props.filters.sortRoomsBy} 
					onChange={(e) => {
						switch (e.target.value) {
							case 'roomName':
								props.dispatch(sortRoomsByName())
								break;
							case 'phoneExtension':
								props.dispatch(sortRoomsByExtension())
								break;
							default:
								return;
						}
					}}>
					<option value="roomName">Room Name</option>
					<option value="phoneExtension">Phone Extension</option>
				</select> }

				{props.type === 'other' &&
				<select className="input-w-icon-container__input" name="sort" value={props.filters.sortOtherBy} 
					onChange={(e) => {
						switch (e.target.value) {
							case 'otherName':
								props.dispatch(sortOtherByName())
								break;
							case 'phoneExtension':
								props.dispatch(sortOtherByExtension())
								break;
							default:
								return;
						}
					}}>
					<option value="otherName">Name</option>
					<option value="phoneExtension">Phone Extension</option>
				</select> }

				<span className="input-w-icon-container__icon"><FontAwesomeIcon icon="caret-down" /></span>
			</div>
		</div>
	</div>
);

// Maps state to props form the store, to then be passed to the EntryListFilters component
// We can get any property from the store and pass it down as props
const mapStateToProps = (state) => (
	{
		filters: state.filters
	}
);

// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
// Creates a higher-order component (HOC) for making container components out of base React components
// More info: Presentational vs Container Components [https://redux.js.org/basics/usage-with-react#presentational-and-container-components]
// Any component connected to the Redux store through connect() is reactive, which means it 'subscribes' to the store and it re-renders when the state changes
// in this case, the EntryListFilters component is reactive, so it updates automatically when the store state is updated
const ConnectedEntryListFilters = connect(mapStateToProps)(EntryListFilters);

export default ConnectedEntryListFilters;