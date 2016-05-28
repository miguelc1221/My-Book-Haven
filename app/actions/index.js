import { push } from 'react-router-redux';
import { get, post } from 'axios';
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
} from './types.js';

export function isLoading() {
    return { type: LOADING }
}

export function loadingComplete() {
    return { type: LOADING_COMPLETE }
}

export function isSearching() {
    return { type: SEARCHING }
}

export function searchComplete() {
    return { type: SEARCH_COMPLETE }
}

export function searchError() {
    return { type: SEARCH_ERROR }
}

export function clearErrors() {
    return { type: CLEAR_ERRORS }
}

export function loggingIn() {
    return { type: LOGIN }
}

export function loggingOut() {
    return { type: LOGOUT }
}

export function setUserBooks(books) {
    return { type: SET_USER_BOOKS, books }
}

export function setSearchBooks(books) {
    return { type: SET_SEARCH_BOOKS, books }
}


//Thunks
//Find user, if not create one
export function findOrCreateUser(email,token) {
    return (dispatch) => {
        dispatch(isLoading());
        return post('/user', { email: email }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((res)=> {
            dispatch(loadingComplete());
            dispatch(clearErrors());
            dispatch(loggingIn());
            dispatch(setUserBooks(res.data.books));
            dispatch(push('/'));
        })
        .catch((err) => {
            dispatch(loadingComplete());
        });
    }
}

// check if user is logged in
export function isAuthenticated(email,token) {
    return (dispatch) => {
        dispatch(isLoading());
        return post('/user/me', { email: email }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((res) => {
            dispatch(loadingComplete());
            dispatch(clearErrors());
            dispatch(loggingIn());
            dispatch(setUserBooks(res.data.books));
        })
        .catch((err) => {
            dispatch(loadingComplete());
            dispatch(loggingOut());
            dispatch(push('/'));
        });
    }
}

// Search google books
export function searchBooks(book, token) {
    return (dispatch) => {
        dispatch(isSearching());
        return post('/books', { book: book }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((res) => {
            dispatch(searchComplete())
            dispatch(clearErrors());
            dispatch(setSearchBooks(res.data));
        })
        .catch((err) => {
            dispatch(searchComplete())
            if (err.status === 401) {
                dispatch(loggingOut());
                return dispatch(push('/'));
            }
            dispatch(searchError());
        })
    }
}

export function addBook(book) {
    return (dispatch) => {
        const token = localStorage.getItem('id_token');
        const profile = localStorage.getItem('profile');
        const email = JSON.parse(profile);
        return post('/user/books', { book: book, email: email }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((res) => {
            console.log(res);
            // this.searchResults = res.data;
        })
        .catch((err) => {
            console.log(err);
        })
    }
}
