import { combineReducers } from 'redux';
import activityReducer from '../activities/activityReducer';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
    form: FormReducer,
    activities: activityReducer,
});

export default rootReducer;