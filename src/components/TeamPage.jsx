import React, { Component } from 'react';
import { connect } from 'react-redux';
import EntryList from './EntryList';
import EntryListFilters from './EntryListFilters';
import { setTextFilter } from '../actions/filters';
import Header from './Header';
import Sidebar from './Sidebar';

class TeamPage extends Component {  //we destructure the props object being passed
	render() {
		return (
		<div className="app-container">
			<Header />
			<div className="main">
				<Sidebar />
				<div className="content">
					<div className="page-title">
						<h2>{this.props.match.params.team}</h2>
					</div>
					<EntryListFilters type="person" />
					<EntryList type="person" team={this.props.match.params.team} /> {/* we pass 'type' as a prop in order to render entries based on entryType (person, room, other)  */}
				</div>
			</div>
		</div>
		)
	}   
};

// we pass these dispatch actions as props so we can use them inside our component
const mapDispatchToProps = (dispatch) => {
	return {
		setTextFilter: () => dispatch(setTextFilter())
	}
}

export default connect(null, mapDispatchToProps)(TeamPage);