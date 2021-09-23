const defaultState = {
    sidebar: "closed",
};

const toolsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "OPEN_SIDEBAR":
            return { ...state, sidebar: "open" };
        case "CLOSE_SIDEBAR":
            return { ...state, sidebar: "closed" };
        default:
            return state;
    }
};
export default toolsReducer;
