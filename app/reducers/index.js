import { combineReducers } from 'redux';
import book from './bookReducer';
import status from './statusReducer';

const rootReducer = combineReducers({
    book,
    status
});

export default rootReducer;
