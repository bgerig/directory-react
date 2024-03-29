import { expect, test } from 'vitest';

import entriesReducer from '../../reducers/entries';
import entries from '../data/testData.js';

test('should set default entry values', () => {
  const state = entriesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should add entry', () => {
  const entry = {
    firstName: 'Alex',
    lastName: 'Gerig',
    team: 'space',
    discipline: 'digital',
    position: 'web developer',
  };
  const action = {
    type: 'ADD_ENTRY',
    entry: entry,
  };
  const state = entriesReducer(entries, action);
  expect(state).toEqual([...entries, entry]);
});

test('should delete entry by id', () => {
  const action = {
    type: 'REMOVE_ENTRY',
    id: entries[0].id,
  };
  const state = entriesReducer(entries, action);
  expect(state).toEqual([entries[1], entries[2]]);
});

test('should not delete entry if id is not found', () => {
  const action = {
    type: 'REMOVE_ENTRY',
    id: '-1',
  };
  const state = entriesReducer(entries, action);
  expect(state).toEqual(state);
});

test('should edit entry by id', () => {
  const action = {
    type: 'EDIT_ENTRY',
    id: entries[0].id,
    updates: {
      firstName: 'Don',
      lastName: 'Draper',
    },
  };
  const state = entriesReducer(entries, action);
  expect(state[0]).toEqual({
    ...state[0],
    firstName: 'Don',
    lastName: 'Draper',
  });
});

test('should not edit entry if not found', () => {
  const action = {
    type: 'EDIT_ENTRY',
    id: '-1',
    updates: {
      firstName: 'Don',
      lastName: 'Draper',
    },
  };
  const state = entriesReducer(entries, action);
  expect(state).toEqual(state);
});

test('should set entries', () => {
  const action = {
    type: 'SET_ENTRIES',
    entries: [entries[1]],
  };
  const state = entriesReducer(entries, action);
  expect(state).toEqual([entries[1]]);
});
