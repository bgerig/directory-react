export const setTextFilter = ({ text = '' } = {}) => ({
  type: 'TEXT_FILTER',
  text,
});
export const sortByFirstName = () => ({ type: 'SORT_BY_FIRST_NAME' });
export const sortByLastName = () => ({ type: 'SORT_BY_LAST_NAME' });
export const sortByTeam = () => ({ type: 'SORT_BY_TEAM' });
export const sortByDiscipline = () => ({ type: 'SORT_BY_DISCIPLINE' });
export const sortByExtension = () => ({ type: 'SORT_BY_EXTENSION' });
export const sortByPosition = () => ({ type: 'SORT_BY_POSITION' });
export const sortRoomsByName = () => ({ type: 'SORT_ROOMS_BY_NAME' });
export const sortRoomsByExtension = () => ({ type: 'SORT_ROOMS_BY_EXTENSION' });
export const sortOtherByName = () => ({ type: 'SORT_OTHER_BY_NAME' });
export const sortOtherByExtension = () => ({ type: 'SORT_OTHER_BY_EXTENSION' });
