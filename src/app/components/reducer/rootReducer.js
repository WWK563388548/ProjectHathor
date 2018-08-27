import { combineReducers } from 'redux';
import activityReducer from '../activities/activityReducer';

const rootReducer = combineReducers({
    activities: activityReducer
});

export default rootReducer;