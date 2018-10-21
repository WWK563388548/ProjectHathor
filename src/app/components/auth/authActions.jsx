// import { SIGN_OUT_USER } from './authConstants';
import { closeModal } from '../modals/modalActions';
import { SubmissionError } from 'redux-form';

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
                // createdAt: firebase.firestore.FieldValue.serverTimeStamp(),
            }
            await firestore.set(`users/${newFirebaseUser.uid}`, {...newUser});
            console.log("newFirebaseUser", newFirebaseUser);
            dispatch(closeModal());
        } catch(error) {
            console.log(error);
        }
    }