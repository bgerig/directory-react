import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setTextFilter, sortByFirstName, sortRoomsByName, sortOtherByName } from '../actions/filters';
import { getVisibleEntries } from '../selectors/entries';
import { EntryListItem } from './EntryListItem';

export const EntryList = ({ team, type }) => {
  const dispatch = useDispatch();

  const entries = useSelector((state) => state.entries);
  const filters = useSelector((state) => state.filters);
  const visibleEntries = getVisibleEntries(entries, filters, type, team);

  useEffect(() => {
    if (type === 'room') {
      dispatch(sortRoomsByName());
    } else if (type === 'other') {
      dispatch(sortOtherByName());
    } else {
      dispatch(sortByFirstName());
    }

    // Cleanup function to reset text filter when component is unmounted
    return () => dispatch(setTextFilter({ text: '' }));
  }, [dispatch, team, type]);

  return (
    <div className="entry-list">
      {visibleEntries.length === 0 && (
        <div className="entry-list__message">
          <h3>sorry mate, no entries found</h3>
        </div>
      )}
      {visibleEntries.map((entry) => (
        <EntryListItem entry={entry} key={entry.id} />
      ))}
    </div>
  );
};
