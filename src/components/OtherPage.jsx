import React from "react";
import EntryList from "./EntryList";
import EntryListFilters from "./EntryListFilters";
import Header from "./Header";
import Sidebar from "./Sidebar";

const OtherPage = (props) => (
    <div className="app-container">
        <Header />
        <div className="main">
            <Sidebar />
            <div className="content">
                <div className="page-title">
                    <h2>Other</h2>
                </div>
                <EntryListFilters type="other" />
                <EntryList type="other" />
            </div>
        </div>
    </div>
);

export default OtherPage;
