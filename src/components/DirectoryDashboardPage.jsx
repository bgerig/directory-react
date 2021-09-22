import React from "react";
import Layout from "./Layout";
import EntryList from "./EntryList";
import EntryListFilters from "./EntryListFilters";

const DirectoryDashboardPage = (props) => {
    return (
        <Layout title="dashboard">
            <EntryListFilters type="person" />
            <EntryList type="person" team="all" />
        </Layout>
    );
};

export default DirectoryDashboardPage;
