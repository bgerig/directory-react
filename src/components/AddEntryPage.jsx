import React from "react";
import { connect } from "react-redux";
import { startAddEntry } from "../actions/entries";
import Layout from "./Layout";
import EntryForm from "./EntryForm";

const AddEntryPage = (props) => (
    <Layout title="Add New Entry">
        <EntryForm
            onSubmit={entry => {
                props.dispatch(startAddEntry(entry));
                props.history.push("/");
            }}
        />
    </Layout>
);
export default connect()(AddEntryPage);
