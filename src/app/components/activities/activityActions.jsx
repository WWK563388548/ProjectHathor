import { CREATE_ACTIVITY, UPDATE_ACTIVITY, DELETE_ACTIVITY, FETCH_ACTIVITY } from './activityConstants';
import { asyncActionStart, asyncActionFinsih, asyncActionError } from '../async/asyncActions';
import { fetchSampleData } from '../../data/mockApi';

export const fetchActivities = (activities) => {
    return {
        type: FETCH_ACTIVITY,
        payload: activities,
    };
};

export const createActivity = (activity) => {
    return {
        type: CREATE_ACTIVITY,
        payload: {
            activity
        }
    };
};

export const updateActivity = (activity) => {
    return {
        type: UPDATE_ACTIVITY,
        payload: {
            activity
        }
    };
};

export const deleteActivity = (activityId) => {
    return {
        type: DELETE_ACTIVITY,
        payload: {
            activityId
        }
    };
};

export const loadActivities = () => {
    return async dispatch => {
        try {
            dispatch(asyncActionStart());
            let activities = await fetchSampleData();
            dispatch(fetchActivities(activities));
            dispatch(asyncActionFinsih());
        } catch(error) {
            console.log(error);
            dispatch(asyncActionError());
        }
    }
}