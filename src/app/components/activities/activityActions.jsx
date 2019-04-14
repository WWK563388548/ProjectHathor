import { CREATE_ACTIVITY, UPDATE_ACTIVITY, DELETE_ACTIVITY, FETCH_ACTIVITY } from './activityConstants';
import { asyncActionStart, asyncActionFinsih, asyncActionError } from '../async/asyncActions';
import { fetchSampleData } from '../../data/mockApi';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';

export const fetchActivities = (activities) => {
    return {
        type: FETCH_ACTIVITY,
        payload: activities,
    };
};

export const createActivity = (activity) => {
    return async (dispatch, getState, {getFirestore, getFirebase}) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        console.log("check firestore:", firestore);
        // console.log("check user:", firestore);
        // const user = firestore.auth().currentUser;
        const user = firebase.auth().currentUser;
        console.log("check photoUrl:", getState());
        const photoURL = getState().firebase.profile.photoURL;
        let newActivity = createNewActivity(user, photoURL, activity);
        console.log("check newActivity:", newActivity);
        try {
            // dispatch({type: CREATE_ACTIVITY, payload: {activity}});
            let createdActivity = await firestore.add(`activities`, newActivity);
            await firestore.set(`activity_participant/${createdActivity.id}_${user.uid}`, {
                activityId: createdActivity.id,
                userUid: user.uid,
                activityDate: activity.date,
                host: true,
            });
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

const createNewActivity = (user, photoURL, activity) => {
    activity.date = moment(activity.date).toDate();
    return {
        ...activity,
        hostUid: user.uid,
        hostedBy: user.displayName,
        hostPhotoURL: photoURL || "/assets/user.png",
        created: Date.now(),
        participants: {
            [user.uid]: {
                going: true,
                joinDate: Date.now(),
                photoURL: photoURL || "/assets/user.png",
                displayName: user.displayName,
                host: true,
            }
        },
    };
}