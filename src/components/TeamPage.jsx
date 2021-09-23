import React from "react";
import { connect } from "react-redux";
import EntryList from "./EntryList";
import EntryListFilters from "./EntryListFilters";
import Layout from "./Layout";

const TeamPage = (props) => {
    const team = props.match.params.team;

    return (
        <Layout title={team}>
            <EntryListFilters type="person" />
            <EntryList type="person" team={team} />
        </Layout>
    );
};

export default connect()(TeamPage);
