import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import cuid from 'cuid';
import {asyncActionStart, asyncActionFinsih, asyncActionError} from '../async/asyncActions';

export const updateProfile = (user) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const {isLoaded, isEmpty, ...updateUser} = user;
        console.log("user", user);
        if(updateUser.dateOfBirth) {
            updateUser.dateOfBirth = moment(updateUser.dateOfBirth).toDate();
        }

        try {
            await firebase.updateProfile(updateUser);
            console.log("updateUser", updateUser);
            await firestore.set(`users/${user.uid}`, {...updateUser});
            // console.log("newFirebaseUser", newFirebaseUser);
            toastr.success('Success', '个人信息修改成功');
        } catch(error) {
            console.log(error);
        }
    };

export const uploadProfileImage = (file, fileName) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const imageName = cuid();
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`;
        const options = {
            name: imageName,
        };

        try {
            dispatch(asyncActionStart());
            // upload the file to the firebase storage
            let uploadedFile = await firebase.uploadFile(path, file, null, options);
            // get url of image
            let downloadUrl = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
            // get userdoc
            let userDoc = await firestore.get(`users/${user.uid}`);
            // check if user has photo, if not update profile with new image
            if(!userDoc.data().photoURL){
                await firebase.updateProfile({
                    photoURL: downloadUrl,
                });
                await user.updateProfile({
                    photoURL: downloadUrl,
                });

            }
            // add the new photo as the new image in photos collection
            await firestore.add({
                collection: 'users',
                doc: user.uid,
                subcollections: [{collection: 'photos'}]
            }, {
                name: imageName,
                url: downloadUrl,
            });
            dispatch(asyncActionFinsih());
        } catch (error) {
            console.log(error);
            dispatch(asyncActionError());
            throw new Error("上传图片时发生问题");
        }
    };

export const deletePhoto = (photo) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        try {
            await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
            await firestore.delete({
                collection: 'users',
                doc: user.uid,
                subcollections: [{collection: 'photos', doc: photo.id}]
            });
        } catch (error) {
            console.log(error);
            throw new Error("删除照片时发生错误");
        }
    }

export const setAvatarPhoto = (photo) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        try {
            return await firebase.updateProfile({
                photoURL: photo.url,
            });
        } catch (error) {
            console.log(error);
            throw new Error("设置头像时出现错误")
        }
    }

export const goingToActivity = (activity) =>
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const profile = getState().firebase.profile;
        console.log("firestore.FieldValue.serverTimeStamp()", firestore);
        const participant = {
            going: true,
            joinDate: firestore.FieldValue.serverTimestamp(),
            photoURL: profile.photoURL || '../public/assets/user.png',
            displayName: profile.displayName,
            host: false,
        };

        try {
            await firestore.update(`activities/${activity.id}`, {
                [`participants.${user.uid}`]: participant
            });
            await firestore.set(`activity_participant/${activity.id}_${user.uid}`, {
                activityId: activity.id,
                user: user.uid,
                activityDate: activity.date,
                host: false,
            });
            toastr.success('太棒了', '您已成功参加此活动');
        } catch(error) {
            console.log("Error of goingToActivity", error);
            toastr.error('啊哦', '参加活动失败');
        }
    };

    export const cancelGoingToActivity = (activity) =>
        async (dispatch, getState, {getFirebase, getFirestore}) => {
            const firebase = getFirebase();
            const firestore = getFirestore();
            const user = firebase.auth().currentUser;
            // const profile = getState().firebase.profile;

            try {
                console.log("cancelGoingToActivity 1", firestore);
                await firestore.update(`activities/${activity.id}`, {
                    [`participants.${user.uid}`]: firestore.FieldValue.delete(),
                });
                console.log("cancelGoingToActivity 2", activity.id);
                console.log("cancelGoingToActivity 3", user.uid);
                await firestore.delete(`activity_participant/${activity.id}_${user.uid}`);
                toastr.success('真遗憾', '但您已成功退出此活动');
            } catch(error){
                console.log("cancelGoingToActivity", error);
                toastr.error('啊哦', "退出活动失败");
            }
        };
