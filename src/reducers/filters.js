const defaultState = {
    text: "",
    sortBy: "firstName",
    sortRoomsBy: "roomName",
    sortOtherBy: "otherName",
};

export const filtersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "TEXT_FILTER":
            return { ...state, text: action.text };
        case "SORT_BY_FIRST_NAME":
            return { ...state, sortBy: "firstName" };
        case "SORT_BY_LAST_NAME":
            return { ...state, sortBy: "lastName" };
        case "SORT_BY_TEAM":
            return { ...state, sortBy: "team" };
        case "SORT_BY_DISCIPLINE":
            return { ...state, sortBy: "discipline" };
        case "SORT_BY_EXTENSION":
            return { ...state, sortBy: "phoneExtension" };
        case "SORT_BY_POSITION":
            return { ...state, sortBy: "position" };
        case "SORT_ROOMS_BY_NAME":
            return { ...state, sortRoomsBy: "roomName" };
        case "SORT_ROOMS_BY_EXTENSION":
            return { ...state, sortRoomsBy: "phoneExtension" };
        case "SORT_OTHER_BY_NAME":
            return { ...state, sortOtherBy: "otherName" };
        case "SORT_OTHER_BY_EXTENSION":
            return { ...state, sortOtherBy: "phoneExtension" };
        default:
            return state;
    }
};

export default filtersReducer;
