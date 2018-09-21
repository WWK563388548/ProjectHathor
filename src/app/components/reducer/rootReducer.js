import { combineReducers } from 'redux';
import activityReducer from '../activities/activityReducer';
import { reducer as FormReducer } from 'redux-form';
import modalReducer from '../modals/modalReducer';

const rootReducer = combineReducers({
    form: FormReducer,
    activities: activityReducer,
    modals: modalReducer,
});

export default rootReducer;