import database, { storage } from "../firebase/firebase";

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
    type: "ADD_ENTRY",
    entry: entry,
});

// start the process of dispatching an object to the Redux store,
// it returns a function (instead of an object) that gets called internally by redux, and it gets called with 'dispatch' as a parameter so we can use it inside of the function.
// thunk is needed for this
export const startAddEntry = (entry = {}) => {
    const {
        entryType = "",
        otherName = "",
        roomName = "",
        firstName = "",
        lastName = "",
        team = "",
        discipline = "",
        position = "",
        phoneNumber = "",
        phoneExtension = "",
        email = "",
        hometown = "",
        college = "",
        spouse = "",
        children = "",
        imageId = "",
        imageUrl = "",
    } = entry;

    return (dispatch) => {
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

        // Push entry to Firebase
        // we 'return' the call to the database call so we can return a promise chain for Jest testing
        return database
            .ref("entries")
            .push(entry)
            .then((ref) => {
                dispatch(
                    addEntry({
                        id: ref.key,
                        ...entry,
                    })
                );
            });
    };
};

export const removeEntry = ({ id } = {}) => ({
    type: "REMOVE_ENTRY",
    id,
});

export const startRemoveEntry = ({ id, imageId }) => {
    return (dispatch) => {
        return database
            .ref(`entries/${id}`)
            .remove()
            .then((snapshot) => {
                if (imageId !== "") {
                    // deletes photo from firebase storage first
                    storage
                        .ref("photos")
                        .child(imageId)
                        .delete()
                        .then(() => {
                            dispatch(removeEntry({ id }));
                        });
                } else {
                    dispatch(removeEntry({ id }));
                }
            });
    };
};

export const editEntry = ({ id, updates = {} }) => ({
    type: "EDIT_ENTRY",
    id,
    updates,
});

export const startEditEntry = ({ id, updates = {} }) => {
    return (dispatch) => {
        return database
            .ref(`entries/${id}`)
            .update(updates)
            .then((snapshot) => {
                dispatch(editEntry({ id, updates }));
            });
    };
};

export const setEntries = (entries) => ({
    type: "SET_ENTRIES",
    entries,
});

export const startSetEntries = () => {
    return (dispatch) => {
        return database
            .ref("entries")
            .once("value")
            .then((snapshot) => {
                const entries = [];

                snapshot.forEach((childSnapshot) => {
                    entries.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val(),
                    });
                });

                dispatch(setEntries(entries));
            });
    };
};
