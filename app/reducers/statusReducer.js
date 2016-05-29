import * as types from '../actions/types';

let initialState = {
    isLoading: false,
    searching: false,
    searchError: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case types.LOADING:
            return { ...state, isLoading: true }
        case types.LOADING_COMPLETE:
            return { ...state, isLoading: false }
        case types.SEARCHING:
            return { ...state, SEARCHING: true }
        case types.SEARCH_COMPLETE:
            return { ...state, SEARCH_COMPLETE: false }
        case types.SEARCH_ERROR:
            return { ...state, searchError: true }
        case types.CLEAR_ERRORS:
            return { ...state, searchError: false }
        default:
            return state;
    }
}
