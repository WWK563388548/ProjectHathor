import { combineReducers } from 'redux';
import testReducer from '../testarea/testReducer';

const rootReducer = combineReducers({
    test: testReducer
}); 

export default rootReducer;