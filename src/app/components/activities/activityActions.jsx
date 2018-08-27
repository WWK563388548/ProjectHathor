import { CREATE_ACTIVITY, UPDATE_ACTIVITY, DELETE_ACTIVITY } from './activityConstants';

export const createActivity = (activity) => {
    return {
        types: CREATE_ACTIVITY,
        payload: {
            activity
        }
    }
}

export const updateActivity = (activity) => {
    return {
        types: UPDATE_ACTIVITY,
        payload: {
            activity
        }
    }
}

export const deleteActivity = (activityId) => {
    return {
        types: DELETE_ACTIVITY,
        payload: {
            activityId
        }
    }
}