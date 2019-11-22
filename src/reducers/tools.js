// Tools reducer

const toolsReducerDefaultState = {
	sidebar: 'closed'
};

// Params (Obj: default state, Obj: action)
const toolsReducer = (state = toolsReducerDefaultState, action) => { 
	switch(action.type){
		case 'OPEN_SIDEBAR':
			document.body.classList.add('w-sidebar-open');
			return {...state, sidebar: 'open'};
		case 'CLOSE_SIDEBAR':
			document.body.classList.remove('w-sidebar-open');
			return {...state, sidebar: 'closed'};
		default:
			return state;
	}
};
export default toolsReducer;
