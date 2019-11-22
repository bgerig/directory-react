import React, { Component } from 'react';
import EntryList from './EntryList';
import EntryListFilters from './EntryListFilters';
import Header from './Header';
import Sidebar from './Sidebar';

class DirectoryDashboardPage extends Component {
  render() {
    return (
      <div className="app-container">
          <Header />
          <div className="main">
              <Sidebar />
              <div className="content">
                <div className="page-title">
                  <h2>Dashboard</h2>
                </div>
                <EntryListFilters type="person" />
                <EntryList type="person" team="all" /> {/* we pass 'type' as a prop in order to render entries based on entryType (person, room, other)  */}
              </div>
          </div>
      </div>
    );
  }
}

export default DirectoryDashboardPage;
