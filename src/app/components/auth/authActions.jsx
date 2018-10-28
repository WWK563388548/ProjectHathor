// import { SIGN_OUT_USER } from './authConstants';
import { closeModal } from '../modals/modalActions';
import { SubmissionError, reset } from 'redux-form';
import { toastr } from 'react-redux-toastr';

export const login = (creds) => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
            dispatch(closeModal());
        } catch (error) {
            console.log("Login Error: ", error);
            throw new SubmissionError({
                _error: '登陆失败，请检查您输入的邮件地址与密码'
            });
        }
    };
};

export const registerUser = (user) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        try {
            // create the user in auth(firebase)
            let createdUser = await firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password);
            console.log("createdUser", createdUser);
            let newFirebaseUser = await firebase.auth().currentUser;
            // update the auth profile
            await newFirebaseUser.updateProfile({
                displayName: user.displayName
            });
            // create a new profile in firestore
            let newUser = {
                displayName: user.displayName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            }
            console.log("newUser", newUser);
            await firestore.set(`users/${newFirebaseUser.uid}`, {...newUser});
            console.log("newFirebaseUser", newFirebaseUser);
            dispatch(closeModal());
        } catch(error) {
            console.log(error);
            throw new SubmissionError({
                _error: error.message
            });
        }
    }

    export const socialLogin = selectedProvider => 
        async (dispatch, getState, {getFirebase, getFirestore}) => {
            const firebase = getFirebase();
            const firestore = getFirestore();
            try {
                dispatch(closeModal());
                let user = await firebase.login({
                    provider: selectedProvider,
                    type: 'popup'
                });
                if(user.additionalUserInfo.isNewUser){
                    await firestore.set(`users/${user.user.uid}`, {
                        displayName: user.profile.displayName,
                        photoURL: user.profile.avatarUrl,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    });
                }
                console.log(user);
            } catch (error) {
                console.log(error);
            }
        };

    export const updatePassword = (creds) => 
        async (dispatch, getState, {getFirebase}) => {
            const firebase = getFirebase();
            const user = firebase.auth().currentUser;
            console.log("action_user", user);
            try {
                await user.updatePassword(creds.newPassword1);
                console.log("action_password", creds);
                await dispatch(reset('account'));
                toastr.success('Success', '您已经成功修改密码');
            } catch (error) {
                throw new SubmissionError({
                    _error: error.message,
                });
            }
        };