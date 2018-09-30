import { combineReducers } from 'redux';
import activityReducer from '../activities/activityReducer';
import { reducer as FormReducer } from 'redux-form';
import modalReducer from '../modals/modalReducer';
import authReducer from '../auth/authReducer';
import asyncReducer from '../async/asyncReducer';
import { reducer as ToastrReducer } from 'react-redux-toastr';

const rootReducer = combineReducers({
    form: FormReducer,
    activities: activityReducer,
    modals: modalReducer,
    auth: authReducer,
    async: asyncReducer,
    toastr: ToastrReducer,
});

export default rootReducer;