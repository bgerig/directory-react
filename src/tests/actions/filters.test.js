import { setTextFilter, sortByFirstName } from '../../actions/filters'

test('should generate setTextFilter action object', () => {
	const action = setTextFilter({ text: 'some search text'});
	expect(action).toEqual({
		type: 'TEXT_FILTER',
		text: 'some search text'
	})
})