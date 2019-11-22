import React from 'react';
import EntryForm from './EntryForm';
import { startEditEntry } from '../actions/entries';
import { connect } from 'react-redux';
import Header from './Header';
import Sidebar from './Sidebar';

const EditEntryPage = (props) => (
  <div className="app-container">
    <Header />
    <div className="main">
        <Sidebar />
        <div className="content">
            <div className="page-title">
                <h2>Editing {props.entry.firstName} {props.entry.lastName}</h2>
            </div>
            <EntryForm 
              entry={props.entry} //passing the entry object down to the EntryForm
              onSubmit={(entry) => {
				//dispatchs the startEditEntry action to edit the entry we receive from the EntryForm component
                props.dispatch(startEditEntry( {id: props.entry.id, updates: entry }));
              }}
            />
        </div>
    </div>
  </div>
);

// Maps state from Redux store to props which are passed to the EditEntryPage component
// We can get any property from the store and pass it down as props
const mapStateToProps = (state, props) => (
	{
		entry: state.entries.find((entry) => {
			if (entry.id === props.match.params.id) return true;
			else return false;
		})
	}
);

export default connect(mapStateToProps)(EditEntryPage);
