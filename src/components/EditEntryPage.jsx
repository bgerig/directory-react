import React from "react";
import { connect } from "react-redux";
import { startEditEntry } from "../actions/entries";
import EntryForm from "./EntryForm";
import Layout from "./Layout";

const EditEntryPage = (props) => {
    const { dispatch, entry } = props;

    return (
        <Layout title={`Editing ${entry.firstName} ${entry.lastName}`}>
            <EntryForm entry={entry} onSubmit={(updatedEntry) => dispatch(startEditEntry({ id: entry.id, updates: updatedEntry }))} />
        </Layout>
    );
};

const mapStateToProps = (state, props) => {
    return {
        entry: state.entries.find((entry) => entry.id === props.match.params.id),
    };
};

export default connect(mapStateToProps)(EditEntryPage);
