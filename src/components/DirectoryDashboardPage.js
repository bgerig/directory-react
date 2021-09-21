import React from "react";
import { connect } from "react-redux";
import EntryList from "./EntryList";
import EntryListFilters from "./EntryListFilters";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DirectoryDashboardPage = (props) => {
    const { isSidebarOpen } = props;

    return (
        <div className={`app-container ${isSidebarOpen ? "w-sidebar-open" : ""}`}>
            <Header />
            <div className="main">
                <Sidebar />
                <div className="content">
                    <div className="page-title">
                        <h2>Dashboard</h2>
                    </div>
                    <EntryListFilters type="person" />
                    <EntryList type="person" team="all" />{" "}
                    {/* we pass 'type' as a prop in order to render entries based on entryType (person, room, other)  */}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        isSidebarOpen: state.tools.sidebar === "open",
    };
};

export default connect(mapStateToProps)(DirectoryDashboardPage);
