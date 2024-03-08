import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  setTextFilter,
  sortByFirstName,
  sortByLastName,
  sortByPosition,
  sortByTeam,
  sortByExtension,
  sortRoomsByName,
  sortRoomsByExtension,
  sortOtherByName,
  sortOtherByExtension,
} from '../actions/filters';

export const EntryListFilters = ({ type }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(setTextFilter({ text: '' }));
  }, [dispatch]);

  return (
    <div className="entry-list-filters">
      <div className="entry-list-filters__search">
        <div className="input-w-icon-container">
          <input
            className="input-w-icon-container__input"
            name="search"
            type="text"
            placeholder="Search..."
            value={filters.text}
            autoComplete="off"
            onChange={(e) => dispatch(setTextFilter({ text: e.target.value }))}
          />
          <span className="input-w-icon-container__icon">
            <FontAwesomeIcon icon="search" />
          </span>
        </div>
      </div>
      <div className="entry-list-filters__sort">
        <label>Sort By:</label>
        <div className="input-w-icon-container">
          {type === 'person' && (
            <select
              className="input-w-icon-container__input"
              name="sort"
              value={filters.sortBy}
              onChange={(e) => {
                switch (e.target.value) {
                  case 'firstName':
                    dispatch(sortByFirstName());
                    break;
                  case 'lastName':
                    dispatch(sortByLastName());
                    break;
                  case 'position':
                    dispatch(sortByPosition());
                    break;
                  case 'team':
                    dispatch(sortByTeam());
                    break;
                  case 'phoneExtension':
                    dispatch(sortByExtension());
                    break;
                  default:
                    return;
                }
              }}
            >
              <option value="firstName">First Name</option>
              <option value="lastName">Last Name</option>
              <option value="team">Team</option>
              <option value="phoneExtension">Phone Extension</option>
            </select>
          )}

          {type === 'room' && (
            <select
              className="input-w-icon-container__input"
              name="sort"
              value={filters.sortRoomsBy}
              onChange={(e) => {
                switch (e.target.value) {
                  case 'roomName':
                    dispatch(sortRoomsByName());
                    break;
                  case 'phoneExtension':
                    dispatch(sortRoomsByExtension());
                    break;
                  default:
                    return;
                }
              }}
            >
              <option value="roomName">Room Name</option>
              <option value="phoneExtension">Phone Extension</option>
            </select>
          )}

          {type === 'other' && (
            <select
              className="input-w-icon-container__input"
              name="sort"
              value={filters.sortOtherBy}
              onChange={(e) => {
                switch (e.target.value) {
                  case 'otherName':
                    dispatch(sortOtherByName());
                    break;
                  case 'phoneExtension':
                    dispatch(sortOtherByExtension());
                    break;
                  default:
                    return;
                }
              }}
            >
              <option value="otherName">Name</option>
              <option value="phoneExtension">Phone Extension</option>
            </select>
          )}

          <span className="input-w-icon-container__icon">
            <FontAwesomeIcon icon="caret-down" />
          </span>
        </div>
      </div>
    </div>
  );
};
