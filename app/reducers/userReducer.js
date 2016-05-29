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
        case types.ADD_BOOK:
            let book = state.userBooks.findIndex((val) => {
                return (val.title === action.book.title) && (val.author === action.book.author)
            });
            let _userBooks = state.userBooks.splice(book,1,action.payload)
            return { ...state, userBooks: _userBooks };
        case types.DELETE_BOOK:
            let filteredBooks = state.userBooks.filter((val) => {
                return (val.title !== action.book.title) && (val.author !== action.book.author)
            });
            return Object.assign({}, state, {userBooks: filteredBooks });
        default:
            return state;
    }
}
