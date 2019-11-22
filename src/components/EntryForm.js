import React, { Component } from 'react';
import { storage } from '../firebase/firebase'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input/basic-input'
import Select from 'react-select'
import { isValidPhoneNumber } from 'react-phone-number-input'
import uuid from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Static array to be used on the 'team' multiselect dropdown
const teamOptions = [
	{ value: 'space', label: 'Space' },
	{ value: 'synergy', label: 'Synergy' },
	{ value: 'atomic', label: 'Atomic' },
	{ value: 'cash', label: 'Cash' },
	{ value: 'steve', label: 'Steve' },
	{ value: 'leadership', label: 'Leadership' }
  ];

export default class EntryForm extends Component {
	// this is a class component since we need to handle its state in order to store all the values from the form
	constructor(props){
		super(props);

		// since this component is used for both add and edit, we set the default values of the form
		// to be either the existing entry values, or empty
		this.state = {
			entryType: props.entry ? props.entry.entryType : '',
			otherName: props.entry ? props.entry.otherName : '',
			roomName: props.entry ? props.entry.roomName : '',
			firstName: props.entry ? props.entry.firstName : '',
			lastName: props.entry ? props.entry.lastName : '',
			team: props.entry ? props.entry.team : '',
			discipline: props.entry ? props.entry.discipline : '',
			position: props.entry ? props.entry.position : '',
			phoneNumber: props.entry ? props.entry.phoneNumber : '',
			phoneExtension: props.entry ? props.entry.phoneExtension : '',
			email: props.entry ? props.entry.email : '',
			hometown: props.entry ? props.entry.hometown : '',
			college: props.entry ? props.entry.college : '',
			spouse: props.entry ? props.entry.spouse : '',
			children: props.entry ? props.entry.children : '',

			image: null,
			imageId: props.entry ? props.entry.imageId : '',
			imageUrl: props.entry ? props.entry.imageUrl : '',
			imageFileName: '',
			imageProgress: 0,

			errorMessage: '',
			successMessage: '',

			selectedTeam: null
		}
	}

	// Class methods that will change the state values as input values change
	entryTypeOnChange = (e) => {
		const entryType = e.target.value;
		this.setState( () => ( { entryType: entryType} ) );
	};
	otherNameOnChange = (e) => {
		const otherName = e.target.value;
		this.setState( () => ( { otherName: otherName} ) );
	};
	roomNameOnChange = (e) => {
		const roomName = e.target.value;
		this.setState( () => ( { roomName: roomName} ) );
	};
	firstNameOnChange = (e) => {
		const firstName = e.target.value;
		this.setState( () => ( { firstName: firstName} ) );
	};
	lastNameOnChange = (e) => {
		const lastName = e.target.value;
		this.setState( () => ( { lastName: lastName} ) );
	};
	teamOnChange = (selectedTeam) => {
		this.setState( () => ( { team: selectedTeam } ) );
		console.log(`Team state:`, selectedTeam);
	};
	disciplineOnChange = (e) => {
		const discipline = e.target.value;
		this.setState( () => ( { discipline: discipline} ) );
	};
	positionOnChange = (e) => {
		const position = e.target.value;
		this.setState( () => ( { position: position} ) );
	};
	phoneNumberOnChange = (value) => {
		this.setState( () => ( { phoneNumber: value} ) );
	};
	phoneExtensionOnChange = (e) => {
		const phoneExtension = e.target.value;
		this.setState( () => ( { phoneExtension: phoneExtension} ) );
	};
	emailOnChange = (e) => {
		const email = e.target.value;
		this.setState( () => ( { email: email} ) );
	};
	hometownOnChange = (e) => {
		const hometown = e.target.value;
		this.setState( () => ( { hometown: hometown} ) );
	};
	collegeOnChange = (e) => {
		const college = e.target.value;
		this.setState( () => ( { college: college} ) );
	};
	spouseOnChange = (e) => {
		const spouse = e.target.value;
		this.setState( () => ( { spouse: spouse} ) );
	};
	childrenOnChange = (e) => {
		const children = e.target.value;
		this.setState( () => ( { children: children} ) );
	};
	imageOnChange = (e) => {
		if(e.target.files[0]){
			const image = e.target.files[0];
			const imageFileName = e.target.files[0].name;
			this.setState( () => ( { imageFileName: imageFileName } ) );
			this.setState( () => ( { image: image } ) );
		}
	};

