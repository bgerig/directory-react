import React, { Component } from "react";
import { storage } from "../firebase/firebase";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input/basic-input";
import Select from "react-select";
import { isValidPhoneNumber } from "react-phone-number-input";
import uuid from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// options for the 'team' multiselect dropdown
const teamOptions = [
    { value: "space", label: "Space" },
    { value: "synergy", label: "Synergy" },
    { value: "atomic", label: "Atomic" },
    { value: "cash", label: "Cash" },
    { value: "steve", label: "Steve" },
    { value: "leadership", label: "Leadership" },
];

export default class EntryForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entry: {
                entryType: props.entry ? props.entry.entryType : "",
                otherName: props.entry ? props.entry.otherName : "",
                roomName: props.entry ? props.entry.roomName : "",
                firstName: props.entry ? props.entry.firstName : "",
                lastName: props.entry ? props.entry.lastName : "",
                team: props.entry ? props.entry.team : "",
                discipline: props.entry ? props.entry.discipline : "",
                position: props.entry ? props.entry.position : "",
                phoneNumber: props.entry ? props.entry.phoneNumber : "",
                phoneExtension: props.entry ? props.entry.phoneExtension : "",
                email: props.entry ? props.entry.email : "",
                hometown: props.entry ? props.entry.hometown : "",
                college: props.entry ? props.entry.college : "",
                spouse: props.entry ? props.entry.spouse : "",
                children: props.entry ? props.entry.children : "",
                imageId: props.entry ? props.entry.imageId : "",
                imageUrl: props.entry ? props.entry.imageUrl : "",
            },

            image: null,
            imageFileName: "",
            imageProgress: 0,

            errorMessage: "",
            successMessage: "",

            selectedTeam: null,
        };
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState((prevState) => ({
            entry: {
                ...prevState.entry,
                [name]: value,
            },
        }));
    };

    teamOnChange = (selectedTeam) => {
        this.setState((prevState) => ({
            entry: {
                ...prevState.entry,
                team: selectedTeam,
            },
        }));
    };

    phoneNumberOnChange = (phone) => {
        this.setState((prevState) => ({
            entry: {
                ...prevState.entry,
                phoneNumber: phone,
            },
        }));
    };

    imageOnChange = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            const imageFileName = e.target.files[0].name;
            this.setState({ image, imageFileName });
        }
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        const { entry } = this.state;

        const requiredFieldsError = "Please fill all the required fields.";
        const invalidPhoneError = "Please enter a valid phone number.";

        if (entry.entryType === "person") {
            if (!entry.firstName || !entry.lastName || !entry.team || !entry.discipline || !entry.position || !entry.email) {
                this.setState({ errorMessage: requiredFieldsError });
            } else {
                if (entry.phoneNumber && !isValidPhoneNumber(`+1${entry.phoneNumber}`)) {
                    this.setState({ errorMessage: invalidPhoneError });
                } else {
                    this.submitEntry();
                }
            }
            return;
        }

        if (entry.entryType === "room") {
            if (!entry.roomName || !entry.phoneExtension) {
                this.setState({ errorMessage: requiredFieldsError });
            } else {
                this.submitEntry();
            }
            return;
        }

        if (entry.entryType === "other") {
            if (!entry.otherName || !entry.phoneExtension) {
                this.setState({ errorMessage: requiredFieldsError });
            } else {
                this.submitEntry();
            }
        }
    };

    submitEntry = () => {
        const { entry, image } = this.state;

        // checks if an image was uploaded, and if so, upload to firebase storage
        if (image) {
            // if editing an entry and a new photo is being uploaded, we use the old imageId so we override the old photo on firebase storage
            const imageId = entry.imageId ? entry.imageId : uuid();
            const uploadTask = storage.ref(`photos/${imageId}`).put(image);

            // first, we have to upload the file to firebase storage so we can get the image URL.
            // we use on() to set an observer on the upload process. on() takes three callback functions as arguments: progress, error, after complete
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    //progress
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    this.setState(() => ({ imageProgress: progress }));
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    // once the upload is completed, submit the values including the image URL
                    storage
                        .ref("photos")
                        .child(imageId)
                        .getDownloadURL()
                        .then((url) => {
                            this.props.onSubmit({
                                ...entry,
                                imageId: imageId,
                                imageUrl: url,
                            });
                        });
                }
            );

            // if no image was uploaded, submit the form without an image
        } else {
            this.props.onSubmit(entry);
        }

        // clear error message
        this.setState({ errorMessage: "" });

        // if editing, show success message
        if (this.props.entry) {
            this.setState({ successMessage: "Entry edited successfully." });
        }
    };

    render() {
        const { entry } = this.state;
        const isEditing = !!this.props.entry;

        return (
            <div className="entry-form">
                <form onSubmit={this.onFormSubmit}>
                    {!isEditing && (
                        <div className="entry-form__entry-type">
                            <h3>Entry Type</h3>
                            <div className="input-w-icon-container">
                                <select
                                    className="input-w-icon-container__input"
                                    name="entryType"
                                    value={entry.entryType}
                                    onChange={this.onChange}
                                    required
                                >
                                    <option value="">Select Entry Type</option>
                                    <option value="person">Person</option>
                                    <option value="room">Room</option>
                                    <option value="other">Other</option>
                                </select>
                                <span className="input-w-icon-container__icon">
                                    <FontAwesomeIcon icon="caret-down" />
                                </span>
                            </div>
                        </div>
                    )}

                    {entry.entryType === "person" && (
                        <div className="entry-form__person">
                            <div className="entry-form__general-info">
                                <h3>General Information</h3>
                                <div className="input-group">
                                    <input
                                        className="input-group__item-50"
                                        name="firstName"
                                        value={entry.firstName}
                                        type="text"
                                        placeholder="First Name *"
                                        onChange={this.onChange}
                                    />
                                    <input
                                        className="input-group__item-50"
                                        name="lastName"
                                        value={entry.lastName}
                                        type="text"
                                        placeholder="Last Name *"
                                        onChange={this.onChange}
                                    />
                                </div>

                                <Select
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                    value={entry.team}
                                    onChange={this.teamOnChange}
                                    options={teamOptions}
                                    isMulti
                                />

                                <div className="input-group">
                                    <input
                                        className="input-group__item-50"
                                        name="email"
                                        value={entry.email}
                                        type="email"
                                        placeholder="Email *"
                                        onChange={this.onChange}
                                    />
                                    <input
                                        className="input-group__item-50"
                                        name="phoneExtension"
                                        value={entry.phoneExtension}
                                        type="number"
                                        placeholder="Phone Extension"
                                        onChange={this.onChange}
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        name="discipline"
                                        value={entry.discipline}
                                        type="text"
                                        placeholder="Discipline *"
                                        onChange={this.onChange}
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        name="position"
                                        value={entry.position}
                                        type="text"
                                        placeholder="Position *"
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>

                            <div className="entry-form__personal-info">
                                <h3>Personal Information</h3>
                                <div className="input-group">
                                    <PhoneInput
                                        country="US"
                                        placeholder="Phone Number"
                                        name="phoneNumber"
                                        value={entry.phoneNumber}
                                        onChange={(value) => this.phoneNumberOnChange(value)}
                                    />
                                </div>
                                <div className="input-group">
                                    <input name="hometown" value={entry.hometown} type="text" placeholder="Hometown" onChange={this.onChange} />
                                </div>

                                <div className="input-group">
                                    <input name="college" value={entry.college} type="text" placeholder="College" onChange={this.onChange} />
                                </div>

                                <div className="input-group">
                                    <input
                                        name="spouse"
                                        value={entry.spouse}
                                        type="text"
                                        placeholder="Spouse or S.O."
                                        onChange={this.onChange}
                                    />
                                </div>

                                <div className="input-group">
                                    <input name="children" value={entry.children} type="text" placeholder="Children" onChange={this.onChange} />
                                </div>
                            </div>
                        </div>
                    )}

                    {entry.entryType === "room" && (
                        <div className="entry-form__room">
                            <h3>Room Information</h3>
                            <div className="input-group">
                                <input
                                    className="input-group__item-50"
                                    name="roomName"
                                    value={entry.roomName}
                                    type="text"
                                    placeholder="Room Name *"
                                    onChange={this.onChange}
                                />
                                <input
                                    className="input-group__item-50"
                                    name="phoneExtension"
                                    value={entry.phoneExtension}
                                    type="number"
                                    placeholder="Phone Extension *"
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                    )}

                    {entry.entryType === "other" && (
                        <div className="entry-form__room">
                            <h3>Entry Information</h3>
                            <div className="input-group">
                                <input
                                    className="input-group__item-50"
                                    name="otherName"
                                    value={entry.otherName}
                                    type="text"
                                    placeholder="Entry Name *"
                                    onChange={this.onChange}
                                />
                                <input
                                    className="input-group__item-50"
                                    name="phoneExtension"
                                    value={entry.phoneExtension}
                                    type="number"
                                    placeholder="Phone Extension *"
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                    )}

                    {entry.entryType && (
                        <div className="entry-form__photo">
                            <h3>Photo</h3>
                            <div className="input-file-upload">
                                <input type="file" name="photo" id="photo" onChange={this.imageOnChange} />
                                <label className="input-file-upload__button btn btn-primary" htmlFor="photo">
                                    Upload photo
                                </label>
                                <span className="input-file-upload__filename">{this.state.imageFileName}</span>
                            </div>
                            <br />
                        </div>
                    )}

                    {entry.entryType && (
                        <div className="entry-form__submit">
                            <button className="entry-form__submit-btn btn btn-primary">save</button>
                            {this.state.imageProgress > 0 && <progress className="entry-form__progress" value={this.state.imageProgress} max="100" />}
                        </div>
                    )}
                </form>
                <div className="entry-form__alerts">
                    {this.state.errorMessage && <span className="entry-form__error">{this.state.errorMessage}</span>}
                    {this.state.successMessage && <span className="entry-form__success">{this.state.successMessage}</span>}
                </div>
            </div>
        );
    }
}
