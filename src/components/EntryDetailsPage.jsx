import React from "react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { startRemoveEntry } from "../actions/entries";
import { capitalize, formatPhone } from "../util/util";
import defaultPhoto from "../assets/images/default-photo.jpg";
import Layout from "./Layout";

const EntryDetailsPage = (props) => {
    const { entry, isAuthenticated, history, dispatch } = props;

    const imageUrl = entry.imageUrl ? entry.imageUrl : defaultPhoto;
    const hasPersonalInfo = entry.phoneNumber || entry.hometown || entry.college || entry.spouse || entry.children;

    const deleteEntry = () => {
        if (window.confirm("Are you sure you want to delete this entry?")) {
            dispatch(startRemoveEntry({ id: entry.id, imageId: entry.imageId })).then(history.push("/"));
        }
    };

    if (!entry) {
        return <Redirect to="/" />;
    }

    return (
        <Layout
            title={
                <span className="goback" onClick={() => history.goBack()}>
                    <FontAwesomeIcon className="goback-icon" icon="arrow-circle-left" />
                    <span className="goback-text">go back</span>
                </span>
            }
        >
            <div className="entry-details">
                <div className="entry-details__card">
                    <div className="entry-details__image" style={{ backgroundImage: "url(" + imageUrl + ")" }}></div>

                    {entry.entryType === "person" && (
                        <div className="entry-details__person">
                            <h2 className="entry-details__name">
                                {entry.firstName} {entry.lastName}
                            </h2>
                            <p className="entry-details__position">{entry.position.toUpperCase()}</p>

                            <div className="entry-details__badge-wrapper">
                                {entry.team.map((team, index) => {
                                    return (
                                        <NavLink to={`/teams/${team.value}`} key={index}>
                                            <span className={`entry-details__badge entry-details__badge--${team.value}`}>{team.value}</span>
                                        </NavLink>
                                    );
                                })}
                            </div>

                            {entry.phoneExtension && (
                                <h3 className="entry-details__extension">
                                    <a href={`tel:605373${entry.phoneExtension}`}>Ext. {entry.phoneExtension}</a>
                                </h3>
                            )}
                        </div>
                    )}

                    {entry.entryType === "room" && (
                        <div className="entry-details__room">
                            <h2 className="entry-details__name">{entry.roomName}</h2>
                            {entry.phoneExtension && (
                                <h3 className="entry-details__extension">
                                    <a href={`tel:605373${entry.phoneExtension}`}>Ext. {entry.phoneExtension}</a>
                                </h3>
                            )}
                        </div>
                    )}

                    {entry.entryType === "other" && (
                        <div className="entry-details__room">
                            <h2 className="entry-details__name">{entry.otherName}</h2>
                            {entry.phoneExtension && <h3 className="entry-details__extension">Ext. {entry.phoneExtension}</h3>}
                        </div>
                    )}

                    {isAuthenticated && (
                        <div className="entry-details__control">
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

                {entry.entryType === "person" && (
                    <div className="entry-details__info">
                        <div className="entry-details__general-info">
                            <h3>General Information</h3>
                            <div className="entry-field">
                                <h4 className="entry-field__title">Email:</h4>
                                <p className="entry-field__content">
                                    <a href={`mailto: ${entry.email}`}>{entry.email}</a>
                                </p>
                            </div>
                            <div className="entry-field">
                                <h4 className="entry-field__title">Discipline:</h4>
                                <p className="entry-field__content">{capitalize(entry.discipline)}</p>
                            </div>
                        </div>

                        {hasPersonalInfo && (
                            <div className="entry-details__personal-info">
                                <h3>Personal Information</h3>
                                {entry.phoneNumber && (
                                    <div className="entry-field">
                                        <h4 className="entry-field__title">Phone Number:</h4>
                                        <p className="entry-field__content">
                                            <a href={`tel:${entry.phoneNumber}`}>{formatPhone(entry.phoneNumber)}</a>
                                        </p>
                                    </div>
                                )}
                                {entry.hometown && (
                                    <div className="entry-field">
                                        <h4 className="entry-field__title">Hometown:</h4>
                                        <p className="entry-field__content">{capitalize(entry.hometown)}</p>
                                    </div>
                                )}
                                {entry.college && (
                                    <div className="entry-field">
                                        <h4 className="entry-field__title">College:</h4>
                                        <p className="entry-field__content">{capitalize(entry.college)}</p>
                                    </div>
                                )}
                                {entry.spouse && (
                                    <div className="entry-field">
                                        <h4 className="entry-field__title">Spouse/S.O. :</h4>
                                        <p className="entry-field__content">{capitalize(entry.spouse)}</p>
                                    </div>
                                )}
                                {entry.children && (
                                    <div className="entry-field">
                                        <h4 className="entry-field__title">Children:</h4>
                                        <p className="entry-field__content">{capitalize(entry.children)}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
};

const mapStateToProps = (state, props) => ({
    entry: state.entries.find((entry) => entry.id === props.match.params.id),
    isAuthenticated: !!state.auth.uid,
});

export default connect(mapStateToProps)(EntryDetailsPage);
