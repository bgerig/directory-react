import React from 'react';
import EntryForm from './EntryForm';
import { connect } from 'react-redux';
import { startAddEntry } from '../actions/entries';
import Header from './Header';
import Sidebar from './Sidebar';

const AddEntryPage = (props) => (
  <div className="app-container">
    <Header />
    <div className="main">
        <Sidebar />
        <div className="content">
            <div className="page-title">
                <h2>Add New Entry</h2>
            </div>
            <EntryForm 
              onSubmit={(entry) => {
                props.dispatch(startAddEntry(entry)); //dispatchs the startAddEntry action to add the entry we receive from the EntryForm component
                props.history.push('/'); //redirects to homepage, the history prop is passed by default to components
              }}
            />
        </div>
    </div>
  </div>
);
export default connect()(AddEntryPage);

