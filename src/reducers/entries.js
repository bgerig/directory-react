// Entries reducer

const entriesReducerDefaultState = [];

// Params (Array: state of entries array, Obj: action)
const entriesReducer = (state = entriesReducerDefaultState, action) => {
	switch(action.type){
		case 'ADD_ENTRY':
			return [...state, action.entry];
		case 'REMOVE_ENTRY':
			return state.filter(( entry ) => entry.id !== action.id); //returns an array without the entry removed
		case 'SET_ENTRIES':
			return action.entries;
		case 'EDIT_ENTRY':
			return state.map( (entry) => { //maps the current state of the entries array and returns a new array
				if(entry.id === action.id) { // if the current entry in the loop = entry to change
					return { // returns a new entry object, using the spread operator to use the existing data in entry, and override it with the updates
						...entry, 
						...action.updates 
					}
				} else {
					return entry;
				}
			});
		default:
			return state;
	}
};

export default entriesReducer;