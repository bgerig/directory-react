import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { startRemoveEntry } from "../actions/entries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import defaultPhoto from "../assets/images/default-photo.jpg";

const EntryListItem = (props) => {
    const { isAuthenticated, entry, dispatch } = props;
    const imageUrl = entry.imageUrl ? entry.imageUrl : defaultPhoto;

    const deleteEntry = () => {
        if (window.confirm("Are you sure you want to delete this entry?")) {
            dispatch(startRemoveEntry({ id: entry.id, imageId: entry.imageId }));
        }
    };

    return (
        <div className="entry-list-item">
            <NavLink to={`/details/${entry.id}`}>
                <div className="entry-list-item__image" style={{ backgroundImage: "url(" + imageUrl + ")" }}></div>
            </NavLink>

            {entry.entryType === "person" && (
                <div className="entry-list-item__person">
                    <div className="entry-list-item__name">
                        <h3>
                            <NavLink to={`/details/${entry.id}`}>
                                {entry.firstName} {entry.lastName}
                            </NavLink>
                        </h3>

                        {entry.team.map((team, index) => {
                            return (
                                <NavLink to={`/teams/${team.value}`} key={index}>
                                    <span className={`entry-list-item__badge entry-list-item__badge--${team.value}`}>{team.value}</span>
                                </NavLink>
                            );
                        })}
                    </div>
                    <p className="entry-list-item__position">{entry.position.toUpperCase()}</p>
                </div>
            )}

            {entry.entryType === "room" && (
                <div className="entry-list-item__room">
                    <h3>
                        <NavLink to={`/details/${entry.id}`}>{entry.roomName}</NavLink>
                    </h3>
                </div>
            )}

            {entry.entryType === "other" && (
                <div className="entry-list-item__room">
                    <h3>
                        <NavLink to={`/details/${entry.id}`}>{entry.otherName}</NavLink>
                    </h3>
                </div>
            )}

            {entry.phoneExtension && (
                <div className="entry-list-item__extension">
                    {entry.entryType === "other" && <h3>Ext. {entry.phoneExtension}</h3>}
                    {entry.entryType !== "other" && (
                        <h3>
                            <a href={`tel:555123${entry.phoneExtension}`}>Ext. {entry.phoneExtension}</a>
                        </h3>
                    )}
                </div>
            )}

            {isAuthenticated && (
                <div className="entry-list-item__control">
                    <span>
                        <NavLink to={`/edit/${entry.id}`}>
                            <FontAwesomeIcon icon="edit" />
                        </NavLink>
                    </span>
                    <span className="entry-list-item__remove" onClick={deleteEntry}>
                        <FontAwesomeIcon icon="trash-alt" />
                    </span>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.uid,
    };
};

export default connect(mapStateToProps)(EntryListItem);
