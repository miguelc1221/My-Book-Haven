import { expect } from 'chai';
import bookReducer from './bookReducer';
import * as types from '../actions/types'

describe('Book Reducer', () => {
    
    it('should handle SET_USER_BOOKS', () => {
        const initialState = {
            userBooks: [],
            searchBooks: []
        }
        const books = [
            { author: 'Dan Brown', id: '34mk34', description: 'Best book ever'},
            { author: 'Brian Sanderson', id: 'fd1030', description: 'Pretty good book'}
        ]

        const newState = bookReducer(initialState, { type: types.SET_USER_BOOKS, books })

        expect(newState).to.eql({
            ...initialState,
            userBooks: books
        });
    });

    it('should handle SET_SEARCH_BOOKS', () => {
        const initialState = {
            userBooks: [],
            searchBooks: []
        }
        const books = [
            { author: 'Dan Brown', id: '34mk34', description: 'Best book ever'},
            { author: 'Brian Sanderson', id: 'fd1030', description: 'Pretty good book'}
        ]
        const newState = bookReducer(initialState, { type: types.SET_SEARCH_BOOKS, books })

        expect(newState).to.eql({
            ...initialState,
            searchBooks: books
        });
    });

    it('should handle ADD_BOOK', () => {
        const initialState = {
            userBooks: [
                { author: 'Dan Brown', id: '34mk34', description: 'Best book ever'},
                { author: 'Brian Sanderson', id: 'fd1030', description: 'Pretty good book'}
            ],
            searchBooks: []
        }
        const book = { author: 'kyle simpson', id: '53m3k', description: 'Good JS book' }
        const newState = bookReducer(initialState, { type: types.ADD_BOOK, book })

        expect(newState).to.eql({
            ...initialState,
            userBooks: [...initialState.userBooks, book]
        });
    });

    it('should handle DELETE_BOOK', () => {
        const initialState = {
            userBooks: [
                { author: 'Dan Brown', id: '34mk34', description: 'Best book ever'},
                { author: 'Brian Sanderson', id: 'fd1030', description: 'Pretty good book'}
            ],
            searchBooks: []
        }
        const book = { author: 'Dan Brown', id: '34mk34', description: 'Best book ever'}

        const newState = bookReducer(initialState, { type: types.DELETE_BOOK, book  })

        let filteredBooks = initialState.userBooks.filter((val) => {
            return ((val.description !== book.description) && (val.author !== book.author));
        });

        expect(newState).to.eql({
            ...initialState,
            userBooks: filteredBooks
        });
    });
    

});
