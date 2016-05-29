import { push } from 'react-router-redux';
import { get, post } from 'axios';
import * as types from './types.js';
import {
    isLoading,
    loadingComplete,
    isSearching,
    searchComplete,
    searchError,
    clearErrors } from './statusActions.js';

export function loggingIn() {
    return { type: types.LOGIN }
}

export function loggingOut() {
    return { type: types.LOGOUT }
}

export function setUserBooks(books) {
    return { type: types.SET_USER_BOOKS, books }
}

export function setSearchBooks(books) {
    return { type: types.SET_SEARCH_BOOKS, books }
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
export function isTokenValid(email,token) {
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
