const authReducer = (state = {}, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                // returns object with firebase user id
                uid: action.uid,
            };
        case "LOGOUT":
            return {};
        default:
            return state;
    }
};
export default authReducer;
