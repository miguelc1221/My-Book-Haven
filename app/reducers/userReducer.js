import * as types from '../actions/types';

let initialState = {
    isLoggedIn: false,
    userBooks: [],
    searchBooks: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case types.LOGIN:
            return { ...state, isLoggedIn: true };
        case types.LOGOUT:
            return { ...state, isLoggedIn: false };
        case types.SET_USER_BOOKS:
            return { ...state, userBooks: action.books };
        case types.SET_SEARCH_BOOKS:
            return { ...state, searchBooks: action.books };
        default:
            return state;
    }
}
