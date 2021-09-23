import { getVisibleEntries } from '../../selectors/entries';
import entries from '../data/testData.js';

test('should filter by text value', () => {
	const result = getVisibleEntries(entries, {
		text: 'atom',
		sortBy: 'firstName'
	})
	expect(result).toEqual([entries[2]]);
})

test('should sort by first name', () => {
	const result = getVisibleEntries(entries, {
		text: '',
		sortBy: 'firstName'
	})
	expect(result).toEqual([ entries[0], entries[2], entries[1] ]);
})

test('should sort by last name', () => {
	const result = getVisibleEntries(entries, {
		text: '',
		sortBy: 'lastName'
	})
	expect(result).toEqual([ entries[1], entries[2], entries[0] ]);
})

