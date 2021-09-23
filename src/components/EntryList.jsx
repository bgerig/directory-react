import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setTextFilter, sortByFirstName, sortRoomsByName, sortOtherByName } from "../actions/filters";
import { getVisibleEntries } from "../selectors/entries";
import EntryListItem from "./EntryListItem";

const EntryList = (props) => {
    const { entries, dispatch, team, type } = props;

    useEffect(() => {
        if (type === "room") {
            dispatch(sortRoomsByName());
        } else if (type === "other") {
            dispatch(sortOtherByName());
        } else {
            dispatch(sortByFirstName());
        }

        return () => dispatch(setTextFilter({ text: "" }));
    }, [team, type]);

    return (
        <div className="entry-list">
            {entries.length === 0 && (
                <div className="entry-list__message">
                    <h3>sorry mate, no entries found</h3>
                </div>
            )}
            {entries.map((entry) => {
                return <EntryListItem entry={entry} key={entry.id} />;
            })}
        </div>
    );
};

const mapStateToProps = (state, props) => ({
    entries: getVisibleEntries(state.entries, state.filters, props.type, props.team),
});

export default connect(mapStateToProps)(EntryList);
