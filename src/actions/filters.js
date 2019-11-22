// Action to set a text filter (search)
export const setTextFilter = ( {text = ''} = {} ) => (
	{
		type: 'TEXT_FILTER',
		text
	}
);

// Action to sort by first name
export const sortByFirstName = () => ( { type: 'SORT_BY_FIRST_NAME' } );

// Action to sort by last name
export const sortByLastName = () => ( { type: 'SORT_BY_LAST_NAME' } );

// Action to sort by team
export const sortByTeam = () => ( { type: 'SORT_BY_TEAM' } );

// Action to sort by discipline
export const sortByDiscipline = () => ( { type: 'SORT_BY_DISCIPLINE' } );

// Action to sort by phone extension
export const sortByExtension = () => ( { type: 'SORT_BY_EXTENSION' } );

// Action to sort by position
export const sortByPosition = () => ( { type: 'SORT_BY_POSITION' } );

// Action to sort rooms by room name
export const sortRoomsByName = () => ( { type: 'SORT_ROOMS_BY_NAME' } );

// Action to sort rooms by phone extension
export const sortRoomsByExtension = () => ( { type: 'SORT_ROOMS_BY_EXTENSION' } );

// Action to sort other by other name
export const sortOtherByName = () => ( { type: 'SORT_OTHER_BY_NAME' } );

// Action to sort other by phone extension
export const sortOtherByExtension = () => ( { type: 'SORT_OTHER_BY_EXTENSION' } );