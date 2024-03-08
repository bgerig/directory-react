import { useState } from 'react';
import Select from 'react-select';
import PhoneInput from 'react-phone-number-input/input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { storage } from '../firebase/firebase';
import 'react-phone-number-input/style.css';

const getValidInternationalNumber = (phone) => {
  if (phone.startsWith('+1')) {
    return phone;
  }
  return `+1${phone}`;
};

// options for the 'team' multiselect dropdown
const teamOptions = [
  { value: 'space', label: 'Space' },
  { value: 'synergy', label: 'Synergy' },
  { value: 'atomic', label: 'Atomic' },
  { value: 'cash', label: 'Cash' },
  { value: 'steve', label: 'Steve' },
  { value: 'leadership', label: 'Leadership' },
];

export const EntryForm = (props) => {
  const defaultEntry = {
    entryType: '',
    firstName: '',
    lastName: '',
    team: '',
    discipline: '',
    position: '',
    phoneNumber: '',
    phoneExtension: '',
    email: '',
    hometown: '',
    college: '',
    spouse: '',
    children: '',
    imageId: '',
    imageUrl: '',
  };

  // If props.entry exists, override the default values with it
  // Also, conditionally format the phoneNumber with '+1' prefix
  const initialEntry = {
    ...defaultEntry,
    ...(props.entry && {
      ...props.entry,
      phoneNumber: props.entry.phoneNumber ? getValidInternationalNumber(props.entry.phoneNumber) : '',
    }),
  };

  const [entry, setEntry] = useState(initialEntry);
  const [image, setImage] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [imageProgress, setImageProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const isEditing = !!props.entry;

  const onChange = (e) => {
    const { name, value } = e.target;
    setEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value,
    }));
  };

  const teamOnChange = (selectedOption) => {
    setEntry((prevEntry) => ({
      ...prevEntry,
      team: selectedOption,
    }));
  };

  const phoneNumberOnChange = (phone) => {
    setEntry((prevEntry) => ({
      ...prevEntry,
      phoneNumber: phone,
    }));
  };

  const imageOnChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImageFileName(file.name);
    }
  };

  const submitEntry = () => {
    // checks if an image was uploaded, and if so, upload to firebase storage
    if (image) {
      try {
        // if editing an entry and a new photo is being uploaded, we use the old imageId so we override the old photo on firebase storage
        const imageId = entry.imageId ? entry.imageId : uuid();
        const imageRef = storageRef(storage, `photos/${imageId}`);
        const uploadTask = uploadBytesResumable(imageRef, image);

        // listen for state changes, errors, and completion of the upload
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setImageProgress(progress);
          },
          (error) => {
            console.log(error);
          },
          async () => {
            // Upload completed successfully, now we can get the download URL
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            props.onSubmit({
              ...entry,
              imageId: imageId,
              imageUrl: url,
            });
          },
        );
      } catch (error) {
        console.error('Error during the image upload', error);
      }

      // if no image was uploaded, submit the form without an image
    } else {
      props.onSubmit(entry);
    }

    // clear error message
    setErrorMessage('');

    // if editing, show success message
    if (props.entry) {
      setSuccessMessage('Entry edited successfully.');
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const requiredFieldsError = 'Please fill all the required fields.';
    const invalidPhoneError = 'Please enter a valid phone number.';

    if (entry.entryType === 'person') {
      if (!entry.firstName || !entry.lastName || !entry.team || !entry.discipline || !entry.position || !entry.email) {
        setErrorMessage(requiredFieldsError);
      } else {
        if (entry.phoneNumber && !isValidPhoneNumber(entry.phoneNumber)) {
          setErrorMessage(invalidPhoneError);
        } else {
          submitEntry();
        }
      }
      return;
    }

    if (entry.entryType === 'room') {
      if (!entry.roomName || !entry.phoneExtension) {
        setErrorMessage(requiredFieldsError);
      } else {
        submitEntry();
      }
      return;
    }

    if (entry.entryType === 'other') {
      if (!entry.otherName || !entry.phoneExtension) {
        setErrorMessage(requiredFieldsError);
      } else {
        submitEntry();
      }
    }
  };

  return (
    <div className="entry-form">
      <form onSubmit={onFormSubmit}>
        {!isEditing && (
          <div className="entry-form__entry-type">
            <h3>Entry Type</h3>
            <div className="input-w-icon-container">
              <select
                className="input-w-icon-container__input"
                name="entryType"
                value={entry.entryType}
                onChange={onChange}
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

        {entry.entryType === 'person' && (
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
                  onChange={onChange}
                />
                <input
                  className="input-group__item-50"
                  name="lastName"
                  value={entry.lastName}
                  type="text"
                  placeholder="Last Name *"
                  onChange={onChange}
                />
              </div>

              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                value={entry.team}
                onChange={teamOnChange}
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
                  onChange={onChange}
                />
                <input
                  className="input-group__item-50"
                  name="phoneExtension"
                  value={entry.phoneExtension}
                  type="number"
                  placeholder="Phone Extension"
                  onChange={onChange}
                />
              </div>

              <div className="input-group">
                <input
                  name="discipline"
                  value={entry.discipline}
                  type="text"
                  placeholder="Discipline *"
                  onChange={onChange}
                />
              </div>

              <div className="input-group">
                <input
                  name="position"
                  value={entry.position}
                  type="text"
                  placeholder="Position *"
                  onChange={onChange}
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
                  onChange={(value) => phoneNumberOnChange(value)}
                />
              </div>
              <div className="input-group">
                <input name="hometown" value={entry.hometown} type="text" placeholder="Hometown" onChange={onChange} />
              </div>

              <div className="input-group">
                <input name="college" value={entry.college} type="text" placeholder="College" onChange={onChange} />
              </div>

              <div className="input-group">
                <input
                  name="spouse"
                  value={entry.spouse}
                  type="text"
                  placeholder="Spouse or S.O."
                  onChange={onChange}
                />
              </div>

              <div className="input-group">
                <input name="children" value={entry.children} type="text" placeholder="Children" onChange={onChange} />
              </div>
            </div>
          </div>
        )}

        {entry.entryType === 'room' && (
          <div className="entry-form__room">
            <h3>Room Information</h3>
            <div className="input-group">
              <input
                className="input-group__item-50"
                name="roomName"
                value={entry.roomName}
                type="text"
                placeholder="Room Name *"
                onChange={onChange}
              />
              <input
                className="input-group__item-50"
                name="phoneExtension"
                value={entry.phoneExtension}
                type="number"
                placeholder="Phone Extension *"
                onChange={onChange}
              />
            </div>
          </div>
        )}

        {entry.entryType === 'other' && (
          <div className="entry-form__room">
            <h3>Entry Information</h3>
            <div className="input-group">
              <input
                className="input-group__item-50"
                name="otherName"
                value={entry.otherName}
                type="text"
                placeholder="Entry Name *"
                onChange={onChange}
              />
              <input
                className="input-group__item-50"
                name="phoneExtension"
                value={entry.phoneExtension}
                type="number"
                placeholder="Phone Extension *"
                onChange={onChange}
              />
            </div>
          </div>
        )}

        {entry.entryType && (
          <>
            <div className="entry-form__photo">
              <h3>Photo</h3>
              <div className="input-file-upload">
                <input type="file" name="photo" id="photo" onChange={imageOnChange} />
                <label className="input-file-upload__button btn btn-primary" htmlFor="photo">
                  Upload photo
                </label>
                <span className="input-file-upload__filename">{imageFileName}</span>
              </div>
              <br />
            </div>

            <div className="entry-form__submit">
              <button className="entry-form__submit-btn btn btn-primary">save</button>
              {imageProgress > 0 && <progress className="entry-form__progress" value={imageProgress} max="100" />}
            </div>
          </>
        )}
      </form>
      <div className="entry-form__alerts">
        {errorMessage && <span className="entry-form__error">{errorMessage}</span>}
        {successMessage && <span className="entry-form__success">{successMessage}</span>}
      </div>
    </div>
  );
};
