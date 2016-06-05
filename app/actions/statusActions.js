import * as types from './types.js';

export function loggingIn(email, token) {
    return { type: types.LOGIN, email, token }
}

export function loggingOut() {
    return { type: types.LOGOUT }
}

export function isLoading() {
    return { type: types.LOADING }
}

export function loadingComplete() {
    return { type: types.LOADING_COMPLETE }
}

export function isSearching() {
    return { type: types.SEARCHING }
}

export function searchComplete() {
    return { type: types.SEARCH_COMPLETE }
}

export function searchError() {
    return { type: types.SEARCH_ERROR }
}

export function clearErrors() {
    return { type: types.CLEAR_ERRORS }
}
