import {
    LOADING,
    LOADING_COMPLETE,
    SEARCHING,
    SEARCH_COMPLETE,
    SEARCH_ERROR,
    CLEAR_ERRORS,
    LOGIN,
    LOGOUT,
    SET_USER_BOOKS,
    SET_SEARCH_BOOKS
} from '../actions/types';

let initialState = {
    isLoading: false,
    searching: false,
    isLoggedIn: false,
    searchError: false,
    userBooks: [],
    searchBooks: []
}
export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING:
            return { ...state, isLoading: true }
        case LOADING_COMPLETE:
            return { ...state, isLoading: false }
        case SEARCHING:
            return { ...state, SEARCHING: true }
        case SEARCH_COMPLETE:
            return { ...state, SEARCH_COMPLETE: false }
        case SEARCH_ERROR:
            return { ...state, searchError: true }
        case LOGIN:
            return { ...state, isLoggedIn: true }
        case LOGOUT:
            return { ...state, isLoggedIn: false }
        case SET_USER_BOOKS:
            return { ...state, userBooks: action.books }
        case SET_SEARCH_BOOKS:
            return { ...state, searchBooks: action.books }
        case CLEAR_ERRORS:
            return { ...state, searchError: false }
        default:
            return state;
    }
}
