import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import cuid from 'cuid';

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
            return await firestore.add({
                collection: 'users',
                doc: user.uid,
                subcollections: [{collection: 'photos'}]
            }, {
                name: imageName,
                url: downloadUrl,
            });
        } catch (error) {
            console.log(error);
            throw new Error("上传图片时发生问题");
        }
    };

export const deletePhoto = (photo) => 
    async(dispatch, getState, {getFirebase, getFirestore}) => {
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
    async(dispatch, getState, {getFirebase, getFirestore}) => {
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