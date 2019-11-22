// Authentication reducer

const authReducerDefaultState = {};

// Params (Array: state of entries array, Obj: action)
const authReducer = (state = authReducerDefaultState, action) => { 
	switch(action.type){
		case 'LOGIN':
			return { //returns object with firebase user id
				uid: action.uid
			}
		case 'LOGOUT':
			return {};
		default:
			return state;
	}
};
export default authReducer;