	// on submit handle that validates the form 
	onFormSubmit = (e) => {
		e.preventDefault();

		// if adding a person
		if (this.state.entryType === 'person') {

			// if all the required fields were not filled
			if (!this.state.firstName || !this.state.lastName || !this.state.team || !this.state.discipline || !this.state.position || !this.state.email) {
				// Set error
				this.setState(({errorMessage: 'Please fill all the required fields.'}));
			} else {
				// checks if phone number is valid 
				if (this.state.phoneNumber && !isValidPhoneNumber('+1'+this.state.phoneNumber)) {
					this.setState(({errorMessage: 'Please enter a valid phone number.'}));
				} else {
					// clear error message
					this.setState(({errorMessage: ''}));

					// if editing, set success message
					if(this.props.entry){
						this.setState(({successMessage: 'Entry edited successfully.'}));
					}

					this.submitEntry();
				}
			}

		// if adding a room
		} else if ( this.state.entryType === 'room' ) {
			// checks if required fields were filled
			if (!this.state.roomName || !this.state.phoneExtension) {
				// Set error
				this.setState(({errorMessage: 'Please fill all the required fields.'}));
			} else {
				// clear error message
				this.setState(({errorMessage: ''}));

				// if editing, set success message
				if(this.props.entry){
					this.setState(({successMessage: 'Entry edited successfully.'}));
				}

				this.submitEntry();
			}

		// if adding an 'other' entry
		} else if ( this.state.entryType === 'other' ) {
			// checks if required fields were filled
			if (!this.state.otherName || !this.state.phoneExtension) {
				// Set error
				this.setState(({errorMessage: 'Please fill all the required fields.'}));
			} else {
				// clear error message
				this.setState(({errorMessage: ''}));

				// if editing, set success message
				if(this.props.entry){
					this.setState(({successMessage: 'Entry edited successfully.'}));
				}

				this.submitEntry();
			}
		}
	};

	// function that ultimately calls the onSubmit() function of the parent component (EntryPage or AddEntry) that was passed as a prop
	submitEntry = () => {
		// checks if an image was uploaded. If so, handles the upload process to firebase storage
		if (this.state.image) {
			const image = this.state.image;

			// if editing an entry and new photo is being uploaded, we use the old imageId so we override the old photo on firebase storage
			const imageId = this.state.imageId ? this.state.imageId : uuid();
			const uploadTask = storage.ref(`photos/${imageId}`).put(image);

			// first, we have to upload the file to firebase storage, so we can get the image URL
			// after uploading the image to firebase. We use on() to set an observer on the upload process.
			// on() takes three callback functions as arguments: progress, error, after complete 
			uploadTask.on('state_changed',
				(snapshot) => {
					//progress
					const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
					this.setState( () => ( { imageProgress: progress } ) );
				},
				(error) => {
					// error
					console.log(error)
				},
				() => {
					// Once the upload is completed, we submit the values including the image URL
					storage.ref('photos').child(imageId).getDownloadURL().then( (url) => {
						// calls the onSubmit function that was passed as a prop to EntryForm
						this.props.onSubmit({
							entryType: this.state.entryType,
							otherName: this.state.otherName,
							roomName: this.state.roomName,
							firstName: this.state.firstName,
							lastName: this.state.lastName,
							team: this.state.team,
							discipline: this.state.discipline,
							position: this.state.position,
							phoneNumber: this.state.phoneNumber,
							phoneExtension: this.state.phoneExtension,
							email: this.state.email,
							hometown: this.state.hometown,
							college: this.state.college,
							spouse: this.state.spouse,
							children: this.state.children,
							imageId: imageId,
							imageUrl: url,
						})
					})
				}
			)

		// if no image was uploaded, submit the form without uploading image to firebase storage
		} else {
			// calls the onSubmit function that was passed as a prop to EntryForm
			this.props.onSubmit({
				entryType: this.state.entryType,
				otherName: this.state.otherName,
				roomName: this.state.roomName,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				team: this.state.team,
				discipline: this.state.discipline,
				position: this.state.position,
				phoneNumber: this.state.phoneNumber,
				phoneExtension: this.state.phoneExtension,
				email: this.state.email,
				hometown: this.state.hometown,
				college: this.state.college,
				spouse: this.state.spouse,
				children: this.state.children,
				imageId: this.state.imageId,
				imageUrl: this.state.imageUrl,
			})
		}
	}
	
