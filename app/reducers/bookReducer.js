import * as types from '../actions/types';

let initialState = {
    userBooks: [],
    searchBooks: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case types.SET_USER_BOOKS:
            return { ...state, userBooks: action.books };
        case types.SET_SEARCH_BOOKS:
            return { ...state, searchBooks: action.books };
        case types.ADD_BOOK:
            let _userBooks;

            let book = state.userBooks.findIndex((val) => {
                return val.description === action.book.description;
            });

            if (book < 0) { // if book doesn't exist, add it
                _userBooks = state.userBooks.concat(action.book)
            } else {
                _userBooks = state.userBooks;
                state.userBooks.splice(book,1,action.book) // if book exist, replace it
            }
            return { ...state, userBooks: _userBooks };
        case types.DELETE_BOOK:
            let filteredBooks = state.userBooks.filter((val) => {
                return ((val.description !== action.book.description) && (val.author !== action.book.author));
            });
            return { ...state, userBooks: filteredBooks };
        default:
            return state;
    }
}
