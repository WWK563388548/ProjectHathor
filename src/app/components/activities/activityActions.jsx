import { CREATE_ACTIVITY, UPDATE_ACTIVITY, DELETE_ACTIVITY, FETCH_ACTIVITY } from './activityConstants';
import { asyncActionStart, asyncActionFinsih, asyncActionError } from '../async/asyncActions';
import { fetchSampleData } from '../../data/mockApi';
import { toastr } from 'react-redux-toastr';

export const fetchActivities = (activities) => {
    return {
        type: FETCH_ACTIVITY,
        payload: activities,
    };
};

export const createActivity = (activity) => {
    return async dispatch => {
        try {
            dispatch({type: CREATE_ACTIVITY, payload: {activity}});
            toastr.success('成功!', '成功创建新的活动');
        } catch (error) {
            toastr.error("呃....", '创建活动失败');
        }
    };
};

export const updateActivity = (activity) => {
    return async dispatch => {
        try {
            dispatch({type: UPDATE_ACTIVITY, payload: {activity}});
            toastr.success('成功!', '成功更新活动');
        } catch (error) {
            toastr.error("呃....", '更新活动失败');
        }
    };
};

export const deleteActivity = (activityId) => {
    return async dispatch => {
        try {
            dispatch({type: DELETE_ACTIVITY, payload: {activityId}});
            toastr.success('成功!', '成功删除活动');
        } catch (error) {
            toastr.error("呃....", '删除活动失败');
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