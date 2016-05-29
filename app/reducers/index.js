import { combineReducers } from 'redux';
import user from './userReducer';
import status from './statusReducer.js';

const rootReducer = combineReducers({
    user,
    status
});

export default rootReducer;
