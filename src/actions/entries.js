import { database, storage } from '../firebase/firebase';
import { ref as databaseRef, push, remove, get, set, child, update } from 'firebase/database';
import { ref as storageRef, deleteObject } from 'firebase/storage';

/*
// How the action generators work:

// Without Firebase:
	- Component calls action generator
	- Action generator returns object
	- Component dispatches object
	- Redux store changes

// With Firebase :
	- Component calls action generator
	- Action generator returns function
	- Component dispatches function
		- Redux by default doesn't allow to dispatch functions so we need to setup a 
		module that's a piece of redux middleware which will add support for this behavior
	- Function runs (has the ability to dispatch other actions and do whatever it wants)
*/

export const addEntry = (entry) => ({
  type: 'ADD_ENTRY',
  entry: entry,
});

// start the process of dispatching an object to the Redux store,
// it returns a function (instead of an object) that gets called internally by redux, and it gets called with 'dispatch' as a parameter so we can use it inside of the function.
// thunk is needed for this
export const startAddEntry = (entry = {}) => {
  const {
    entryType = '',
    otherName = '',
    roomName = '',
    firstName = '',
    lastName = '',
    team = '',
    discipline = '',
    position = '',
    phoneNumber = '',
    phoneExtension = '',
    email = '',
    hometown = '',
    college = '',
    spouse = '',
    children = '',
    imageId = '',
    imageUrl = '',
  } = entry;

  return async (dispatch) => {
    const entry = {
      entryType,
      otherName,
      roomName,
      firstName,
      lastName,
      team,
      discipline,
      position,
      phoneNumber,
      phoneExtension,
      email,
      hometown,
      college,
      spouse,
      children,
      imageId,
      imageUrl,
    };

    const entriesRef = databaseRef(database, 'entries');

    try {
      // Create a new reference for a child location with a unique key and obtain its reference.
      const newEntryRef = push(entriesRef);

      // Set the data to the newly created reference.
      await set(newEntryRef, entry);

      // Dispatch an action with the new entry, including the uniquely generated key.
      dispatch(
        addEntry({
          id: newEntryRef.key,
          ...entry,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeEntry = ({ id } = {}) => ({
  type: 'REMOVE_ENTRY',
  id,
});

export const startRemoveEntry = ({ id, imageId }) => {
  return async (dispatch) => {
    const entryRef = databaseRef(database, `entries/${id}`);

    try {
      await remove(entryRef);

      if (imageId !== '') {
        const photoRef = storageRef(storage, `photos/${imageId}`);
        await deleteObject(photoRef);
      }

      dispatch(removeEntry({ id }));
    } catch (error) {
      console.error(error);
    }
  };
};

export const editEntry = ({ id, updates = {} }) => ({
  type: 'EDIT_ENTRY',
  id,
  updates,
});

export const startEditEntry = ({ id, updates = {} }) => {
  return async (dispatch) => {
    const entryRef = databaseRef(database, `entries/${id}`);

    try {
      await update(entryRef, updates);
      dispatch(editEntry({ id, updates }));
    } catch (error) {
      console.error(error);
    }
  };
};

export const setEntries = (entries) => ({
  type: 'SET_ENTRIES',
  entries,
});

export const startSetEntries = () => {
  return async (dispatch) => {
    const dbRef = databaseRef(database);

    try {
      const snapshot = await get(child(dbRef, 'entries'));
      const entries = [];

      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          entries.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
      } else {
        console.log('No data available');
      }

      dispatch(setEntries(entries));
    } catch (error) {
      console.error(error);
    }
  };
};
