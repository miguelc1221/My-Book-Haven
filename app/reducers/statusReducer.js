import * as types from '../actions/types';

let initialState = {
    credentials: {
        token: "",
        email: ""
    },
    isLoggedIn: false,
    isLoading: false,
    searching: false,
    searchError: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case types.LOGIN:
            return { ...state, isLoggedIn: true, credentials: { email: action.email, token: action.token } };
        case types.LOGOUT:
            return { ...state, isLoggedIn: false, credentials: { email: "", token: "" } };
        case types.LOADING:
            return { ...state, isLoading: true }
        case types.LOADING_COMPLETE:
            return { ...state, isLoading: false }
        case types.SEARCHING:
            return { ...state, searching: true }
        case types.SEARCH_COMPLETE:
            return { ...state, searching: false }
        case types.SEARCH_ERROR:
            return { ...state, searchError: true }
        case types.CLEAR_ERRORS:
            return { ...state, searchError: false }
        default:
            return state;
    }
}