	render() {
		return (
			<div className="entry-form">
				<form onSubmit={this.onFormSubmit}>

					{/* select field to check if entry is person or room  */}
					{!this.props.entry &&
						<div className="entry-form__entry-type">
							<h3>Entry Type</h3>
							<div className="input-w-icon-container">
								<select className="input-w-icon-container__input" value={this.state.entryType} onChange={this.entryTypeOnChange} required>
									<option value="">Select Entry Type</option>
									<option value="person">Person</option>
									<option value="room">Room</option>
									<option value="other">Other</option>
								</select>
								<span className="input-w-icon-container__icon"><FontAwesomeIcon icon="caret-down" /></span>
							</div>
						</div>
					}

					{/* shows form for person */}
					{this.state.entryType === 'person' && 
						<div className="entry-form__person">
							<div className="entry-form__general-info">
								<h3>General Information</h3>
								<div className="input-group">
									<input className="input-group__item-50" value={this.state.firstName} type="text" placeholder="First Name *" onChange={this.firstNameOnChange} />
									<input className="input-group__item-50" value={this.state.lastName} type="text" placeholder="Last Name *" onChange={this.lastNameOnChange} />
								</div>

								{/* 3rd-party 'react-select' component for team selection */}
								<Select
									className="react-select-container"
									classNamePrefix="react-select"
									value={this.state.team}
									onChange={this.teamOnChange}
									options={teamOptions}
									isMulti
								/>
								
								<div className="input-group">
									<input className="input-group__item-50" value={this.state.email} type="email" placeholder="Email *" onChange={this.emailOnChange} />
									<input className="input-group__item-50" value={this.state.phoneExtension} type="number" placeholder="Phone Extension" onChange={this.phoneExtensionOnChange}/>
								</div>

								<div className="input-group">
									<input value={this.state.discipline} type="text" placeholder="Discipline *" onChange={this.disciplineOnChange}/>
								</div>

								<div className="input-group">
									<input value={this.state.position} type="text" placeholder="Position *" onChange={this.positionOnChange}/>
								</div>

							</div>

							<div className="entry-form__personal-info">
								<h3>Personal Information</h3>
								<div className="input-group">
									<PhoneInput
										country="US"
										placeholder="Phone Number"
										value={ this.state.phoneNumber }
										onChange={value => this.phoneNumberOnChange(value)} 
									/>
								</div>
								<div className="input-group">
									<input value={this.state.hometown} type="text" placeholder="Hometown" onChange={this.hometownOnChange} />
								</div>

								<div className="input-group">
									<input value={this.state.college} type="text" placeholder="College" onChange={this.collegeOnChange} />
								</div>

								<div className="input-group">
									<input value={this.state.spouse} type="text" placeholder="Spouse or S.O." onChange={this.spouseOnChange} />
								</div>

								<div className="input-group">
									<input value={this.state.children} type="text" placeholder="Children" onChange={this.childrenOnChange} />
								</div>
							</div>

						</div>
					}

					{/* shows this form if adding a room */}
					{this.state.entryType === 'room' && 
						<div className="entry-form__room">
							<h3>Room Information</h3>
							<div className="input-group">
								<input className="input-group__item-50" value={this.state.roomName} type="text" placeholder="Room Name *" onChange={this.roomNameOnChange} />
								<input className="input-group__item-50" value={this.state.phoneExtension} type="number" placeholder="Phone Extension *" onChange={this.phoneExtensionOnChange}/>
							</div>
						</div>
					}

					{/* shows this form if adding an 'other' entry */}
					{this.state.entryType === 'other' && 
						<div className="entry-form__room">
							<h3>Entry Information</h3>
							<div className="input-group">
								<input className="input-group__item-50" value={this.state.otherName} type="text" placeholder="Entry Name *" onChange={this.otherNameOnChange} />
								<input className="input-group__item-50" value={this.state.phoneExtension} type="number" placeholder="Phone Extension *" onChange={this.phoneExtensionOnChange}/>
							</div>
						</div>
					}

					{this.state.entryType && 
						<div className="entry-form__photo">
							<h3>Photo</h3>
							<div className="input-file-upload">
								<input type="file" name="photo" id="photo" onChange={this.imageOnChange}/>
								<label className="input-file-upload__button btn btn-primary" htmlFor="photo">Upload photo</label>
								<span className="input-file-upload__filename">{this.state.imageFileName}</span>
							</div>
							<br/>
						</div>
					}
					
					{this.state.entryType && 
						<div className="entry-form__submit">
							<button className="entry-form__submit-btn btn btn-primary">save</button>
							{this.state.imageProgress > 0 && <progress className="entry-form__progress" value={this.state.imageProgress} max="100"/> }
						</div>
					}

				</form>
				<div className="entry-form__alerts">
					{this.state.errorMessage && <span className="entry-form__error">{this.state.errorMessage}</span>} 
					{this.state.successMessage && <span className="entry-form__success">{this.state.successMessage}</span>} 
				</div>
			</div>
		)
	}
};
