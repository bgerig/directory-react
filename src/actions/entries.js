import database, { storage } from '../firebase/firebase';

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


// Action to add an entry to the Redux store
// Dispatchs an object to the Redux store and changes the store
export const addEntry = (entry) => ({
	type: 'ADD_ENTRY',
	entry: entry
});

// startAddEntry starts that process of dispatching an object to the Redux store, 
// It returns a function (instead of an object) that gets called internally by redux, and it gets called with 'dispatch' as a parameter so we can use it inside of the function. 
// Doing this wouldn't work without the Thunk middleware
export const startAddEntry = ( entry = {} ) => {
	// set defaults by destructuring entry
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
		imageUrl = ''
	} = entry;

	return (dispatch) => { //this return function has access to dispatch
		// Set up entry object to be pushed to Firebase and dispatched to the store
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
			imageUrl
		};

		// Push entry to Firebase
		// we 'return' the call to the database call so we can return a promise chain for Jest testing
		return database.ref('entries').push(entry).then((ref) => { //ref to the child location
			dispatch(addEntry({ //dispatch action to the redux store
				id: ref.key, 
				...entry 
			}));
		})
	}
}

// Action to remove an entry from the Redux store
export const removeEntry = ( { id } = {} ) => (
	{
		type: 'REMOVE_ENTRY',
		id,
	}
);

// startRemoveEntry starts that process of dispatching an object to the Redux store, 
// It returns a function (instead of an object) that gets called internally by redux, and it gets called with 'dispatch' as a parameter so we can use it inside of the function. 
// Doing this wouldn't work without the Thunk middleware
export const startRemoveEntry = ( { id, imageId } ) => {
	return (dispatch) => { //this return function has access to dispatch since the redux library passes it to it
		// we 'return' the call to the database call so we can return a promise chain
		return database.ref(`entries/${id}`).remove().then((snapshot) => { //ref to the child location

			if(imageId !== ''){
				// deletes photo from firebase storage first
				storage.ref('photos').child(imageId).delete().then(() => {
					// File deleted successfully, then dispatches action
					dispatch(removeEntry( { id }));
				})
			} else {
				dispatch(removeEntry( { id }));
			}
			

		});
	}
}

// Action to edit an entry to the Redux store
export const editEntry = ( { id, updates = {} } ) => (
	{
		type: 'EDIT_ENTRY',
		id,
		updates
	}
);

export const startEditEntry = ( { id, updates = {} } ) => {
	return (dispatch) => { //this return function has access to dispatch since the redux library passes it to it
		// we 'return' the call to the database call so we can return a promise chain
		return database.ref(`entries/${id}`).update(updates).then((snapshot) => {
			dispatch(editEntry( { id, updates } ));
		});
	}
};

// Set entries to the Redux store
export const setEntries = (entries) => (
	{
		type: 'SET_ENTRIES',
		entries
	}
);

// startSetEntries starts that process of dispatching and setting the Redux store with the entries from the database
// It returns a function (instead of an object) that gets called internally by redux, and it gets called with 'dispatch' as a parameter so we can use it inside of the function. 
// Doing this wouldn't work without the Thunk middleware
export const startSetEntries = () => {
	return (dispatch) => { //this return function has access to dispatch

		// we 'return' the call to the database call so we can return a promise chain
		return database.ref('entries').once('value').then((snapshot) => { //ref to the child location
			const entries = []; //array to store data, since we need to parse it from an object to an array
			
			snapshot.forEach((childSnapshot) => {
				entries.push({
					id: childSnapshot.key,
					...childSnapshot.val()
				});
			});

			//dispatch action to set entries into the Redux store
			dispatch(setEntries(entries));
		})
	}
}