import { CREATE_ACTIVITY, UPDATE_ACTIVITY, DELETE_ACTIVITY } from './activityConstants';

export const createActivity = (activity) => {
    return {
        type: CREATE_ACTIVITY,
        payload: {
            activity
        }
    }
}

export const updateActivity = (activity) => {
    return {
        type: UPDATE_ACTIVITY,
        payload: {
            activity
        }
    }
}

export const deleteActivity = (activityId) => {
    return {
        type: DELETE_ACTIVITY,
        payload: {
            activityId
        }
    }
}