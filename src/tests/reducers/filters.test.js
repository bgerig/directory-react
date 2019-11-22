import filtersReducer from '../../reducers/filters';

test('should set default filter values', () => {
	const state = filtersReducer(undefined, { type:'@@INIT' });
	expect(state).toEqual({
		text: '',
		sortBy: 'firstName'
	})
})

test('should set sortBy value to firstName', () => {
	const state = filtersReducer(undefined, { type:'SORT_BY_FIRST_NAME' });
	expect(state.sortBy).toBe('firstName');
})

test('should set sortBy value to lastName', () => {
	const state = filtersReducer(undefined, { type:'SORT_BY_LAST_NAME' });
	expect(state.sortBy).toBe('lastName');
})