import { push } from 'react-router-redux';
import axios from 'axios';
import * as types from './types.js';
import {
    loggingIn,
    loggingOut,
    isLoading,
    loadingComplete,
    isSearching,
    searchComplete,
    searchError,
    clearErrors } from './statusActions.js';

export function setUserBooks(books) {
    return { type: types.SET_USER_BOOKS, books }
}

export function setSearchBooks(books) {
    return { type: types.SET_SEARCH_BOOKS, books }
}

export function addingBook(book) {
    return { type: types.ADD_BOOK, book }
}

export function deletingBook(book) {
    return { type: types.DELETE_BOOK, book }
}


//Thunks
//Find user, if not create one
export function findOrCreateUser(email,token) {
    return (dispatch) => {
        dispatch(isLoading());
        return axios.post('/user', { email: email }, {
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
        return axios.post('/user/me', { email: email }, {
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
        return axios.post('/books', { book: book }, {
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

export function addBook(book, email, token) {
    return (dispatch) => {
        dispatch(isLoading());
        return axios.post('/user/books', { book: book, email: email }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((res) => {
            dispatch(loadingComplete());
            dispatch(addingBook(book));
        })
        .catch((err) => {
            dispatch(loadingComplete());
            if (err.status === 401) {
                dispatch(loggingOut());
                return dispatch(push('/'));
            }
        })
    }
}

// delete book
export function deleteBook(book, email, token) {
    return (dispatch) => {
        dispatch(isLoading());
        return axios.delete(`/user/books/${book._id}/${email}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((res) => {
            dispatch(loadingComplete());
            dispatch(deletingBook(book));
        })
        .catch((err) => {
            dispatch(loadingComplete());
            if (err.status === 401) {
                dispatch(loggingOut());
                return dispatch(push('/'));
            }
        })
    }
}
