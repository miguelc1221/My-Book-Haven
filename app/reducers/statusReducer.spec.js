import { expect } from 'chai';
import statusReducer from './statusReducer';
import * as types from '../actions/types'

describe('Status Reducer', () => {
    let initialState = {
        credentials: {
            token: "",
            email: ""
    },
    isLoggedIn: false,
    isLoading: false,
    searching: false,
    searchError: false
    };
    
    it('should handle LOGIN', () => {
        const email = 'someone@gmail.com';
        const token = '943i3904i93FMSdkfmskdf';
        const newState = statusReducer(initialState, { type: types.LOGIN, email, token})

        expect(newState).to.eql({
            ...initialState,
            isLoggedIn: true,
            credentials: { token, email }
        });
    });

    it('should handle LOGOUT', () => {
        const newState = statusReducer(initialState, { type: types.LOGOUT })

        expect(newState).to.eql({
            ...initialState,
            isLoggedIn: false,
            credentials: { token: "", email: "" }
        });
    });

    it('should handle LOADING', () => {
        const newState = statusReducer(initialState, { type: types.LOADING })

        expect(newState).to.eql({
            ...initialState,
            isLoading: true,
        });
    });

    it('should handle LOADING_COMPLETE', () => {
        const newState = statusReducer(initialState, { type: types.LOADING_COMPLETE })

        expect(newState).to.eql({
            ...initialState,
            isLoading: false
        });
    });

    it('should handle SEARCHING', () => {
        const newState = statusReducer(initialState, { type: types.SEARCHING })

        expect(newState).to.eql({
            ...initialState,
            searching: true
        });
    });

    it('should handle SEARCHING_COMPLETE', () => {
        const newState = statusReducer(initialState, { type: types.SEARCH_COMPLETE })

        expect(newState).to.eql({
            ...initialState,
            searching: false
        });
    });

    it('should handle SEARCH_ERROR', () => {
        const newState = statusReducer(initialState, { type: types.SEARCH_ERROR })

        expect(newState).to.eql({
            ...initialState,
            searchError: true
        });
    });

    it('should handle CLEAR_ERRORS', () => {
        const newState = statusReducer(initialState, { type: types.CLEAR_ERRORS })

        expect(newState).to.eql({
            ...initialState,
            searchError: false
        });
    });

    

});
