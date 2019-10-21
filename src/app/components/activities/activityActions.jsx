import { DELETE_ACTIVITY, FETCH_ACTIVITY } from './activityConstants';
import { asyncActionStart, asyncActionFinsih, asyncActionError } from '../async/asyncActions';
import { fetchSampleData } from '../../data/mockApi';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import firebase from '../../config/firebase';

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
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        if(activity.date !== getState().firestore.ordered.activities[0].date){
            activity.date = moment(activity.date).toDate();
        }
        
        try {
            await firestore.update(`activities/${activity.id}`, activity);
            // dispatch({type: UPDATE_ACTIVITY, payload: {activity}});
            toastr.success('成功!', '成功更新活动');
        } catch (error) {
            toastr.error("呃....", '更新活动失败');
        }
    };
};

export const cancelToggle = (cancelled, activityId) =>
    async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const message = cancelled ? "要取消这个活动吗?" : "要重新激活这个活动吗";
        try {
            toastr.confirm(message, {
                onOk: async () => await firestore.update(`activities/${activityId}`, {
                    cancelled: cancelled,
                }),
            });
        } catch (error) {
            console.log(error);
        }
    }

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

export const objectToArray = (object) => {
    if(object){
        return Object.entries(object).map(e => Object.assign(e[1], {id: e[0]}));
    }
}

export const getActivityForDashBoard = (lastActivity) => 
    async (dispatch, getState) => {
        let today = new Date();
        const firestore = firebase.firestore();
        // Get activities that is  not over yet
        // const activitiesQuery = firestore.collection('activities').where('date', '>=', today);
        const activitiesRef = firestore.collection('activities');

        try {
            dispatch(asyncActionStart());
            let startAfter = lastActivity && await firestore.collection('activities').doc(lastActivity.id).get();
            let query;

            if(lastActivity){
                query = activitiesRef
                    .where('date', '>=', today)
                    .orderBy('date')
                    .startAfter(startAfter)
                    .limit(3);
            } else {
                query = activitiesRef
                    .where('date', '>=', today)
                    .orderBy('date')
                    .limit(3);
            }
            let querySnapshot = await query.get();

            if(querySnapshot.docs.length === 0){
                dispatch(asyncActionFinsih());
                return querySnapshot;
            }
            let activities = [];
            for(let i = 0; i < querySnapshot.docs.length; i++){
                // Transfer doc to data with data()
                let activity = {...querySnapshot.docs[i].data(), id: querySnapshot.docs[i].id};
                activities.push(activity);
            }
            dispatch({
                type: FETCH_ACTIVITY,
                payload: {activities}
            });
            dispatch(asyncActionFinsih());
            return querySnapshot;
        } catch (error) {
            console.warn("getActivityForDashBoard failed", error);
            dispatch(asyncActionError());
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

export const addActivityComment = (activityId, comment) => 
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            await firebase.push(`activity_chat/${activityId}`, comment);
        } catch(error) {
            console.log("addActivityComment error", error);
            toastr.error('错误', '无法添加评论');
        }
    };
